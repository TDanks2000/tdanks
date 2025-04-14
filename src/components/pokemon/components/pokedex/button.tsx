import { CgPokemon } from "react-icons/cg";

export const PokedexButton = () => {
  return (
    <button
      className="group bg-red-600 p-2 rounded-full shadow-lg hover:bg-red-700 transition-all duration-200 relative"
      aria-label="Open Pokedex"
    >
      {/* <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-blue-500 border border-white"></div> */}
      <CgPokemon className="size-8 text-white transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-lg" />
    </button>
  );
};
