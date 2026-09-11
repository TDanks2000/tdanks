import { ArrowRight, LayoutGrid, Star } from "lucide-react";
import { SectionHeading, Tag } from "@/components/sectionHeading";
import {
	iconForRepo,
	prettyName,
	repoTags,
	shortDescription,
	useTopRepos,
} from "@/lib/github";
import type { GitHubRepo } from "@/lib/github";

/** Instant fallback (also shown if the API is unreachable) — current top personal repos. */
const fallbackRepos: GitHubRepo[] = [
	{
		id: 1,
		name: "favigen",
		description:
			"A fast and easy-to-use CLI tool to generate favicons and icons for web apps from a single image.",
		language: "TypeScript",
		stargazers_count: 3,
		html_url: "https://github.com/TDanks2000/favigen",
		topics: ["cli-tool", "favicon", "webdev"],
		updated_at: "2025-06-30T05:42:15Z",
		fork: false,
		archived: false,
	},
	{
		id: 2,
		name: "create-electrobun-stack",
		description:
			"Create production-minded Electrobun desktop apps with Bun, React, Preact, Svelte, SvelteKit, TypeScript, Vite, typed RPC, native utilities, and installer packaging.",
		language: "TypeScript",
		stargazers_count: 2,
		html_url: "https://github.com/TDanks2000/create-electrobun-stack",
		topics: ["boilerplate", "bun", "desktop"],
		updated_at: "2026-07-07T23:32:52Z",
		fork: false,
		archived: false,
	},
	{
		id: 3,
		name: "cordsmith",
		description:
			"A Bun-first Discord.js handler for slash commands, context menus, events, and scheduled tasks.",
		language: "TypeScript",
		stargazers_count: 1,
		html_url: "https://github.com/TDanks2000/cordsmith",
		topics: [],
		updated_at: "2026-06-21T01:11:34Z",
		fork: false,
		archived: false,
	},
	{
		id: 4,
		name: "react-incremental-lib",
		description:
			"High-performance React hooks for incremental, clicker, & idle games.",
		language: "TypeScript",
		stargazers_count: 1,
		html_url: "https://github.com/TDanks2000/react-incremental-lib",
		topics: ["react", "game-development", "typescript"],
		updated_at: "2025-05-02T14:02:59Z",
		fork: false,
		archived: false,
	},
];

export const OtherProjects = () => {
	// Live top repos from the GitHub API (cached 6h) — falls back to static data.
	// Excludes the profile README and this portfolio site itself.
	const live = useTopRepos("tdanks2000", "users", 4, ["TDanks2000", "tdanks"]);
	const repos = live && live.length > 0 ? live : fallbackRepos;

	return (
		<section id="projects" className="bg-background">
			<div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
				<SectionHeading
					index="03"
					title="Other Projects"
					tagline="Small ideas. Useful experiments. Occasional chaos."
				/>

				<div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
								className="flex flex-col rounded-[4px] border border-neutral-900/10 bg-white/20 p-4 transition-colors hover:border-neutral-900/25 hover:bg-white/60 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 dark:hover:bg-white/[0.06]"
							>
								<p className="flex items-center gap-2">
									<Icon className={`size-6 shrink-0 ${iconClass}`} />
									<span className="truncate text-[12px] font-bold text-neutral-900 dark:text-neutral-100">
										{prettyName(repo.name)}
									</span>
									<span className="ml-auto inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
										<Star className="size-3" />
										{repo.stargazers_count}
									</span>
								</p>
								<p className="mt-3 flex-1 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
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

					<div className="flex flex-col rounded-[4px] border border-neutral-900/10 bg-white/20 p-4 dark:border-white/10 dark:bg-white/[0.03]">
						<p className="flex items-center gap-2">
							<LayoutGrid className="size-6 shrink-0 text-neutral-500 dark:text-neutral-400" />
							<span className="text-[12px] font-bold text-neutral-900 dark:text-neutral-100">
								+ more projects
							</span>
						</p>
						<p className="mt-3 flex-1 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
							Lots of small experiments, games and random ideas.
						</p>
						<a
							href="https://github.com/TDanks2000"
							target="_blank"
							rel="noreferrer"
							className="mt-2 inline-flex h-9 w-fit items-center gap-2 rounded-md border border-neutral-900/25 px-4 text-[13px] font-medium text-neutral-900 transition-colors hover:bg-neutral-900/5 dark:border-white/20 dark:text-neutral-100 dark:hover:bg-white/10"
						>
							View all
							<ArrowRight className="size-3.5" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};
