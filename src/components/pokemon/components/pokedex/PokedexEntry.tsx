export const PokedexEntry = ({
  pokemon,
}: {
  pokemon: { id: number; name: string; type: string };
}) => {
  return (
    <div className="p-3 border-b border-gray-200 hover:bg-gray-50 transition flex items-center space-x-4">
      {/* Image */}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
        className="w-12 h-12"
      />

      {/* ID badge */}
      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center border border-red-200">
        <span className="text-xs font-mono text-red-600">#{pokemon.id}</span>
      </div>

      {/* Name + types */}
      <div>
        <h3 className="font-semibold">{pokemon.name}</h3>
        <div className="flex space-x-1 mt-1">
          {pokemon.type.split("/").map((type, index) => (
            <span
              key={index}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
