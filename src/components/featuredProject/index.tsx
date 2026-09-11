import { ArrowUpRight, Gamepad2 } from "lucide-react";
import { SectionHeading, Tag } from "@/components/sectionHeading";

const tags = ["Next.js", "TypeScript", "tRPC", "Tailwind CSS"];

const screenshots = [
	{
		src: "/images/recap/event.webp",
		alt: "Gamescom 2026 event recap on Recap.Games",
		height: 430,
	},
	{
		src: "/images/recap/schedule.webp",
		alt: "Recap.Games showcase schedule with upcoming events",
		height: 580,
	},
	{
		src: "/images/recap/announcements.webp",
		alt: "Recap.Games mobile announcement feed with game trailers",
		height: 670,
	},
];

export const FeaturedProject = () => {
	return (
		<section id="work" className="bg-background">
			<div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
				<SectionHeading
					index="01"
					title="Featured Project"
					tagline="Real-time coverage for a more exciting gaming world."
				/>

				<div className="mt-5 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
					<div>
						<div className="flex items-center gap-4">
							<span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-neutral-950 text-fuchsia-400 shadow-md">
								<img
									src="https://recap.games/logo.png"
									alt="Recap.Games logo"
								/>
							</span>
							<span>
								<span className="block text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50">
									Recap.Games
								</span>
								<span className="mt-1 block font-serif text-[17px] text-neutral-600 dark:text-neutral-400">
									Game announcement and event recap platform.
								</span>
							</span>
						</div>

						<p className="mt-5 max-w-lg text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
							Recap.Games makes showcase reveals, trailers and release
							information easier to discover. Follow events, browse
							announcements, and never miss what&rsquo;s next in gaming.
						</p>

						<div className="mt-4 flex flex-wrap gap-2">
							{tags.map((tag) => (
								<Tag key={tag}>{tag}</Tag>
							))}
						</div>

						<div className="mt-6 flex flex-wrap gap-3">
							<a
								href="https://recap.games"
								target="_blank"
								rel="noreferrer"
								className="inline-flex h-11 items-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
							>
								Visit Recap.Games
								<ArrowUpRight className="size-4" />
							</a>
						</div>
					</div>

					<div className="relative mt-5 min-w-0">
						<div className="pointer-events-none absolute -top-5 left-[2%] z-10 flex origin-bottom-left -rotate-6 items-start gap-1 font-hand text-[16px] leading-tight text-neutral-600 dark:text-neutral-400 sm:text-lg">
							<svg
								viewBox="0 0 40 40"
								fill="none"
								aria-hidden="true"
								className="mt-2 size-7 -rotate-12"
							>
								<path
									d="M31 5C20 8 11 16 10 29c0-4-3-7-7-8m7 8 5-3 3 3"
									stroke="currentColor"
									strokeWidth="1.7"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span>
								Events, games,
								<br />
								timelines, and more.
							</span>
						</div>
						<div className="relative aspect-[19/10] w-full">
							{screenshots.map((screenshot, i) => (
								<div
									key={screenshot.src}
									className={
										"absolute grid min-w-0 place-items-center overflow-hidden rounded-lg border border-neutral-900/15 bg-white text-center shadow-lg dark:border-white/15 dark:bg-neutral-900 " +
										(i === 0
											? "top-[23%] left-[3%] h-[59%] w-[31%] -rotate-[7deg]"
											: i === 1
												? "top-[8%] left-[35%] h-[82%] w-[32%] rotate-[5deg]"
												: "top-[1%] left-[68%] h-[92%] w-[31%]")
									}
								>
									<img
										src={screenshot.src}
										alt={screenshot.alt}
										width={430}
										height={screenshot.height}
										loading="lazy"
										decoding="async"
										className="h-full w-full object-cover object-top"
									/>
								</div>
							))}
							<Gamepad2
								className="pointer-events-none absolute bottom-[1%] left-[-1%] size-9 -rotate-12 text-neutral-600/80 dark:text-neutral-400 sm:size-11"
								strokeWidth={1.35}
							/>
							<p className="absolute bottom-[-7%] left-[10%] w-[27%] -rotate-6 text-center leading-tight font-hand text-sm text-neutral-600 dark:text-neutral-400 sm:text-lg">
								A cleaner view of what&rsquo;s next.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
