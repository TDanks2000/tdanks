import { PokedexEntry } from "./PokedexEntry";

const mockPokemon = [
  { id: 1, name: "Bulbasaur", type: "Grass/Poison" },
  { id: 4, name: "Charmander", type: "Fire" },
  { id: 7, name: "Squirtle", type: "Water" },
  { id: 7, name: "Squirtle", type: "Water" },
  { id: 7, name: "Squirtle", type: "Water" },
  { id: 7, name: "Squirtle", type: "Water" },
];

export const PokedexList = () => {
  return (
    <div className="space-y-2">
      {mockPokemon.map((pokemon) => (
        <PokedexEntry key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
