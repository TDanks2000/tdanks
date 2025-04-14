import { constants } from "@/data/constants";

interface PokedexEntryProps {
  pokemon: {
    id: number;
    name: string;
    pokedexNumber?: string;
    isCaught?: boolean;
  };
}

export const PokedexEntry = ({ pokemon }: PokedexEntryProps) => {
  return (
    <div className="flex items-center p-2 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
      <div className="size-11 mr-3 flex-shrink-0 relative">
        {!pokemon.isCaught ? (
          <div className="rounded-full size-full text-black justify-center items-center flex text-2xl bg-card/40 absolute inset-0 z-10">
            ?
          </div>
        ) : (
          <img
            src={`${constants.pokemon.imageBaseURL}/${pokemon.id}.png`}
            alt={pokemon.name}
            className={`size-full object-contain`}
            loading="lazy"
          />
        )}
      </div>
      <div>
        <div className="text-xs text-gray-500">
          #{pokemon.pokedexNumber || pokemon.id.toString().padStart(3, "0")}
        </div>
        <div className="font-medium text-black">{pokemon.name}</div>
      </div>
    </div>
  );
};
