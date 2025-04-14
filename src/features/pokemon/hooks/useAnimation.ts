import { useCallback, useState } from "react";
import { PokemonData } from "../types/pokemon";

interface UseAnimationReturn {
  // Animation state
  showPokeballAnimation: boolean;
  isDragging: boolean;
  isThrown: boolean;
  caughtPokemon: PokemonData | null;

  // State setters
  setShowPokeballAnimation: (show: boolean) => void;
  setIsDragging: (dragging: boolean) => void;
  setIsThrown: (thrown: boolean) => void;
  setCaughtPokemon: (pokemon: PokemonData | null) => void;

  // Animation sequence helpers
  startThrowAnimation: () => void;
  hidePokeballAnimation: () => void;
  shouldResetThrow: () => boolean;
}

/**
 * Custom hook to manage animation states for the Pokémon catcher.
 */
export const useAnimation = (): UseAnimationReturn => {
  // --- Animation States ---
  const [showPokeballAnimation, setShowPokeballAnimation] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isThrown, setIsThrown] = useState(false);
  const [caughtPokemon, setCaughtPokemon] = useState<PokemonData | null>(null);

  // --- Animation Sequence Helpers ---
  const startThrowAnimation = useCallback(() => {
    setIsThrown(true);
    setShowPokeballAnimation(true);
  }, []);

  const hidePokeballAnimation = useCallback(() => {
    setShowPokeballAnimation(false);
  }, []);

  // Helper to determine if reset should occur
  const shouldResetThrow = useCallback(() => {
    return caughtPokemon !== null && !showPokeballAnimation && isThrown;
  }, [caughtPokemon, showPokeballAnimation, isThrown]);

  return {
    // Animation state
    showPokeballAnimation,
    isDragging,
    isThrown,
    caughtPokemon,

    // State setters
    setShowPokeballAnimation,
    setIsDragging,
    setIsThrown,
    setCaughtPokemon,

    // Animation sequence helpers
    startThrowAnimation,
    hidePokeballAnimation,
    shouldResetThrow,
  };
};
