import { cn } from "@/lib/utils";
import { usePokemonCatcher } from "../hooks";
import { DraggablePokeball } from "./DraggablePokeball";
import { InstructionsText } from "./InstructionsText";
import { MuteButton } from "./muteButton";
import { Pokedex } from "./pokedex/Pokedex";
import { ThrowAnimation } from "./ThrowAnimation";
import { CaughtPokemonDisplay } from "./CaughtPokemonDisplay";

export const PokemonCatcher = () => {
  const {
    // State
    caughtPokemon,
    showPokeballAnimation,
    isDragging,
    isThrown,
    pokemonPosition,
    currentPokeball,
    isMuted,

    // Motion values
    springX,
    springY,
    throwVelocity,
    containerRef,

    // Functions
    setIsDragging,
    handleDragEnd,
    toggleMute,
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
      <div className="w-full flex justify-center items-center">
        <InstructionsText
          hideConditions={{
            caughtPokemon: !!caughtPokemon,
            showPokeballAnimation,
            isThrown,
          }}
          currentPokeball={currentPokeball}
        />
      </div>

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

        {/* Controls positioned at bottom right */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="flex justify-end items-center gap-2 scale-[0.90]">
            <MuteButton isMuted={isMuted} toggleMute={toggleMute} />

            <Pokedex />
          </div>
        </div>
      </div>
    </div>
  );
};
