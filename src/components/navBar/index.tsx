import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { GitHubIcon } from "@/components/icons";
import { navLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export const NavBar = () => {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-900/10 bg-[#faf9f6]/90 backdrop-blur-md">
			<nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6">
				<a href="/" className="flex items-center gap-3">
					<img
						src="/favicon.svg"
						alt="Tommy Danks logo"
						className="size-10 shrink-0 rounded-[4px] shadow-sm ring-1 ring-black/10"
					/>
					<span className="leading-tight">
						<span className="block text-[15px] font-bold tracking-tight text-neutral-900">
							Tommy Danks
						</span>
						<span className="hidden text-[12px] text-neutral-500 sm:block">
							Developer <span className="mx-0.5">•</span> Product Builder{" "}
							<span className="mx-0.5">•</span> Game Enthusiast
						</span>
					</span>
				</a>

				<div className="flex items-center gap-2 sm:gap-3">
					<div className="hidden items-center gap-7 md:flex">
						{navLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="text-[13.5px] font-medium text-neutral-800 transition-colors hover:text-black"
							>
								{link.label}
							</a>
						))}
					</div>

					<a
						aria-label="GitHub"
						href="https://github.com/TDanks2000"
						target="_blank"
						rel="noreferrer"
						className="ml-1 inline-flex h-9 items-center gap-2 rounded-[7px] bg-neutral-950 px-2 sm:px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-neutral-800 md:ml-4"
					>
						<GitHubIcon className="size-4" />
						<span className="hidden sm:inline">GitHub</span>
						<ArrowUpRight className="hidden size-3.5 opacity-70 sm:block" />
					</a>

					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						aria-expanded={open}
						aria-controls="mobile-navigation"
						aria-label={open ? "Close menu" : "Open menu"}
						className="grid size-9 place-items-center rounded-md text-neutral-900 hover:bg-neutral-900/5 md:hidden"
					>
						{open ? <X className="size-5" /> : <Menu className="size-5" />}
					</button>
				</div>
			</nav>

			<div
				id="mobile-navigation"
				inert={!open}
				onKeyDown={(event) => {
					if (event.key === "Escape") {
						setOpen(false);
						document
							.querySelector<HTMLButtonElement>(
								'[aria-controls="mobile-navigation"]',
							)
							?.focus();
					}
				}}
				className={cn(
					"overflow-hidden border-t border-neutral-900/10 transition-all md:hidden",
					open ? "max-h-72 opacity-100" : "max-h-0 border-t-0 opacity-0",
				)}
			>
				<div className="space-y-1 px-4 py-3 sm:px-6">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							onClick={() => setOpen(false)}
							className="block rounded-md px-2 py-2 text-[14px] font-medium text-neutral-800 hover:bg-neutral-900/5"
						>
							{link.label}
						</a>
					))}
				</div>
			</div>
		</header>
	);
};
