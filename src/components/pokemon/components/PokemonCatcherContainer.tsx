import { cn } from "@/lib/utils";
import { animate, PanInfo, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Data, PokemonData } from "../types/pokemon";
import { getRandomPokeball, getRandomPokemon } from "../utils/pokemonUtils";
import { CaughtPokemonDisplay } from "./CaughtPokemonDisplay";
import { DraggablePokeball } from "./DraggablePokeball";
import { InstructionsText } from "./InstructionsText";
import { ThrowAnimation } from "./ThrowAnimation";

const PokemonCatcherContainer = () => {
  // Component State
  const [caughtPokemon, setCaughtPokemon] = useState<PokemonData | null>(null);
  const [showPokeballAnimation, setShowPokeballAnimation] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isThrown, setIsThrown] = useState(false);
  const [pokemonPosition, setPokemonPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [currentPokeball, setCurrentPokeball] = useState<Data | null>(null);

  // Motion Values and Refs
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springX = useSpring(dragX, { damping: 20, stiffness: 300 });
  const springY = useSpring(dragY, { damping: 20, stiffness: 300 });
  const throwVelocity = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper Functions
  const calculateRandomPokemonPosition = () => {
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
  };

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

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
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
  };

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

export default PokemonCatcherContainer;
