import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PokedexButton } from "../../../../components/pokemon/components/pokedex/button";
import { PokedexHeader } from "../../../../components/pokemon/components/pokedex/PokedexHeader";
import { usePokedex } from "../../hooks";
import { PokedexEntry } from "./PokedexEntry";
import { PokedexSearch } from "./PokedexSearch";
import { useState } from "react";

export const Pokedex = () => {
  const [open, setOpen] = useState(false);
  const { searchQuery, filteredPokemon, setSearchQuery } = usePokedex();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PokedexButton open={open} setOpen={setOpen} />
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg p-4 sm:p-0 overflow-hidden border-none shadow-xl">
        {/* Pokedex top section (red) */}
        <div className="bg-red-600 p-4 relative">
          <div className="absolute left-4 top-4 flex space-x-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white ring-2 ring-blue-700 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-200 animate-pulse"></div>
            </div>
            <div className="w-3 h-3 rounded-full bg-red-400 border border-red-700 mt-1"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-700 mt-1"></div>
            <div className="w-3 h-3 rounded-full bg-green-400 border border-green-700 mt-1"></div>
          </div>

          <div className="pt-6">
            <PokedexHeader />
          </div>
        </div>

        {/* Pokedex middle section (black divider with hinge) */}
        <div className="h-4 bg-black flex items-center justify-end pr-12">
          <div className="w-16 h-8 bg-black rounded-full border-t-2 border-gray-700 relative bottom-4"></div>
        </div>

        {/* Pokedex bottom section (content area) */}
        <div className="bg-gray-100 p-4">
          <div className="bg-white rounded-lg p-3 border border-gray-300 shadow-inner">
            <PokedexSearch
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="max-h-[300px] overflow-y-auto pr-1 pokedex-scrollbar">
              <div className="space-y-2">
                {filteredPokemon.map((pokemon) => (
                  <PokedexEntry key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
