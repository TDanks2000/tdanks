import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

const NameComponent = () => {
	return (
		<div className="flex flex-col items-center gap-3 sm:items-start">
			<HoverCard>
				<HoverCardTrigger asChild>
					<span className="text-xs sm:text-sm font-medium tracking-wider text-purple-400 uppercase cursor-default">
						Full-Stack Developer
					</span>
				</HoverCardTrigger>
				<HoverCardContent className="w-64">
					<p className="text-sm text-muted-foreground">
						Focused on TypeScript, React, and modern tooling. Passionate about
						performance and delightful UX.
					</p>
				</HoverCardContent>
			</HoverCard>
			<div className="flex flex-row items-center gap-3">
				<h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
					Hi, I'm Tommy
				</h1>
				<span className="animate-wave text-4xl sm:text-5xl">👋</span>
			</div>
			<p className="max-w-xl mt-2 text-lg text-muted-foreground">
				Building responsive web applications with modern technologies
			</p>
		</div>
	);
};

// Add this to your globals.css or use it inline
// @keyframes wave {
//   0%, 100% { transform: rotate(0deg); }
//   25% { transform: rotate(20deg); }
//   75% { transform: rotate(-15deg); }
// }
// .animate-wave { animation: wave 1.5s infinite; }

export default NameComponent;
