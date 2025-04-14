import { Pokedex, PokemonCatcher } from "@/features/pokemon/components";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/pokemon-catcher")({
  component: Component,
});

export function Component() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-md mx-auto relative">
        <PokemonCatcher />

        {/* Pokedex component with dialog */}
        <Pokedex />
      </div>
    </div>
  );
}
