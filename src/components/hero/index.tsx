import { ArrowDown } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

export const Hero = () => {
	return (
		<section className="bg-background">
			<div className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-8 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-6 lg:pt-8 lg:pb-6">
				<div>
					<p className="flex items-start gap-1 font-hand text-[22px] text-neutral-700 dark:text-neutral-300">
						<span className="-rotate-3">Hey, I&rsquo;m</span>
						<svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="mt-1 size-7 -scale-x-100 text-neutral-700 dark:text-neutral-300">
							<path d="M8 6c10 2 18 8 20 20-1-4 1-9 5-11m-5 11 5-1 1-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</p>
					<h1 className="mt-1 tracking-tight text-neutral-950 dark:text-neutral-50">
						<span className="block text-[40px] leading-[1] font-extrabold sm:text-5xl lg:text-[52px] xl:text-[60px]">Tommy Danks</span>
						<span className="mt-2 block font-serif text-[32px] leading-[1.08] font-normal sm:text-[34px] lg:text-[29px] xl:text-[34px]">I make things for</span>
						<span className="block font-serif text-[32px] leading-[1.08] font-normal sm:text-[34px] lg:text-[29px] xl:text-[34px]">games and the internet.</span>
					</h1>
					<p className="mt-5 max-w-md font-mono text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
						I&rsquo;m a self-taught developer from the UK. I build web products, developer tools, and the occasional game. Most of what I make exists because I wanted it and couldn&rsquo;t find a better version.
					</p>
					<div className="mt-6 flex flex-wrap items-center gap-3">
						<a href="#work" className="inline-flex h-11 items-center gap-2 rounded-md bg-neutral-950 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white">View my work<ArrowDown className="size-4" /></a>
						<a href="https://github.com/TDanks2000" target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-md border border-neutral-900/20 bg-white/60 px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10"><GitHubIcon className="size-4" />GitHub</a>
					</div>
					<div className="mt-7 flex items-start gap-3">
						<span className="relative mt-1.5 flex size-2.5 shrink-0"><span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" /><span className="relative inline-flex size-2.5 rounded-full bg-green-600" /></span>
						<span><span className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Currently building Recap.Games</span><span className="block text-[13px] text-neutral-500 dark:text-neutral-400">Game showcases. All in one place.</span></span>
					</div>
				</div>
				<div className="relative mb-8 min-w-0 lg:mt-1 lg:mb-0">
					<div className="hero-preview grid aspect-[1.6] place-items-center overflow-hidden rounded-2xl border border-neutral-900/15 bg-neutral-900 text-center shadow-xl dark:border-white/15">
						<img src="/images/recap/desktop.webp" srcSet="/images/recap/desktop-720.webp 720w, /images/recap/desktop.webp 1440w" sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, calc(100vw - 32px)" alt="Recap.Games desktop overview with showcase announcements, trailers, and game filters" width={1440} height={900} fetchPriority="high" className="h-full w-full object-cover" />
					</div>
					<div className="pointer-events-none absolute right-0 bottom-[-12px] z-10 w-[120px] rotate-[-5deg] bg-[#fff3cc] px-4 py-3 font-hand text-[19px] leading-[1.05] text-neutral-800 shadow-[2px_4px_8px_rgba(0,0,0,0.16)] ring-1 ring-black/5 sm:right-0 sm:bottom-0 sm:w-[130px] sm:text-[20px]"><span className="absolute -top-1 left-7 h-3 w-9 rotate-[-8deg] bg-[#f5df9e]/70" />Built by<br />someone who<br />just really<br />likes games.<span className="mt-1 block text-right">— TD</span></div>
					<p className="mt-6 flex min-h-9 items-start gap-2 pr-32 pl-8 font-hand text-lg leading-tight text-neutral-600 dark:text-neutral-400">
						<svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="mt-1 size-6 shrink-0 text-neutral-500 dark:text-neutral-400"><path d="M30 32C22 28 14 22 12 10c0 5-2 9-6 11m6-11-5 2-1 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
						<span className="origin-left -rotate-3">One of my favourite things I&rsquo;ve built.</span>
					</p>
				</div>
			</div>
		</section>
	);
};
