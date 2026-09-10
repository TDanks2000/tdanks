import { ArrowRight, Star } from "lucide-react";
import { SectionHeading, Tag } from "@/components/sectionHeading";
import {
	iconForRepo,
	prettyName,
	repoTags,
	shortDescription,
	useTopRepos,
	type GitHubRepo,
} from "@/lib/github";

/** Instant fallback (also shown if the API is unreachable) — current top org repos. */
const fallbackRepos: GitHubRepo[] = [
	{
		id: 1,
		name: "anilist-wrapper",
		description:
			"Type-safe TypeScript SDK and Node.js wrapper for the AniList GraphQL API. Search anime/manga, fetch characters, staff, users and media lists, or run raw GraphQL queries.",
		language: "TypeScript",
		stargazers_count: 13,
		html_url: "https://github.com/Api-Wrappers/anilist-wrapper",
		topics: ["anilist", "graphql", "sdk", "typescript"],
		updated_at: "2026-08-29T21:09:27Z",
		fork: false,
		archived: false,
	},
	{
		id: 2,
		name: "tmdb-wrapper",
		description:
			"Typed TMDB API v3 client for TypeScript, Node.js, and Bun with movies, TV, search, discover, images, watch providers, and sessions.",
		language: "TypeScript",
		stargazers_count: 11,
		html_url: "https://github.com/Api-Wrappers/tmdb-wrapper",
		topics: ["api-client", "tmdb", "typescript"],
		updated_at: "2026-08-19T17:40:52Z",
		fork: false,
		archived: false,
	},
	{
		id: 3,
		name: "igdb-wrapper",
		description:
			"Type-safe TypeScript/Node.js IGDB API client with fluent APICalypse queries, Twitch OAuth, retries, pagination, image helpers, and rate limiting.",
		language: "TypeScript",
		stargazers_count: 4,
		html_url: "https://github.com/Api-Wrappers/igdb-wrapper",
		topics: ["api-client", "igdb", "typescript"],
		updated_at: "2026-08-17T00:40:07Z",
		fork: false,
		archived: false,
	},
	{
		id: 4,
		name: "trakt-wrapper",
		description:
			"Type-safe TypeScript client for the Trakt API with OAuth helpers, typed endpoints, pagination, retries, and api-core plugins.",
		language: "TypeScript",
		stargazers_count: 1,
		html_url: "https://github.com/Api-Wrappers/trakt-wrapper",
		topics: [],
		updated_at: "2026-08-19T17:22:58Z",
		fork: false,
		archived: false,
	},
];

export const DevTools = () => {
	// Live top repos from the GitHub API (cached 6h) — falls back to static data.
	const live = useTopRepos("Api-Wrappers", "orgs", 4);
	const repos = live && live.length > 0 ? live : fallbackRepos;

	return (
		<section id="tools" className="bg-[#faf9f6]">
			<div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
				<SectionHeading
					index="02"
					title="Developer Tools"
					tagline="Better APIs for a more open ecosystem."
				/>

				<div className="mt-4 grid gap-10 lg:grid-cols-[1.2fr_1.8fr] lg:gap-8">
					<div>
						<h3 className="text-3xl font-extrabold tracking-tight text-neutral-950">
							API Wrappers
						</h3>
						<p className="mt-1 font-serif text-[17px] text-neutral-600">
							Typed clients for the APIs I actually use.
						</p>
						<p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
							A collection of lightweight, type-safe Node.js/Bun clients for
							popular APIs. Built for developers who just want to get stuff
							done without fighting bad documentation.
						</p>
						<div className="mt-6 flex flex-wrap gap-3">
							<a
								href="https://github.com/Api-Wrappers"
								target="_blank"
								rel="noreferrer"
								className="inline-flex h-10 items-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
							>
								View on GitHub
								<ArrowRight className="size-4" />
							</a>
							<a
								href="#work"
								className="inline-flex h-10 items-center rounded-md bg-neutral-900/5 px-4 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-900/10"
							>
								Read more
							</a>
						</div>
					</div>

					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
						{repos.map((repo) => {
							const { icon: Icon, iconClass } = iconForRepo(
								repo.name,
								repo.topics ?? [],
							);
							return (
								<a
									key={repo.id}
									href={repo.html_url}
									target="_blank"
									rel="noreferrer"
									className="flex flex-col rounded-[4px] border border-neutral-900/10 bg-white/20 p-4 transition-colors hover:border-neutral-900/25 hover:bg-white/60"
								>
									<span
										className={`grid size-10 place-items-center rounded-lg ${iconClass}`}
									>
										<Icon className="size-8" />
									</span>
									<p className="mt-2 flex items-center gap-2 text-[13px] font-bold text-neutral-900">
										<span className="truncate">{prettyName(repo.name)}</span>
										<span className="ml-auto inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-neutral-400">
											<Star className="size-3" />
											{repo.stargazers_count}
										</span>
									</p>
									<p className="mt-1 flex-1 text-[13px] leading-relaxed text-neutral-500">
										{shortDescription(repo.description)}
									</p>
									<div className="mt-4 flex flex-wrap gap-1.5">
										{repoTags(repo).map((tag) => (
											<Tag key={tag}>{tag}</Tag>
										))}
									</div>
								</a>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};
