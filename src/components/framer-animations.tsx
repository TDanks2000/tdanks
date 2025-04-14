import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, ReactNode } from "react";

// Enhanced RainbowGradientHover with Framer Motion
export const MotionRainbowGradientHover = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      className="rounded-xl bg-linear-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl"
      whileHover={{
        backgroundSize: "400% 400%",
        boxShadow:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      {children}
    </motion.div>
  );
};

// Enhanced RainbowText with Framer Motion
export const MotionRainbowText = ({
  children,
  className,
  ...rest
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <motion.span
      className={`text-transparent bg-linear-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text ${className || ""}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 10,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      {...rest}
    >
      {children}
    </motion.span>
  );
};

// Fade-in animation component
export const FadeIn = ({
  children,
  delay = 0,
}: PropsWithChildren<{ delay?: number }>) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
}: PropsWithChildren<{ staggerDelay?: number }>) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger item to be used with StaggerContainer
export const StaggerItem = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// Animated presence wrapper for smooth transitions
export const AnimatedTransition = ({
  children,
  isVisible,
  key,
}: {
  children: ReactNode;
  isVisible: boolean;
  key: string | number;
}) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
