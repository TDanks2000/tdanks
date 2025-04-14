import { PokemonData } from "@/features/pokemon/types/pokemon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CaughtPokemonData extends PokemonData {
  dateCaught: string;
}

interface UseCaughtPokemonReturn {
  // State
  caughtPokemon: CaughtPokemonData[];
  isLoading: boolean;
  isError: boolean;

  // Functions
  catchPokemon: (pokemon: PokemonData) => void;
  releasePokemon: (pokemonId: number) => void;
  isPokemonCaught: (pokemonId: number) => boolean;
  getCaughtPokemonById: (pokemonId: number) => CaughtPokemonData | undefined;
}

const STORAGE_KEY = "caught-pokemon";

// Query key for caught pokemon
const caughtPokemonKey = ["caught-pokemon"];

// Helper functions for localStorage operations
const getCaughtPokemonFromStorage = (): CaughtPokemonData[] => {
  if (typeof window === "undefined") return [];

  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData) as CaughtPokemonData[];
    }
  } catch (error) {
    console.error("Failed to load caught Pokémon from localStorage:", error);
  }
  return [];
};

const saveCaughtPokemonToStorage = (data: CaughtPokemonData[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save caught Pokémon to localStorage:", error);
  }
};

export const useCaughtPokemon = (): UseCaughtPokemonReturn => {
  const queryClient = useQueryClient();

  // Query to fetch caught pokemon from localStorage
  const {
    data: caughtPokemon = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: caughtPokemonKey,
    queryFn: getCaughtPokemonFromStorage,
    // Disable automatic refetching since localStorage doesn't change externally
    staleTime: Infinity,
  });

  // Mutation to add a pokemon to the caught list
  const catchMutation = useMutation({
    mutationFn: async (pokemon: PokemonData) => {
      const current = getCaughtPokemonFromStorage();

      // Check if already caught
      if (current.some((p) => p.id === pokemon.id)) {
        return Promise.resolve(current);
      }

      // Add with current date
      const updated = [
        ...current,
        {
          ...pokemon,
          dateCaught: new Date().toISOString(),
        },
      ];

      saveCaughtPokemonToStorage(updated);
      return Promise.resolve(updated);
    },
    onSuccess: (updatedPokemon) => {
      queryClient.setQueryData(caughtPokemonKey, updatedPokemon);
    },
  });

  // Mutation to remove a pokemon from the caught list
  const releaseMutation = useMutation({
    mutationFn: async (pokemonId: number) => {
      const current = getCaughtPokemonFromStorage();
      const updated = current.filter((p) => p.id !== pokemonId);
      saveCaughtPokemonToStorage(updated);
      return Promise.resolve(updated);
    },
    onSuccess: (updatedPokemon) => {
      queryClient.setQueryData(caughtPokemonKey, updatedPokemon);
    },
  });

  // Check if a pokemon is caught
  const isPokemonCaught = (pokemonId: number): boolean => {
    return caughtPokemon.some((p) => p.id === pokemonId);
  };

  // Get a caught pokemon by ID
  const getCaughtPokemonById = (
    pokemonId: number
  ): CaughtPokemonData | undefined => {
    return caughtPokemon.find((p) => p.id === pokemonId);
  };

  return {
    caughtPokemon,
    isLoading,
    isError,
    catchPokemon: catchMutation.mutate,
    releasePokemon: releaseMutation.mutate,
    isPokemonCaught,
    getCaughtPokemonById,
  };
};
