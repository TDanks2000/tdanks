import PokemonCatcher from "@/components/pokemon/PokemonCatcher";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/pokemon-catcher")({
  component: Component,
});

export function Component() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-md mx-auto">
        <PokemonCatcher />
      </div>
    </div>
  );
}
