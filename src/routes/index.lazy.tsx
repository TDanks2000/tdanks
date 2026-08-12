import { createLazyFileRoute } from "@tanstack/react-router";
import GameShell from "@/features/game/GameShell";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <GameShell />;
}
