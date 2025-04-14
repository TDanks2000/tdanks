import pokemonData from "@/data/pokemons.json";
import { useState } from "react";
import { useCaughtPokemon } from "./useCaughtPokemon";

interface Pokemon {
  id: number;
  name: string;
  pokedexNumber: string;
}

interface EnhancedPokemon extends Pokemon {
  isCaught: boolean;
}

interface UsePokedexReturn {
  // State
  searchQuery: string;
  filteredPokemon: EnhancedPokemon[];

  // Functions
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

export const usePokedex = (): UsePokedexReturn => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isPokemonCaught } = useCaughtPokemon();

  // Get all pokemon from the data file
  const allPokemon = pokemonData.pokemon || [];

  // Enhance pokemon with caught status
  const enhancedPokemon: EnhancedPokemon[] = allPokemon.map((pokemon) => ({
    ...pokemon,
    isCaught: isPokemonCaught(pokemon.id),
  }));

  // Filter pokemon based on search query
  const filteredPokemon =
    searchQuery.trim() === ""
      ? enhancedPokemon
      : enhancedPokemon.filter(
          (pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pokemon.pokedexNumber.includes(searchQuery)
        );

  const clearSearch = () => setSearchQuery("");

  return {
    searchQuery,
    filteredPokemon,
    setSearchQuery,
    clearSearch,
  };
};
