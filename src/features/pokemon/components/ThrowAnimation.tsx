import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Data } from "../types/pokemon";
import { DEFAULT_POKEBALL_URL } from "../utils/pokemonUtils";

interface ThrowAnimationProps {
  showPokeballAnimation: boolean;
  throwVelocity: React.RefObject<{ x: number; y: number }>;
  currentPokeball: Data | null;
}

// Pokeball shake timings and intensities
const SHAKE_SEQUENCE = [
  { rotate: -30, duration: 0.25, scale: 1.15 }, // Initial strong shake with bigger movement
  { rotate: 30, duration: 0.25, scale: 1.15 },
  { rotate: -25, duration: 0.2, scale: 1.1 }, // Strong follow-up
  { rotate: 25, duration: 0.2, scale: 1.1 },
  { rotate: -20, duration: 0.18, scale: 1.08 }, // Medium intensity
  { rotate: 20, duration: 0.18, scale: 1.08 },
  { rotate: -15, duration: 0.15, scale: 1.05 }, // Gradual decrease
  { rotate: 15, duration: 0.15, scale: 1.05 },
  { rotate: -10, duration: 0.12, scale: 1.02 }, // Subtle movement
  { rotate: 10, duration: 0.12, scale: 1.02 },
  { rotate: -5, duration: 0.1, scale: 1 }, // Final settling
  { rotate: 5, duration: 0.1, scale: 1 },
  { rotate: 0, duration: 0.08, scale: 1 },
];

export const ThrowAnimation = ({
  showPokeballAnimation,
  throwVelocity,
  currentPokeball,
}: ThrowAnimationProps) => {
  const [shakeStep, setShakeStep] = useState(0);

  useEffect(() => {
    if (!showPokeballAnimation) {
      setShakeStep(0);
      return;
    }
    // Sequence: Drop -> Shake
    let timers: NodeJS.Timeout[] = [];
    // Start shake sequence
    let total = 0;
    SHAKE_SEQUENCE.forEach((step, idx) => {
      timers.push(
        setTimeout(() => setShakeStep(idx + 1), total + step.duration * 1000)
      );
      total += step.duration * 1000;
    });
    // Reset after sequence
    timers.push(
      setTimeout(() => {
        setShakeStep(0);
      }, total + 500)
    );
    return () => timers.forEach(clearTimeout);
  }, [showPokeballAnimation]);

  // Calculate rotation and scale for shake
  let rotate = 0;
  let scale = 1;
  if (shakeStep > 0 && shakeStep <= SHAKE_SEQUENCE.length) {
    rotate = SHAKE_SEQUENCE[shakeStep - 1].rotate;
    scale = SHAKE_SEQUENCE[shakeStep - 1].scale;
  }

  return (
    <AnimatePresence>
      {showPokeballAnimation && (
        <motion.div
          className="absolute top-1/2 left-1/2 z-30 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          style={{ translateX: "-50%", translateY: "-50%" }}
          initial={{
            opacity: 0,
            x: throwVelocity.current!.x * 0.1,
            y: 150 + throwVelocity.current!.y * 0.1,
            scale: 1,
            rotate: 0,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: scale,
            rotate: rotate,
            transition: {
              x: {
                type: "spring",
                stiffness: 120,
                damping: 15,
                velocity: throwVelocity?.current!.x * 0.5,
              },
              y: {
                type: "spring",
                stiffness: 120,
                damping: 15,
                velocity: throwVelocity?.current!.y * 0.5,
              },
              rotate: { duration: 0.18 },
              scale: { duration: 0.2 },
              opacity: { duration: 0.2 },
            },
          }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
        >
          <img
            src={currentPokeball?.image || DEFAULT_POKEBALL_URL}
            alt={`Throwing ${currentPokeball?.name || "Poké Ball"}`}
            width={80}
            height={80}
            className="object-contain filter brightness-110"
            draggable="false"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
