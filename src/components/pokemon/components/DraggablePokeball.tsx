import { motion, MotionValue, PanInfo } from "framer-motion";
import React from "react";
import { Data } from "../types/pokemon";
import { DEFAULT_POKEBALL_URL } from "../utils/pokemonUtils";

interface DraggablePokeBallProps {
  isThrown: boolean;
  caughtPokemon: Data | null;
  currentPokeball: Data | null;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement>;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  handleDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
}

export const DraggablePokeball = ({
  isThrown,
  caughtPokemon,
  currentPokeball,
  springX,
  springY,
  containerRef,
  isDragging,
  setIsDragging,
  handleDragEnd,
}: DraggablePokeBallProps) => {
  if (isThrown || caughtPokemon) return null;

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 cursor-grab active:cursor-grabbing z-20 hover:scale-110 transition-transform"
      style={{ x: springX, y: springY, translateX: "-50%" }}
      drag
      dragConstraints={containerRef}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onMouseUp={() => {
        if (isDragging) setIsDragging(false);
      }}
      onMouseLeave={() => {
        if (isDragging) setIsDragging(false);
      }}
      whileTap={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      title={`Use ${currentPokeball?.name || "Poké Ball"}`}
    >
      <img
        src={currentPokeball?.image || DEFAULT_POKEBALL_URL}
        alt={currentPokeball?.name || "Poké Ball"}
        width={80}
        height={80}
        className="object-contain pointer-events-none drop-shadow-lg filter hover:brightness-110"
        draggable="false"
      />
    </motion.div>
  );
};
