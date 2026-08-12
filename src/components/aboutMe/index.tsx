import { Link } from "@tanstack/react-router";

const AboutMe = () => {
	return (
		<div className="flex flex-col gap-8">
			<div className="max-w-3xl">
				<p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
					About
				</p>
				<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What I build</h2>
				<p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
					I&apos;m a self-taught software developer from the United Kingdom. Most of my recent work is focused on TypeScript libraries, API clients, developer tooling, and web applications.
				</p>
			</div>

			<div className="grid gap-8 md:grid-cols-2">
				<div className="space-y-3">
					<h3 className="text-lg font-semibold">API clients & tooling</h3>
					<p className="leading-relaxed text-muted-foreground">
						Through the{" "}
						<a
							href="https://github.com/Api-Wrappers"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							API-Wrappers
						</a>{" "}
						organisation, I work on cleaner, typed interfaces for APIs that can otherwise be awkward to integrate. I care about predictable errors, useful abstractions, and keeping the underlying API accessible when needed.
					</p>
				</div>

				<div className="space-y-3">
					<h3 className="text-lg font-semibold">Applications</h3>
					<p className="leading-relaxed text-muted-foreground">
						I also build web and desktop applications with React, Bun, Node.js, and Electron. Projects like{" "}
						<a
							href="https://recap.games/"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							Recap.Games
						</a>{" "}
						let me combine product design, data modelling, and frontend work in something people can actually use.
					</p>
				</div>
			</div>

			<div className="rounded-2xl border border-green-500/15 bg-green-500/5 p-5 text-sm leading-relaxed text-muted-foreground">
				<Link
					to="/mental-health/quote"
					target="_blank"
					className="transition-colors hover:text-foreground"
				>
					A small reminder: if you&apos;re having a difficult time, reaching out to someone you trust or a qualified professional can help. I keep a separate page on this site with supportive reminders and resources.
				</Link>
			</div>
		</div>
	);
};

export default AboutMe;
