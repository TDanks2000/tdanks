export const About = () => {
	return (
		<section id="about" className="bg-[#faf9f6]">
			<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
				<div className="grid min-w-0 items-center gap-8 sm:grid-cols-[minmax(0,1fr)_auto]">
					<div className="min-w-0 max-w-xl">
						<h2 className="font-serif text-2xl text-neutral-900">
							A bit about me
						</h2>
						<p className="mt-4 font-mono text-[13px] leading-relaxed text-neutral-500">
							I&rsquo;m based in the UK, I&rsquo;m a big fan of games, open
							source and building tools that make life easier. I like working on
							side projects, trying out new ideas and learning by just building
							things.
						</p>
						<p className="mt-4 font-mono text-[13px] leading-relaxed text-neutral-500">
							When I&rsquo;m not coding you&rsquo;ll usually find me playing
							games, watching showcases, or planning the next weird idea.
						</p>
					</div>
					<div className="hidden w-full max-w-44 rotate-3 justify-self-end rounded-lg bg-white p-2 pb-3 shadow-md ring-1 ring-neutral-900/10 sm:block">
						<div className="aspect-square overflow-hidden bg-neutral-200">
							<img
								src="/images/milo.jpg"
								alt="Milo, my dog, curled up next to my desk"
								width={937}
								height={937}
								loading="lazy"
								decoding="async"
								className="h-full w-full object-cover"
							/>
						</div>
						<p className="mt-2 text-center font-hand text-[16px] text-neutral-600">
							Coding companion 🐾
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
