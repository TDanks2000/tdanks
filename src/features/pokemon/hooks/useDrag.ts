import {
  animate,
  MotionValue,
  PanInfo,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { MutableRefObject, useCallback, useRef } from "react";

interface UseDragReturn {
  // Motion values
  dragX: MotionValue<number>;
  dragY: MotionValue<number>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  throwVelocity: MutableRefObject<{ x: number; y: number }>;

  // Animation helpers
  resetDragPosition: () => void;
  isValidThrow: (info: PanInfo) => boolean;
}

/**
 * Custom hook to manage drag motion values and animations for the Pokémon catcher.
 */
export const useDrag = (): UseDragReturn => {
  // --- Motion Values ---
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springX = useSpring(dragX, { damping: 20, stiffness: 300 });
  const springY = useSpring(dragY, { damping: 20, stiffness: 300 });
  const throwVelocity = useRef({ x: 0, y: 0 });

  // --- Animation Helpers ---
  const resetDragPosition = useCallback(() => {
    dragX.set(0);
    dragY.set(0);
    animate(dragX, 0, { type: "spring", stiffness: 300, damping: 20 });
    animate(dragY, 0, { type: "spring", stiffness: 300, damping: 20 });
  }, [dragX, dragY]);

  // --- Throw Validation ---
  const isValidThrow = useCallback((info: PanInfo): boolean => {
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

    return (
      (dragDistance > throwDistanceThreshold ||
        velocityMagnitude > velocityThreshold) &&
      velocity.y < upwardVelocityThreshold
    );
  }, []);

  return {
    dragX,
    dragY,
    springX,
    springY,
    throwVelocity,
    resetDragPosition,
    isValidThrow,
  };
};
