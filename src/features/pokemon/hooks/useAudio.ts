import { MutableRefObject, useCallback, useEffect, useRef } from "react";

// Assumes sound files are in your /public/sounds/ directory
export const SOUND_PATHS = {
  throw: "/sounds/pokeball_throw.mp3",
  hit: "/sounds/pokeball_hit.mp3",
  success: "/sounds/catch_success.mp3",
  cryBase: "/sounds/cries/",
};

// Timing constants (in milliseconds)
export const HIT_SOUND_DELAY = 300;
export const REVEAL_POKEMON_DELAY = 1200;
export const SUCCESS_SOUND_DELAY = 50;
export const HIDE_ANIMATION_DELAY = 2500;
export const RESET_DELAY = 3000;

interface UseAudioReturn {
  // Refs for audio elements
  throwSoundRef: MutableRefObject<HTMLAudioElement | null>;
  hitSoundRef: MutableRefObject<HTMLAudioElement | null>;
  successSoundRef: MutableRefObject<HTMLAudioElement | null>;

  // Refs for timeout IDs
  hitSoundTimeoutId: MutableRefObject<NodeJS.Timeout | null>;
  revealPokemonTimeoutId: MutableRefObject<NodeJS.Timeout | null>;
  successSoundTimeoutId: MutableRefObject<NodeJS.Timeout | null>;
  hideAnimationTimeoutId: MutableRefObject<NodeJS.Timeout | null>;

  // Functions
  playSound: (
    audioRef: React.RefObject<HTMLAudioElement | null>,
    soundName: string
  ) => void;
  playPokemonCry: (pokemonId: number | string) => void;
  clearAllTimeouts: () => void;
}

/**
 * Custom hook to manage audio playback and timeouts for the Pokémon catcher.
 */
export const useAudio = (): UseAudioReturn => {
  // --- Refs for Audio & Timeouts ---
  const throwSoundRef = useRef<HTMLAudioElement | null>(null);
  const hitSoundRef = useRef<HTMLAudioElement | null>(null);
  const successSoundRef = useRef<HTMLAudioElement | null>(null);

  // Refs to store timeout IDs for cleanup
  const hitSoundTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const revealPokemonTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const successSoundTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const hideAnimationTimeoutId = useRef<NodeJS.Timeout | null>(null);

  // --- Helper Function to Clear All Timeouts ---
  const clearAllTimeouts = useCallback(() => {
    if (hitSoundTimeoutId.current) clearTimeout(hitSoundTimeoutId.current);
    if (revealPokemonTimeoutId.current)
      clearTimeout(revealPokemonTimeoutId.current);
    if (successSoundTimeoutId.current)
      clearTimeout(successSoundTimeoutId.current);
    if (hideAnimationTimeoutId.current)
      clearTimeout(hideAnimationTimeoutId.current);

    hitSoundTimeoutId.current = null;
    revealPokemonTimeoutId.current = null;
    successSoundTimeoutId.current = null;
    hideAnimationTimeoutId.current = null;
    console.log("Cleared active sequence timeouts.");
  }, []);

  // --- Initialize Audio ---
  useEffect(() => {
    console.log("Initializing audio objects...");
    throwSoundRef.current = new Audio(SOUND_PATHS.throw);
    hitSoundRef.current = new Audio(SOUND_PATHS.hit);
    successSoundRef.current = new Audio(SOUND_PATHS.success);

    throwSoundRef.current.onerror = () =>
      console.error(`Error loading throw sound: ${SOUND_PATHS.throw}`);
    hitSoundRef.current.onerror = () =>
      console.error(`Error loading hit sound: ${SOUND_PATHS.hit}`);
    successSoundRef.current.onerror = () =>
      console.error(`Error loading success sound: ${SOUND_PATHS.success}`);

    console.log("Audio objects created.");

    // Cleanup function to clear timeouts if the component unmounts mid-sequence
    return () => {
      console.log("Cleaning up timeouts on component unmount.");
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]); // Runs once on mount, cleanup runs on unmount

  // --- Sound Playback Helpers ---
  const playSound = useCallback(
    (audioRef: React.RefObject<HTMLAudioElement | null>, soundName: string) => {
      if (audioRef.current) {
        console.log(`Attempting to play sound: ${soundName}`);
        if (!audioRef.current.paused) {
          audioRef.current.pause();
        }
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .then(() => {
            // console.log(`Successfully started playing sound: ${soundName}`); // Optional: reduce log noise
          })
          .catch((error) => {
            console.error(
              `Audio play failed for ${soundName}:`,
              error.name,
              error.message
            );
          });
      } else {
        console.warn(`Audio ref not ready for sound: ${soundName}`);
      }
    },
    []
  );

  const playPokemonCry = useCallback((pokemonId: number | string) => {
    const cryPath = `${SOUND_PATHS.cryBase}${pokemonId}.mp3`;
    console.log(`Attempting to play cry: ${cryPath}`);
    const crySound = new Audio(cryPath);
    crySound.onerror = () =>
      console.error(`Error loading cry sound: ${cryPath}`);
    crySound
      .play()
      .then(() => {
        // console.log(`Successfully started playing cry for Pokemon ${pokemonId}`); // Optional: reduce log noise
      })
      .catch((error) => {
        console.error(
          `Failed to play cry for Pokemon ${pokemonId} (${cryPath}):`,
          error.name,
          error.message
        );
      });
  }, []);

  return {
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
  };
};
