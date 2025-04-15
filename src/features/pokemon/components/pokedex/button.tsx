import { PokemonButton } from "@/features/pokemon/components/pokemon-button";
import { Dispatch, SetStateAction } from "react";
import { CgPokemon } from "react-icons/cg";

interface PokedexButtonProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const PokedexButton = ({ open, setOpen }: PokedexButtonProps) => {
  return (
    <PokemonButton
      tooltipContent="Open Pokedex"
      aria-label="Open Pokedex"
      onClick={() => {
        setOpen(!open);
      }}
    >
      <CgPokemon className="text-black text-xl" />
    </PokemonButton>
  );
};
