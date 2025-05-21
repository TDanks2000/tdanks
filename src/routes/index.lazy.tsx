import AboutMe from "@/components/aboutMe";
import BoxCard from "@/components/cards/box";
import NameComponent from "@/components/name";
import SocailsComponent from "@/components/socials";
import { createLazyFileRoute } from "@tanstack/react-router";
import { BiLogoTypescript } from "react-icons/bi";
import { IoLogoReact } from "react-icons/io5";
import {
  SiDrizzle, SiShadcnui, SiTailwindcss, SiSqlite,
  SiNextdotjs
} from "react-icons/si";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen gap-12 px-6 py-16 mx-auto max-w-7xl sm:px-8 md:px-12 lg:px-16 sm:py-24 sm:gap-16">
      {/* Hero Section with improved spacing and alignment */}
      <section className="w-full max-w-3xl mx-auto text-center sm:text-left">
        <div className="flex flex-col items-center gap-6 sm:items-start">
          <NameComponent />
          <div className="w-20 h-1 bg-linear-to-r from-purple-500 to-blue-500 rounded-full sm:w-24"></div>
          <SocailsComponent />
        </div>
      </section>

      {/* Projects Section with title and improved layout */}
      <section className="w-full max-w-5xl">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-center sm:text-left">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          <BoxCard
            description="Games Recaped provides the latest updates from game conferences such as E3, SGF, and more. Stay informed on new game announcements, trailers"
            href="https://recap.games/"
            image="https://recap.games/favicon.ico"
            title="GamesRecapped"
            github="https://github.com/tdanks2000/gamesrecaped"
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
                icon: <SiSqlite  />,
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
        </div>
      </section>

      {/* About Me Section with improved container */}
      <section className="w-full  p-8 bg-card/30 backdrop-blur-xs rounded-xl border border-border/40 shadow-lg">
        <AboutMe />
      </section>
    </div>
  );
}
