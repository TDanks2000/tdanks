import { createLazyFileRoute } from "@tanstack/react-router";
import { BiLogoTypescript } from "react-icons/bi";
import { IoLogoReact } from "react-icons/io5";
import {
	SiDrizzle,
	SiNextdotjs,
	SiShadcnui,
	SiSqlite,
	SiTailwindcss,
} from "react-icons/si";
import AboutMe from "@/components/aboutMe";
import BoxCard from "@/components/cards/box";
import NameComponent from "@/components/name";
import SocailsComponent from "@/components/socials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="flex flex-col items-center justify-start w-full min-h-screen gap-12 px-6 py-16 mx-auto max-w-7xl sm:px-8 md:px-12 lg:px-16 sm:py-24 sm:gap-16">
			{/* Hero Section */}
			<section className="w-full max-w-6xl mx-auto">
				<Card className="relative overflow-hidden border border-border/40 bg-linear-to-b from-primary/5 via-background to-background">
					<div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-purple-500/10 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-blue-500/10 blur-3xl" />
					<CardContent className="pt-8">
						<div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:text-left">
							<Avatar className="size-16 ring-2 ring-purple-500/30 shadow-md">
								<AvatarImage src="/images/favicon.svg" alt="TD" />
								<AvatarFallback>TD</AvatarFallback>
							</Avatar>
							<div className="flex flex-col items-center gap-4 sm:items-start">
								<NameComponent />
								<div className="w-24 h-1 rounded-full bg-linear-to-r from-purple-500 to-blue-500" />
								<SocailsComponent />
								<div className="flex gap-3 pt-2">
									<Button asChild size="lg">
										<a
											href="https://github.com/tdanks2000"
											target="_blank"
											rel="noopener noreferrer"
										>
											View GitHub
										</a>
									</Button>
									<Button asChild variant="outline" size="lg">
										<a href="mailto:tommydanks2000@outlook.com">Contact</a>
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Featured Projects */}
			<section className="w-full max-w-6xl mx-auto">
				<Card className="border border-border/40">
					<CardHeader>
						<CardTitle className="text-3xl font-bold tracking-tight">
							Featured Projects
						</CardTitle>
						<CardDescription className="max-w-prose">
							A selection of work that reflects my focus on performance, UX, and
							clean architecture.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Carousel className="w-full" opts={{ align: "start", loop: true }}>
							<CarouselContent className="-ml-2 md:-ml-4">
								<CarouselItem className="pl-2 md:pl-4 basis-full sm:basis-1/2">
									<BoxCard
										description="Games Recaped provides the latest updates from game conferences such as E3, SGF, and more. Stay informed on new game announcements, trailers"
										href="https://recap.games/"
										image="https://recap.games/favicon.ico"
										title="GamesRecapped"
										github="https://github.com/tdanks2000/recap.games"
										stack={[
											{
												icon: <BiLogoTypescript />,
												name: "Typescript",
												href: "https://www.typescriptlang.org/",
											},
											{
												icon: <SiNextdotjs />,
												name: "NextJS",
												href: "https://nextjs.org",
											},
											{
												icon: <SiDrizzle />,
												name: "Drizzle",
												href: "https://orm.drizzle.team/",
											},
											{
												icon: <SiSqlite />,
												name: "SQLite",
												href: "https://sqlite.org/",
											},
											{
												icon: <SiShadcnui />,
												name: "Shadcn UI",
												href: "https://ui.shadcn.com/",
											},
											{
												icon: <SiTailwindcss />,
												name: "Tailwind",
												href: "https://tailwindcss.com/",
											},
										]}
									/>
								</CarouselItem>
								<CarouselItem className="pl-2 md:pl-4 basis-full sm:basis-1/2">
									<BoxCard
										description="A powerful React library for building incremental, idle, and clicker games. Create engaging experiences with minimal setup using our collection of specialized hooks and stores."
										href="https://npmjs.com/package/react-incremental-library"
										icon={<BiLogoTypescript />}
										title="react-incremental-game-library"
										github="https://github.com/tdanks2000/react-incremental-lib"
										stack={[
											{
												icon: <BiLogoTypescript />,
												name: "Typescript",
												href: "https://www.typescriptlang.org/",
											},
											{
												icon: <IoLogoReact />,
												name: "React",
												href: "https://react.dev/",
											},
										]}
									/>
								</CarouselItem>
								<CarouselItem className="pl-2 md:pl-4 basis-full sm:basis-1/2">
									<BoxCard
										href="https://github.com/orgs/Api-Wrappers/repositories"
										description="I'm working on making the APIs I use most often simpler and more type-safe."
										title="Api Wrappers"
										image="https://avatars.githubusercontent.com/u/161247444"
										stack={[
											{
												icon: <BiLogoTypescript />,
												name: "Typescript",
												href: "https://www.typescriptlang.org/",
											},
										]}
									/>
								</CarouselItem>
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</CardContent>
				</Card>
			</section>

			{/* About Me */}
			<section className="w-full max-w-6xl mx-auto">
				<Card className="border border-border/40">
					<CardContent className="py-8">
						<AboutMe />
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
