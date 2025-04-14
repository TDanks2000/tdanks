import { cn } from "@/lib/utils";
import { CaughtPokemonDisplay } from "../../../components/pokemon/components/CaughtPokemonDisplay";
import { DraggablePokeball } from "../../../components/pokemon/components/DraggablePokeball";
import { InstructionsText } from "../../../components/pokemon/components/InstructionsText";
import { ThrowAnimation } from "../../../components/pokemon/components/ThrowAnimation";
import { usePokemonCatcher } from "../hooks";

export const PokemonCatcher = () => {
  const {
    // State
    caughtPokemon,
    showPokeballAnimation,
    isDragging,
    isThrown,
    pokemonPosition,
    currentPokeball,

    // Motion values
    springX,
    springY,
    throwVelocity,
    containerRef,

    // Functions
    setIsDragging,
    handleDragEnd,
  } = usePokemonCatcher();

  const initialTop =
    typeof window !== "undefined" ? window.innerHeight / 2 : 300;
  const initialLeft =
    typeof window !== "undefined" ? window.innerWidth / 2 : 200;

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 w-svw h-svh overflow-hidden flex flex-col justify-between items-center p-4 md:p-8",
        "bg-linear-to-b from-primary/20 via-primary/30 to-primary/40",
        "dark:from-background dark:via-background/90 dark:to-background/80",
        "animate-gradient-xy"
      )}
    >
      <InstructionsText
        hideConditions={{
          caughtPokemon: !!caughtPokemon,
          showPokeballAnimation,
          isThrown,
        }}
        currentPokeball={currentPokeball}
      />

      <div className="relative w-full grow flex items-center justify-center">
        <DraggablePokeball
          isThrown={isThrown}
          caughtPokemon={caughtPokemon}
          currentPokeball={currentPokeball}
          springX={springX}
          springY={springY}
          containerRef={containerRef}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          handleDragEnd={handleDragEnd}
        />

        <ThrowAnimation
          showPokeballAnimation={showPokeballAnimation}
          throwVelocity={throwVelocity}
          currentPokeball={currentPokeball}
        />

        <CaughtPokemonDisplay
          caughtPokemon={caughtPokemon}
          showPokeballAnimation={showPokeballAnimation}
          pokemonPosition={pokemonPosition}
          initialPosition={{
            top: initialTop,
            left: initialLeft,
          }}
        />
      </div>
    </div>
  );
};
