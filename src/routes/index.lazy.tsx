import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BiLogoTypescript } from "react-icons/bi";
import { IoLogoReact } from "react-icons/io5";
import {
	SiBun,
	SiNextdotjs,
	SiNodedotjs,
	SiTailwindcss,
} from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import AboutMe from "@/components/aboutMe";
import BoxCard from "@/components/cards/box";
import NameComponent from "@/components/name";
import SocailsComponent from "@/components/socials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getRandomPokeball } from "@/features/pokemon/utils/pokemonUtils";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

const typescriptStack = {
	icon: <BiLogoTypescript />,
	name: "TypeScript",
	href: "https://www.typescriptlang.org/",
};

function Index() {
	const [hiddenPokeballSrc, setHiddenPokeballSrc] = useState<string | null>(
		null,
	);
	const [hiddenPosition, setHiddenPosition] = useState<{
		top: number;
		left: number;
	} | null>(null);

	useEffect(() => {
		const { image } = getRandomPokeball();
		setHiddenPokeballSrc(image);

		const elementSize = 40;
		const margin = 16;
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const maxLeft = Math.max(1, viewportWidth - elementSize - margin * 2);
		const maxTop = Math.max(1, viewportHeight - elementSize - margin * 2);
		const left = Math.floor(Math.random() * maxLeft) + margin;
		const top = Math.floor(Math.random() * maxTop) + margin;
		setHiddenPosition({ top, left });
	}, []);

	return (
		<main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-20 px-5 py-10 sm:px-8 sm:py-16 lg:gap-28 lg:px-12 lg:py-20">
			<section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border/60 bg-card/70 shadow-2xl shadow-primary/5 backdrop-blur-xl">
				<div className="pointer-events-none absolute -left-20 -top-24 size-80 rounded-full bg-primary/15 blur-3xl" />
				<div className="pointer-events-none absolute -bottom-32 right-0 size-96 rounded-full bg-violet-500/10 blur-3xl" />
				<div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10 lg:p-14">
					<Avatar className="size-20 border border-primary/20 bg-background/80 shadow-xl shadow-primary/10 ring-8 ring-primary/5 sm:size-24">
						<AvatarImage src="/images/favicon.svg" alt="TD" />
						<AvatarFallback>TD</AvatarFallback>
					</Avatar>

					<div className="min-w-0">
						<NameComponent />

						<div className="mt-7 flex flex-col gap-5 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex items-center gap-4">
								<SocailsComponent />
							</div>

							<div className="flex flex-wrap gap-3">
								<Button asChild size="lg" className="rounded-full px-6">
									<a
										href="https://github.com/TDanks2000"
										target="_blank"
										rel="noopener noreferrer"
									>
										GitHub
										<ArrowUpRight className="size-4" />
									</a>
								</Button>
								<Button asChild variant="outline" size="lg" className="rounded-full px-6">
									<a href="mailto:tommydanks2000@outlook.com">Contact me</a>
								</Button>
							</div>
						</div>

						<div className="mt-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
							<span className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5">TypeScript</span>
							<span className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5">React</span>
							<span className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5">Bun</span>
							<span className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5">Node.js</span>
							<span className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5">API tooling</span>
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto w-full max-w-6xl">
				<div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-2xl">
						<p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
							Selected work
						</p>
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							Featured projects
						</h2>
						<p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
							A mix of developer tooling, typed API clients, and products I actively work on.
						</p>
					</div>
					<a
						href="https://github.com/Api-Wrappers"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex w-fit items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
					>
						View API-Wrappers
						<ArrowUpRight className="size-4" />
					</a>
				</div>

				<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
					<BoxCard
						description="A game announcement and event recap site built to make showcase reveals, trailers, and release information easier to discover."
						href="https://recap.games/"
						image="https://recap.games/favicon.ico"
						title="Recap.Games"
						stack={[
							typescriptStack,
							{
								icon: <SiNextdotjs />,
								name: "Next.js",
								href: "https://nextjs.org/",
							},
							{
								icon: <SiTailwindcss />,
								name: "Tailwind CSS",
								href: "https://tailwindcss.com/",
							},
						]}
					/>

					<BoxCard
						description="Type-safe IGDB v4 client with fluent APICalypse queries, Twitch OAuth, retries, pagination, image helpers, and rate limiting."
						href="https://www.npmjs.com/package/@api-wrappers/igdb-wrapper"
						github="https://github.com/Api-Wrappers/igdb-wrapper"
						icon={<BiLogoTypescript />}
						title="@api-wrappers/igdb-wrapper"
						stack={[
							typescriptStack,
							{
								icon: <SiNodedotjs />,
								name: "Node.js",
								href: "https://nodejs.org/",
							},
							{
								icon: <SiBun />,
								name: "Bun",
								href: "https://bun.sh/",
							},
						]}
					/>

					<BoxCard
						description="Typed TMDB API v3 client covering movies, TV, search, discover, images, watch providers, sessions, and more."
						href="https://www.npmjs.com/package/@api-wrappers/tmdb-wrapper"
						github="https://github.com/Api-Wrappers/tmdb-wrapper"
						icon={<BiLogoTypescript />}
						title="@api-wrappers/tmdb-wrapper"
						stack={[typescriptStack, {
							icon: <SiNodedotjs />,
							name: "Node.js",
							href: "https://nodejs.org/",
						}]}
					/>

					<BoxCard
						description="Typed wrapper for the AniList GraphQL API with helpers for anime, manga, characters, staff, users, and media lists."
						href="https://www.npmjs.com/package/@api-wrappers/anilist-wrapper"
						github="https://github.com/Api-Wrappers/anilist-wrapper"
						icon={<BiLogoTypescript />}
						title="@api-wrappers/anilist-wrapper"
						stack={[typescriptStack, {
							icon: <IoLogoReact />,
							name: "GraphQL",
							href: "https://graphql.org/",
						}]}
					/>

					<BoxCard
						description="Shared HTTP runtime for API-Wrappers, providing retries, timeouts, authentication, caching, rate limiting, and custom transports."
						href="https://www.npmjs.com/package/@api-wrappers/api-core"
						github="https://github.com/Api-Wrappers/api-core"
						icon={<BiLogoTypescript />}
						title="@api-wrappers/api-core"
						stack={[typescriptStack, {
							icon: <SiBun />,
							name: "Bun",
							href: "https://bun.sh/",
						}]}
					/>

					<BoxCard
						description="A React library for building incremental, idle, and clicker games with reusable hooks and state stores."
						href="https://www.npmjs.com/package/react-incremental-library"
						github="https://github.com/TDanks2000/react-incremental-lib"
						icon={<IoLogoReact />}
						title="react-incremental-library"
						stack={[
							typescriptStack,
							{
								icon: <IoLogoReact />,
								name: "React",
								href: "https://react.dev/",
							},
						]}
					/>
				</div>
			</section>

			<section className="mx-auto w-full max-w-6xl rounded-[2rem] border border-border/60 bg-card/55 p-6 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-10">
				<AboutMe />
			</section>

			{hiddenPokeballSrc && hiddenPosition ? (
				<Link
					to="/pokemon-catcher"
					aria-label="Find the hidden Poké Ball"
					className="fixed z-20 opacity-20 transition-opacity duration-300 hover:opacity-80"
					style={{ top: hiddenPosition.top, left: hiddenPosition.left }}
				>
					<img
						src={hiddenPokeballSrc}
						alt="Hidden Poké Ball"
						className="size-10"
						draggable={false}
					/>
					<span className="sr-only">Go to Pokémon catcher</span>
				</Link>
			) : null}
		</main>
	);
}
