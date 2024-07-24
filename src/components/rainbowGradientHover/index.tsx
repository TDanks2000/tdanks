import { FC, PropsWithChildren } from "react";

const RainbowGradientHover: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
      {children}
    </div>
  );
};

export default RainbowGradientHover;
