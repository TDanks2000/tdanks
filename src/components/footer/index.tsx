import { navLinks } from "@/lib/navigation";

export const Footer = () => {
	return (
		<footer className="border-t border-neutral-900/10 bg-[#faf9f6]">
			<div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:justify-between">
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
						<span className="block text-[12px] text-neutral-500">
							Games. Developers. A more open internet.
						</span>
					</span>
				</a>

				<nav className="flex items-center gap-6">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="text-[13px] font-medium text-neutral-700 transition-colors hover:text-black"
						>
							{link.label}
						</a>
					))}
				</nav>

				<p className="-rotate-12 max-w-28 font-hand text-xl text-neutral-500">
					Thanks for stopping by! ツ
				</p>
			</div>
		</footer>
	);
};
