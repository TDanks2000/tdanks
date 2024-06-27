import Background from '@/components/bg';
import BoxCard from '@/components/cards/box';
import NameComponent from '@/components/name';
import SocailsComponent from '@/components/socials';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="game-tracking-app-theme"
    >
      <Background />
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-10">
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
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
