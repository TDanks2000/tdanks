import { useCallback, useRef } from "react";

// Positioning constants
export const ESTIMATED_POKEMON_WIDTH = 300;
export const ESTIMATED_POKEMON_HEIGHT = 350;
export const POSITION_PADDING = 20;

export interface Position {
  top: number;
  left: number;
}

interface UsePositionReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  calculateRandomPokemonPosition: () => Position;
}

/**
 * Custom hook to manage positioning logic for the Pokémon catcher.
 */
export const usePosition = (): UsePositionReturn => {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Positioning Logic ---
  const calculateRandomPokemonPosition = useCallback((): Position => {
    if (containerRef.current) {
      const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
        containerRef.current;
      const maxTop = Math.max(
        0,
        containerHeight - ESTIMATED_POKEMON_HEIGHT - POSITION_PADDING
      );
      const maxLeft = Math.max(
        0,
        containerWidth - ESTIMATED_POKEMON_WIDTH - POSITION_PADDING
      );
      const randomTop = POSITION_PADDING + Math.random() * maxTop;
      const randomLeft = POSITION_PADDING + Math.random() * maxLeft;
      console.log(
        `Calculated position: top=${randomTop.toFixed(0)}, left=${randomLeft.toFixed(0)}`
      );
      return { top: randomTop, left: randomLeft };
    } else {
      const fallbackTop = window.innerHeight / 2 - ESTIMATED_POKEMON_HEIGHT / 2;
      const fallbackLeft = window.innerWidth / 2 - ESTIMATED_POKEMON_WIDTH / 2;
      console.warn("Container ref not available, using fallback position.");
      return { top: fallbackTop, left: fallbackLeft };
    }
  }, []);

  return {
    containerRef,
    calculateRandomPokemonPosition,
  };
};
