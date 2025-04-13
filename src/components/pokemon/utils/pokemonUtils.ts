import pokeballs from "@/data/pokeballs.json";
import pokemons from "@/data/pokemons.json";
import { Data } from "../types/pokemon";

export const DEFAULT_POKEBALL_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

export const getRandomPokemon = (): Data => {
  if (!pokemons || pokemons.length === 0) {
    return { name: "MissingNo.", image: "" };
  }
  const randomIndex = Math.floor(Math.random() * pokemons.length);
  return pokemons[randomIndex];
};

export const getRandomPokeball = (): Data => {
  if (!pokeballs || pokeballs.length === 0) {
    return { name: "Poké Ball", image: DEFAULT_POKEBALL_URL };
  }
  const randomIndex = Math.floor(Math.random() * pokeballs.length);
  return pokeballs[randomIndex]?.image
    ? pokeballs[randomIndex]
    : { name: "Poké Ball", image: DEFAULT_POKEBALL_URL };
};
