const NameComponent = () => {
	return (
		<div className="flex flex-col items-start gap-4">
			<span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
				TypeScript developer · United Kingdom
			</span>

			<h1 className="max-w-4xl text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
				Hi, I&apos;m Tommy.
			</h1>

			<p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
				I build type-safe API clients, developer tooling, and web applications with TypeScript, React, Bun, and Node.js.
			</p>
		</div>
	);
};

export default NameComponent;
