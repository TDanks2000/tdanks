import { MotionValue, PanInfo } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
// Ensure these imports point to your actual types and utility functions
import { Data, PokemonData } from "../types/pokemon";
import { getRandomPokeball, getRandomPokemon } from "../utils/pokemonUtils";
import { useAnimation } from "./useAnimation";
import {
  HIDE_ANIMATION_DELAY,
  HIT_SOUND_DELAY,
  RESET_DELAY,
  REVEAL_POKEMON_DELAY,
  SUCCESS_SOUND_DELAY,
  useAudio,
} from "./useAudio";
import { useCaughtPokemon } from "./useCaughtPokemon"; // Hook to save caught Pokémon
import { useDrag } from "./useDrag";
import { Position, usePosition } from "./usePosition";

// --- Types ---
interface UsePokemonCatcherReturn {
  // State
  caughtPokemon: PokemonData | null;
  showPokeballAnimation: boolean;
  isDragging: boolean;
  isThrown: boolean;
  pokemonPosition: Position | null;
  currentPokeball: Data | null;
  isMuted: boolean;

  // Motion values
  dragX: MotionValue<number>;
  dragY: MotionValue<number>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;

  // Refs
  throwVelocity: React.RefObject<{ x: number; y: number }>;
  containerRef: React.RefObject<HTMLDivElement>;

  // Functions
  setIsDragging: (dragging: boolean) => void;
  handleDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  resetThrow: () => void;
  calculateRandomPokemonPosition: () => void;
  toggleMute: () => void;
}

/**
 * Custom hook to manage the logic for catching a Pokémon via dragging and throwing a Pokéball.
 * Includes state management, animation values, sound effects, and positioning.
 * Assumes sound files are located according to SOUND_PATHS constants.
 */
export const usePokemonCatcher = (): UsePokemonCatcherReturn => {
  // --- Animation State from useAnimation ---
  const {
    caughtPokemon,
    setCaughtPokemon,
    showPokeballAnimation,
    setShowPokeballAnimation,
    isDragging,
    setIsDragging,
    isThrown,
    setIsThrown,
    startThrowAnimation,
    hidePokeballAnimation,
    shouldResetThrow,
  } = useAnimation();

  // --- Other State ---
  const [pokemonPosition, setPokemonPosition] = useState<Position | null>(null);
  const [currentPokeball, setCurrentPokeball] = useState<Data | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // --- External Hooks ---
  const { catchPokemon: saveCaughtPokemon } = useCaughtPokemon();

  // --- Specialized Hooks ---
  const {
    throwSoundRef,
    hitSoundRef,
    successSoundRef,
    hitSoundTimeoutId,
    revealPokemonTimeoutId,
    successSoundTimeoutId,
    hideAnimationTimeoutId,
    playSound,
    playPokemonCry,
    clearAllTimeouts,
  } = useAudio();

  // --- Audio Control ---
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      // Set the muted property on all audio elements
      if (throwSoundRef.current) throwSoundRef.current.muted = newMuted;
      if (hitSoundRef.current) hitSoundRef.current.muted = newMuted;
      if (successSoundRef.current) successSoundRef.current.muted = newMuted;
      console.log(`Sound ${newMuted ? "muted" : "unmuted"}`);
      return newMuted;
    });
  }, [throwSoundRef, hitSoundRef, successSoundRef]);

  const { containerRef, calculateRandomPokemonPosition: getRandomPosition } =
    usePosition();

  const {
    dragX,
    dragY,
    springX,
    springY,
    throwVelocity,
    resetDragPosition,
    isValidThrow,
  } = useDrag();

  // --- Positioning Logic Wrapper ---
  const calculateRandomPokemonPosition = useCallback(() => {
    const position = getRandomPosition();
    setPokemonPosition(position);
  }, [getRandomPosition]);

  // --- Reset Logic ---
  const resetThrow = useCallback(() => {
    console.log(
      "Executing resetThrow: Resetting state, animations, and clearing timeouts."
    );
    // Clear any active timeouts FIRST to prevent them firing after reset
    clearAllTimeouts();

    // Reset state
    setCaughtPokemon(null);
    setShowPokeballAnimation(false);
    setIsThrown(false);
    setIsDragging(false);
    setPokemonPosition(null);
    setCurrentPokeball(getRandomPokeball());

    // Stop lingering sounds
    hitSoundRef.current?.pause();
    successSoundRef.current?.pause();

    // Reset animations
    resetDragPosition();
  }, [
    clearAllTimeouts,
    setCaughtPokemon,
    setShowPokeballAnimation,
    setIsThrown,
    setIsDragging,
    hitSoundRef,
    successSoundRef,
    resetDragPosition,
  ]);

  // --- Drag Handling ---
  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);

      if (isValidThrow(info)) {
        // --- Valid Throw ---
        console.log("Valid throw detected.");
        // Clear any previous timeouts just in case of rapid interactions (unlikely but safe)
        clearAllTimeouts();
        if (!isMuted) playSound(throwSoundRef, "throw");
        throwVelocity.current = { x: info.velocity.x, y: info.velocity.y };
        startThrowAnimation();

        // 1. Hit Sound Timeout
        hitSoundTimeoutId.current = setTimeout(() => {
          if (!isMuted) playSound(hitSoundRef, "hit");
          hitSoundTimeoutId.current = null; // Clear ref after execution
        }, HIT_SOUND_DELAY);

        // 2. Reveal Pokemon Timeout
        revealPokemonTimeoutId.current = setTimeout(() => {
          console.log("Reveal timeout: Generating Pokemon...");
          const randomPoke = getRandomPokemon();
          console.log(
            `Pokemon generated: ${randomPoke.name} (ID: ${randomPoke.id}). Setting state.`
          );
          setCaughtPokemon(randomPoke);

          // 2a. Success Sound Timeout (Nested)
          successSoundTimeoutId.current = setTimeout(() => {
            console.log("Playing success sound and cry...");
            if (!isMuted) {
              playSound(successSoundRef, "success");
              playPokemonCry(randomPoke.id);
            }
            successSoundTimeoutId.current = null; // Clear ref after execution
          }, SUCCESS_SOUND_DELAY);

          console.log("Saving caught Pokemon and calculating position...");
          saveCaughtPokemon(randomPoke);
          calculateRandomPokemonPosition();
          revealPokemonTimeoutId.current = null; // Clear ref after execution
        }, REVEAL_POKEMON_DELAY);

        // 3. Hide Animation Timeout
        hideAnimationTimeoutId.current = setTimeout(() => {
          console.log("Hiding Pokéball animation.");
          hidePokeballAnimation();
          hideAnimationTimeoutId.current = null; // Clear ref after execution
        }, HIDE_ANIMATION_DELAY);
      } else {
        // --- Invalid Throw ---
        console.log("Drag ended but not a valid throw. Animating back.");
        resetDragPosition();
        setIsThrown(false); // Ensure isThrown is false if throw fails
      }
    },
    [
      setIsDragging,
      isValidThrow,
      clearAllTimeouts,
      isMuted,
      playSound,
      throwSoundRef,
      throwVelocity,
      startThrowAnimation,
      hitSoundTimeoutId,
      revealPokemonTimeoutId,
      hideAnimationTimeoutId,
      hitSoundRef,
      setCaughtPokemon,
      successSoundTimeoutId,
      saveCaughtPokemon,
      calculateRandomPokemonPosition,
      successSoundRef,
      playPokemonCry,
      hidePokeballAnimation,
      resetDragPosition,
      setIsThrown,
    ]
  );

  // --- Effects ---

  // Set initial Pokéball
  useEffect(() => {
    setCurrentPokeball(getRandomPokeball());
  }, []);

  // Automatic Reset Effect
  useEffect(() => {
    let resetTimerId: NodeJS.Timeout | null = null;
    if (shouldResetThrow()) {
      console.log(
        `Conditions met for reset timer (${RESET_DELAY}ms). Starting timeout...`
      );
      resetTimerId = setTimeout(() => {
        console.log("Reset timer expired. Calling resetThrow.");
        resetThrow(); // resetThrow now handles clearing sequence timeouts too
      }, RESET_DELAY);
    }

    // Cleanup function for this effect's timer
    return () => {
      if (resetTimerId) {
        console.log("Clearing reset timer.");
        clearTimeout(resetTimerId);
      }
    };
  }, [shouldResetThrow, resetThrow]); // Dependency on resetThrow is important here

  // --- Return Values ---
  return {
    caughtPokemon,
    showPokeballAnimation,
    isDragging,
    isThrown,
    pokemonPosition,
    currentPokeball,
    isMuted,
    dragX,
    dragY,
    springX,
    springY,
    throwVelocity,
    containerRef,
    setIsDragging,
    handleDragEnd,
    resetThrow,
    calculateRandomPokemonPosition,
    toggleMute,
  };
};
