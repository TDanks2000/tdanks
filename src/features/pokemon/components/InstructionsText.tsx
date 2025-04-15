import { cn } from "@/lib/utils"; // adjust the import path as needed
import { Data } from "../types/pokemon";

interface InstructionsTextProps {
  /** Hide instructions when any of these conditions are true */
  hideConditions: {
    caughtPokemon: boolean;
    showPokeballAnimation: boolean;
    isThrown: boolean;
  };
  /** Current pokeball data */
  currentPokeball: Data | null;
}

export const InstructionsText = ({
  hideConditions: { caughtPokemon, showPokeballAnimation, isThrown },
  currentPokeball,
}: InstructionsTextProps) => {
  if (caughtPokemon || showPokeballAnimation || isThrown) return null;

  return (
    <div className={cn("text-center mt-8 z-10 animate-fade-in")}>
      <h1
        className={cn(
          "font-londrina-solid text-3xl font-extrabold mb-2 tracking-wide select-none",
          "text-primary-foreground",
          "drop-shadow-lg drop-shadow-destructive/20"
        )}
      >
        Get Ready to Catch 'Em All!
      </h1>
      <p
        className={cn(
          "font-londrina-solid text-lg select-none",
          "text-primary-foreground/90",
          "drop-shadow-lg drop-shadow-destructive/20"
        )}
      >
        Drag the <strong>{currentPokeball?.name || "Poké Ball"}</strong> up to
        throw and start your Pokémon adventure!
      </p>
    </div>
  );
};
