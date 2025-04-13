import { HtmlHTMLAttributes, PropsWithChildren } from "react";
import { MotionRainbowText } from "./framer-animations";

interface RainbowTextProps extends HtmlHTMLAttributes<HTMLSpanElement> {}

// This component now uses the Framer Motion enhanced version for better performance
const RainbowText = ({
  children: text,
  className,
  ...rest
}: PropsWithChildren<RainbowTextProps>) => {
  return (
    <MotionRainbowText className={className} {...rest}>
      {text}
    </MotionRainbowText>
  );
};

export default RainbowText;
