import { PropsWithChildren } from "react";
import { MotionRainbowGradientHover } from "../framer-animations";

// This component now uses the Framer Motion enhanced version for better performance
const RainbowGradientHover = ({ children }: PropsWithChildren) => {
  return <MotionRainbowGradientHover>{children}</MotionRainbowGradientHover>;
};

export default RainbowGradientHover;
