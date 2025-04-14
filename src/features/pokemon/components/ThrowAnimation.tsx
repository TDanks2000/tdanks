import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Data } from "../types/pokemon";
import { DEFAULT_POKEBALL_URL } from "../utils/pokemonUtils";

interface ThrowAnimationProps {
  showPokeballAnimation: boolean;
  throwVelocity: React.RefObject<{ x: number; y: number }>;
  currentPokeball: Data | null;
}

export const ThrowAnimation = ({
  showPokeballAnimation,
  throwVelocity,
  currentPokeball,
}: ThrowAnimationProps) => {
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
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: [1, 1.3, 0.8, 1.1, 1],
            rotate: 1080,
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
              rotate: { duration: 1.0, ease: "linear" },
              scale: { duration: 0.8, times: [0, 0.3, 0.6, 0.8, 1] },
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
            className="object-contain drop-shadow-lg filter brightness-110"
            draggable="false"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
