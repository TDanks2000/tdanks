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
            "group relative w-16 h-16 rounded-full overflow-hidden border-[2.5px] border-black shadow-md",
            "hover:scale-105 transition-transform duration-200",
            className
          )}
        >
          {/* Top red gradient half */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-600 to-red-700" />
          {/* Bottom half */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white" />
          {/* Center black divider */}
          <div className="absolute top-1/2 left-0 w-full h-[3px] bg-black z-10" />

          {/* Center "Pokeball button" */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white border-[2px] border-black rounded-full z-20 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform" />

          {/* Icon Layer */}
          <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white/80 p-1 rounded-full backdrop-blur-sm shadow-sm">
              {children}
            </div>
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent
        className={
          "bg-white text-black border border-black rounded-md shadow-lg px-3 py-1 text-sm font-medium font-londrina-solid"
        }
        showArrow={false}
      >
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
};
