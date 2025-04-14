import { MotionRainbowText } from "@/components/framer-animations";
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
    <div className="text-center mt-8 z-10 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-md text-foreground">
        <MotionRainbowText>Ready to Catch?</MotionRainbowText>
      </h1>
      <p className="text-md md:text-lg drop-shadow-sm text-foreground/80">
        Drag the <strong> {currentPokeball?.name || "Poké Ball"} </strong>{" "}
        upwards to throw!
      </p>
    </div>
  );
};
