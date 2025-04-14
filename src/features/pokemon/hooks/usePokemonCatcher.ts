import {
  animate,
  MotionValue,
  PanInfo,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Data, PokemonData } from "../../../components/pokemon/types/pokemon";
import {
  getRandomPokeball,
  getRandomPokemon,
} from "../../../components/pokemon/utils/pokemonUtils";
import { useCaughtPokemon } from "./useCaughtPokemon";

interface Position {
  top: number;
  left: number;
}

interface UsePokemonCatcherReturn {
  // State
  caughtPokemon: PokemonData | null;
  showPokeballAnimation: boolean;
  isDragging: boolean;
  isThrown: boolean;
  pokemonPosition: Position | null;
  currentPokeball: Data | null;

  // Motion values
  dragX: MotionValue<number>;
  dragY: MotionValue<number>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
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
}

export const usePokemonCatcher = (): UsePokemonCatcherReturn => {
  // Component State
  const [caughtPokemon, setCaughtPokemon] = useState<PokemonData | null>(null);
  const [showPokeballAnimation, setShowPokeballAnimation] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isThrown, setIsThrown] = useState(false);
  const [pokemonPosition, setPokemonPosition] = useState<Position | null>(null);
  const [currentPokeball, setCurrentPokeball] = useState<Data | null>(null);

  // Use the caught pokemon hook to save caught pokemon
  const { catchPokemon: saveCaughtPokemon } = useCaughtPokemon();

  // Motion Values and Refs
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springX = useSpring(dragX, { damping: 20, stiffness: 300 });
  const springY = useSpring(dragY, { damping: 20, stiffness: 300 });
  const throwVelocity = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper Functions
  const calculateRandomPokemonPosition = useCallback(() => {
    if (containerRef.current) {
      const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
        containerRef.current;
      const estimatedElementWidth = 300;
      const estimatedElementHeight = 350;
      const maxTop = Math.max(0, containerHeight - estimatedElementHeight - 20);
      const maxLeft = Math.max(0, containerWidth - estimatedElementWidth - 20);
      const randomTop = 20 + Math.random() * maxTop;
      const randomLeft = 20 + Math.random() * maxLeft;
      setPokemonPosition({ top: randomTop, left: randomLeft });
    } else {
      setPokemonPosition({
        top: window.innerHeight / 2 - 175,
        left: window.innerWidth / 2 - 150,
      });
    }
  }, []);

  const resetThrow = useCallback(() => {
    setCaughtPokemon(null);
    setShowPokeballAnimation(false);
    setIsThrown(false);
    setIsDragging(false);
    setPokemonPosition(null);
    setCurrentPokeball(getRandomPokeball());
    dragX.set(0);
    dragY.set(0);
    animate(dragX, 0, { type: "spring", stiffness: 300, damping: 20 });
    animate(dragY, 0, { type: "spring", stiffness: 300, damping: 20 });
  }, [dragX, dragY]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      const { offset, velocity } = info;
      const dragDistance = Math.sqrt(
        Math.pow(offset.x, 2) + Math.pow(offset.y, 2)
      );
      const velocityMagnitude = Math.sqrt(
        Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2)
      );
      const throwDistanceThreshold = 80;
      const velocityThreshold = 300;
      const upwardVelocityThreshold = -150;

      if (
        (dragDistance > throwDistanceThreshold ||
          velocityMagnitude > velocityThreshold) &&
        velocity.y < upwardVelocityThreshold
      ) {
        throwVelocity.current = { x: velocity.x, y: velocity.y };
        setIsThrown(true);
        setShowPokeballAnimation(true);

        setTimeout(() => {
          const randomPoke = getRandomPokemon();
          setCaughtPokemon(randomPoke);
          // Save the caught pokemon to localStorage
          saveCaughtPokemon(randomPoke);
          calculateRandomPokemonPosition();
        }, 800);

        setTimeout(() => {
          setShowPokeballAnimation(false);
        }, 1500);
      } else {
        animate(dragX, 0, { type: "spring", stiffness: 300, damping: 20 });
        animate(dragY, 0, { type: "spring", stiffness: 300, damping: 20 });
        setIsThrown(false);
      }
    },
    [calculateRandomPokemonPosition, dragX, dragY, saveCaughtPokemon]
  );

  // Effects
  useEffect(() => {
    setCurrentPokeball(getRandomPokeball());
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (caughtPokemon && !showPokeballAnimation) {
      timer = setTimeout(() => {
        resetThrow();
      }, 2500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [caughtPokemon, showPokeballAnimation, resetThrow]);

  return {
    // State
    caughtPokemon,
    showPokeballAnimation,
    isDragging,
    isThrown,
    pokemonPosition,
    currentPokeball,

    // Motion values
    dragX,
    dragY,
    springX,
    springY,
    throwVelocity,
    containerRef,

    // Functions
    setIsDragging,
    handleDragEnd,
    resetThrow,
    calculateRandomPokemonPosition,
  };
};
