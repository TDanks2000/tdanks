import Background from '@/components/bg';
import BoxCard from '@/components/cards/box';
import NameComponent from '@/components/name';
import SocailsComponent from '@/components/socials';
import { ThemeProvider } from '@/components/theme-provider';
import { BiLogoTypescript } from 'react-icons/bi';
import { IoLogoReact } from 'react-icons/io5';
import { SiPrisma, SiShadcnui, SiSupabase, SiTailwindcss } from 'react-icons/si';

function App() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="game-tracking-app-theme"
    >
      <Background />
      <div className="flex flex-col items-center justify-start w-screen h-screen gap-10 px-5 py-20 sm:p-6 sm:justify-center">
        <div className="flex flex-col gap-4">
          <NameComponent />
          <SocailsComponent />
        </div>
        <div className="flex">
          <BoxCard
            description="Games Recaped provides the latest updates from game conferences such as E3, SGF, and more. Stay informed on new game announcements, trailers"
            href="https://recap.games/"
            image="https://gamesrecaped.tdanks.com/logo.png"
            title="GamesRecapped"
            github="https://github.com/tdanks2000/gamesrecaped"
            stack={[
              {
                icon: <BiLogoTypescript />,
                name: 'Typescript',
                href: 'https://www.typescriptlang.org/',
              },
              {
                icon: <IoLogoReact />,
                name: 'React',
                href: 'https://react.dev/',
              },
              {
                icon: <SiSupabase />,
                name: 'Supabase',
                href: 'https://supabase.com/',
              },
              {
                icon: <SiPrisma />,
                name: 'Prisma',
                href: 'https://www.prisma.io/',
              },
              {
                icon: <SiShadcnui />,
                name: 'Shadcn UI',
                href: 'https://ui.shadcn.com/',
              },
              { icon: <SiTailwindcss />, name: 'Tailwind', href: 'https://tailwindcss.com/' },
            ]}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
