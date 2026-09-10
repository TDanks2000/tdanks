export const SectionHeading = ({
	index,
	title,
	tagline,
}: {
	index: string;
	title: string;
	tagline: string;
}) => (
	<div className="flex items-baseline gap-6 border-b border-neutral-900/20 pb-2">
		<span className="border-l-2 border-neutral-900/15 pl-3 font-mono text-sm text-neutral-900">
			{index}
		</span>
		<h2 className="text-sm font-bold text-neutral-900">{title}</h2>
		<span className="ml-auto hidden font-mono text-[11px] tracking-wider text-neutral-500 uppercase lg:block">
			{tagline}
		</span>
	</div>
);

export const Tag = ({ children }: { children: string }) => (
	<span className="rounded-[3px] bg-slate-200/70 px-2 py-1 text-[11px] text-neutral-600">
		{children}
	</span>
);
