import { Search } from "lucide-react";

interface PokedexSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PokedexSearch = ({ value, onChange }: PokedexSearchProps) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm text-black"
          value={value}
          onChange={onChange}
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};
