import { Volume2, VolumeOff } from "lucide-react";
import { PokemonButton } from "./pokemon-button";

type MuteButtonProps = {
  isMuted: boolean;
  toggleMute: () => void;
};

export const MuteButton = ({ isMuted, toggleMute }: MuteButtonProps) => {
  return (
    <PokemonButton
      onClick={toggleMute}
      aria-label="Toggle mute"
      tooltipContent={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? (
        <VolumeOff className="text-black size-5" />
      ) : (
        <Volume2 className="text-black size-5" />
      )}
    </PokemonButton>
  );
};
