import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils"; // adjust the import path as needed
import { ButtonHTMLAttributes, ReactNode } from "react";

type PokemonButtonProps = {
  tooltipContent: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const PokemonButton = ({
  tooltipContent,
  children,
  className,
  ...props
}: PokemonButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          {...props}
          className={cn(
            "group relative w-16 h-16 rounded-full overflow-hidden border-2 border-black/90",
            "hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out",
            "shadow-[2px_2px_12px_rgba(0,0,0,0.25)] active:scale-95",
            className
          )}
        >
          {/* Enhanced top red gradient with more vibrant Pokemon colors */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-600 via-red-500 to-red-700 transition-colors duration-300 group-hover:from-red-500 group-hover:via-red-400 group-hover:to-red-600 after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-300" />
          {/* Enhanced bottom half with metallic shine */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-50 to-white after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-300" />

          {/* Enhanced center divider with metallic effect */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/90 z-10 shadow-[0_1px_2px_rgba(255,255,255,0.3)]" />

          {/* Enhanced center button with metallic shine and 3D effect */}
          <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-gradient-to-br from-gray-50 via-white to-gray-100 border-2 border-black/90 rounded-full z-20 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.5),inset_0_0_4px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out shadow-[0_0_4px_rgba(255,255,255,0.3),inset_0_0_2px_rgba(0,0,0,0.1)]" />

          {/* Enhanced icon container with improved visibility and effects */}
          <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rotate-[360deg]">
            <div className="bg-white/95 p-1.5 rounded-full backdrop-blur-[3px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] ring-1 ring-black/10 group-hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-shadow duration-300">
              {children}
            </div>
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent
        className={cn(
          "bg-gradient-to-b from-white to-gray-50 text-black/90 border-2 border-black/75",
          "rounded-lg shadow-lg px-3 py-1.5 text-sm font-medium font-londrina-solid",
          "animate-in fade-in-0 zoom-in-95 duration-300"
        )}
        sideOffset={8}
        showArrow={false}
      >
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
};
