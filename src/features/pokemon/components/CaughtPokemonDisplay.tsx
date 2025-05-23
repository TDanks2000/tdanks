import { constants } from "@/data/constants";
import { cn } from "@/lib/utils"; // adjust the import path as needed
import { AnimatePresence, motion } from "framer-motion";
import { PokemonData } from "../types/pokemon";

interface Position {
  top: number;
  left: number;
}

interface CaughtPokemonDisplayProps {
  /** The caught Pokemon data */
  caughtPokemon: PokemonData | null;
  /** Whether to show the pokeball animation */
  showPokeballAnimation: boolean;
  /** Position to display the caught Pokemon */
  pokemonPosition: Position | null;
  /** Initial animation position */
  initialPosition: {
    top: number;
    left: number;
  };
}

export const CaughtPokemonDisplay = ({
  caughtPokemon,
  showPokeballAnimation,
  pokemonPosition,
  initialPosition,
}: CaughtPokemonDisplayProps) => {
  if (!caughtPokemon || showPokeballAnimation || !pokemonPosition) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          "absolute flex flex-col items-center z-40 backdrop-blur-xs",
          "bg-background/30 p-6 rounded-xl shadow-xl"
        )}
        key={caughtPokemon.name + pokemonPosition.top}
        initial={{
          scale: 0.5,
          opacity: 0,
          top: initialPosition.top,
          left: initialPosition.left,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          top: pokemonPosition.top,
          left: pokemonPosition.left,
          transition: {
            type: "spring",
            damping: 18,
            stiffness: 120,
            delay: 0.1,
          },
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
          top: pokemonPosition.top,
          left: pokemonPosition.left,
          transition: { duration: 0.3, ease: "easeIn" },
        }}
      >
        <h2
          className={cn(
            "font-londrina-solid text-xl md:text-2xl font-bold mb-3 text-center px-4 py-1 rounded-md select-none shrink-0 grow-0",
            "text-primary-foreground",
            "drop-shadow-lg drop-shadow-destructive/20"
          )}
        >
          Caught {caughtPokemon.name}!
        </h2>
        <motion.img
          src={
            caughtPokemon.id
              ? `${constants.pokemon.imageBaseURL}/${caughtPokemon.id}.png`
              : "fallback_image_url.png"
          }
          alt={caughtPokemon.name}
          className={cn(
            "object-contain w-[150px] h-[150px] md:w-[200px] md:h-[200px]",
            "drop-shadow-xl filter brightness-110"
          )}
          initial={{ y: -20, scale: 0.8 }}
          animate={{
            y: [0, -15, 0],
            scale: 1,
            transition: {
              y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
              scale: { duration: 0.3, ease: "easeOut" },
            },
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
