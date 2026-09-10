import { useEffect, useState, type ComponentType } from "react";
import {
	AppWindow,
	ArrowLeftRight,
	Atom,
	BookOpen,
	Bot,
	Box,
	Clapperboard,
	Database,
	Film,
	FolderGit2,
	Gamepad2,
	Image as ImageIcon,
	Infinity as InfinityIcon,
	List,
	Terminal,
	Video,
	Wrench,
} from "lucide-react";

export interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	html_url: string;
	topics?: string[];
	updated_at: string;
	fork: boolean;
	archived: boolean;
}

type OwnerKind = "users" | "orgs";

/** Cache live results for 6h — keeps us far under the 60 req/hr unauthenticated limit. */
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

const cacheKey = (owner: string) => `gh-top-repos:${owner.toLowerCase()}`;

interface CacheEntry {
	at: number;
	repos: GitHubRepo[];
}

function readCache(owner: string): CacheEntry | null {
	try {
		const raw = localStorage.getItem(cacheKey(owner));
		if (!raw) return null;
		return JSON.parse(raw) as CacheEntry;
	} catch {
		return null;
	}
}

function writeCache(owner: string, repos: GitHubRepo[]) {
	try {
		localStorage.setItem(
			cacheKey(owner),
			JSON.stringify({ at: Date.now(), repos } satisfies CacheEntry),
		);
	} catch {
		// storage unavailable (private mode etc.) — live fetch still works
	}
}

export interface TopReposOptions {
	owner: string;
	kind: OwnerKind;
	limit?: number;
	/** repo names (case-insensitive) to hide, e.g. profile READMEs or the site itself */
	exclude?: string[];
}

/**
 * Fetch an owner's top repos from the public GitHub REST API.
 * Skips forks/archived, sorts by stars (then most recently updated).
 * Returns cached data when fresh, stale cache when the API fails, else null.
 */
export async function fetchTopRepos({
	owner,
	kind,
	limit = 4,
	exclude = [],
}: TopReposOptions): Promise<GitHubRepo[] | null> {
	const cached = readCache(owner);
	if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
		return cached.repos.slice(0, limit);
	}

	try {
		const headers: Record<string, string> = {
			Accept: "application/vnd.github+json",
		};
		// Optional: set VITE_GITHUB_TOKEN to raise the rate limit to 5,000 req/hr
		const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
		if (token) headers.Authorization = `Bearer ${token}`;

		const res = await fetch(
			`https://api.github.com/${kind}/${owner}/repos?per_page=100&type=public`,
			{ headers },
		);
		if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

		const repos = (await res.json()) as GitHubRepo[];
		const excluded = new Set(exclude.map((n) => n.toLowerCase()));
		const top = repos
			.filter((r) => !r.fork && !r.archived && !excluded.has(r.name.toLowerCase()))
			.sort(
				(a, b) =>
					b.stargazers_count - a.stargazers_count ||
					+new Date(b.updated_at) - +new Date(a.updated_at),
			)
			.slice(0, limit);

		writeCache(owner, top);
		return top;
	} catch {
		return cached ? cached.repos.slice(0, limit) : null;
	}
}

/**
 * React hook for live top repos. Returns cached data instantly when available,
 * then revalidates against the GitHub API. Returns null until the first
 * result arrives — render static fallback content in that case.
 */
export function useTopRepos(
	owner: string,
	kind: OwnerKind,
	limit = 4,
	exclude: string[] = [],
): GitHubRepo[] | null {
	const excludeKey = exclude.join(",").toLowerCase();
	const [repos, setRepos] = useState<GitHubRepo[] | null>(() => {
		const cached = readCache(owner);
		return cached ? cached.repos.slice(0, limit) : null;
	});

	useEffect(() => {
		let cancelled = false;
		fetchTopRepos({ owner, kind, limit, exclude: excludeKey.split(",").filter(Boolean) })
			.then((live) => {
				if (!cancelled && live) setRepos(live);
			})
			.catch(() => {
				// keep fallback content on screen
			});
		return () => {
			cancelled = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [owner, kind, limit, excludeKey]);

	return repos;
}

const NAME_OVERRIDES: Record<string, string> = {
	"anilist-wrapper": "AniList Wrapper",
	"tmdb-wrapper": "TMDB Wrapper",
	"igdb-wrapper": "IGDB Wrapper",
	"trakt-wrapper": "Trakt Wrapper",
	"api-core": "API Core",
	"awesome-api-wrappers": "Awesome API Wrappers",
	"create-electrobun-stack": "Create Electrobun Stack",
	"react-incremental-lib": "React Incremental",
	cordsmith: "Cordsmith",
	favigen: "Favigen",
	vtools: "VTools",
	convertsit: "ConvertsIt",
	anilistids: "Anilist IDs",
};

/** "anilist-wrapper" -> "AniList Wrapper", "my_cool-tool" -> "My Cool Tool" */
export function prettyName(name: string): string {
	const hit = NAME_OVERRIDES[name.toLowerCase()];
	if (hit) return hit;
	return name
		.split(/[-_]+/)
		.map((word) =>
			/^[A-Z0-9]+$/.test(word)
				? word
				: word.charAt(0).toUpperCase() + word.slice(1),
		)
		.join(" ");
}

/** Trim long GitHub descriptions to fit a card, cutting at a word boundary. */
export function shortDescription(description: string | null, max = 115): string {
	const text = (description ?? "").trim() || "Open-source project on GitHub.";
	if (text.length <= max) return text;
	return text
		.slice(0, max - 1)
		.trimEnd()
		.replace(/\s+\S*$/, "") + "…";
}

const TOPIC_WORD_OVERRIDES: Record<string, string> = {
	nodejs: "Node.js",
	javascript: "JavaScript",
	typescript: "TypeScript",
	oauth2: "OAuth2",
};

const TOPIC_ACRONYMS = new Set([
	"api",
	"cli",
	"sdk",
	"ui",
	"dx",
	"tv",
	"oauth",
	"graphql",
	"http",
	"rest",
	"igdb",
	"tmdb",
	"trakt",
	"vhs",
]);

const GENERIC_TOPICS = new Set([
	"open-source",
	"awesome",
	"awesome-list",
	"list",
	"collection",
	"library",
	"libraries",
]);

function prettifyTopic(topic: string): string {
	return topic
		.split(/[-_]+/)
		.map((word) => {
			const lower = word.toLowerCase();
			if (TOPIC_WORD_OVERRIDES[lower]) return TOPIC_WORD_OVERRIDES[lower];
			if (TOPIC_ACRONYMS.has(lower)) return lower.toUpperCase();
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
}

/** [Language, best topic] tags for a repo card. Falls back to "Open Source". */
export function repoTags(repo: GitHubRepo): string[] {
	const tags: string[] = [];
	if (repo.language) tags.push(repo.language);

	const nameBits = repo.name.toLowerCase().split(/[-_]+/);
	const topic = (repo.topics ?? []).find((t) => {
		const lower = t.toLowerCase();
		if (GENERIC_TOPICS.has(lower)) return false;
		if (lower === (repo.language ?? "").toLowerCase()) return false;
		// skip topics that just repeat the repo name (e.g. "tmdb" in "tmdb-wrapper")
		return !nameBits.some(
			(bit) => bit.length > 2 && (lower.includes(bit) || bit.includes(lower)),
		);
	});
	tags.push(topic ? prettifyTopic(topic) : "Open Source");

	return [...new Set(tags)];
}

export type IconComponent = ComponentType<{ className?: string }>;

/** Pick a lucide icon for a repo based on its name/topics. */
export function iconForRepo(
	name: string,
	topics: string[] = [],
): { icon: IconComponent; iconClass: string } {
	const hay = `${name} ${topics.join(" ")}`.toLowerCase();
	const repo = name.toLowerCase();

	if (hay.includes("anilist")) return { icon: BookOpen, iconClass: "text-blue-600" };
	if (hay.includes("tmdb") || hay.includes("themoviedb"))
		return { icon: Film, iconClass: "text-green-600" };
	if (hay.includes("igdb")) return { icon: Database, iconClass: "text-violet-600" };
	if (hay.includes("trakt")) return { icon: Clapperboard, iconClass: "text-rose-600" };
	if (hay.includes("api-core") || repo === "core")
		return { icon: Box, iconClass: "text-orange-600" };
	if (hay.includes("awesome")) return { icon: List, iconClass: "text-amber-600" };
	if (hay.includes("favigen") || hay.includes("favicon"))
		return { icon: ImageIcon, iconClass: "text-sky-600" };
	if (hay.includes("electrobun") || hay.includes("desktop") || hay.includes("electron"))
		return { icon: AppWindow, iconClass: "text-violet-600" };
	if (
		hay.includes("discord") ||
		repo.startsWith("cord") ||
		hay.includes("-cord") ||
		hay.includes("_cord") ||
		hay.includes(" bot")
	)
		return { icon: Bot, iconClass: "text-indigo-600" };
	if (hay.includes("incremental") || hay.includes("idle") || hay.includes("clicker"))
		return { icon: InfinityIcon, iconClass: "text-pink-600" };
	if (hay.includes("react")) return { icon: Atom, iconClass: "text-cyan-600" };
	if (hay.includes("video") || hay.includes("ffmpeg") || hay.includes("vtools"))
		return { icon: Video, iconClass: "text-red-600" };
	if (hay.includes("minecraft") || hay.includes("game"))
		return { icon: Gamepad2, iconClass: "text-emerald-600" };
	if (hay.includes("convert")) return { icon: ArrowLeftRight, iconClass: "text-teal-600" };
	if (hay.includes("cli") || hay.includes("terminal"))
		return { icon: Terminal, iconClass: "text-slate-600" };

	const fallbacks: { icon: IconComponent; iconClass: string }[] = [
		{ icon: Wrench, iconClass: "text-amber-600" },
		{ icon: Terminal, iconClass: "text-slate-600" },
		{ icon: Box, iconClass: "text-orange-600" },
		{ icon: FolderGit2, iconClass: "text-neutral-500" },
	];
	let hash = 0;
	for (const ch of repo) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
	return fallbacks[hash % fallbacks.length];
}
