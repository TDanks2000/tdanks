import { useCaughtPokemon } from "@/features/pokemon/hooks";
import type { PokemonData } from "@/features/pokemon/types/pokemon";
import { useEffect, useMemo, useState } from "react";
import "./encounter.css";

const spriteUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

type EncounterState = "idle" | "throwing" | "caught" | "escaped";

export default function WildEncounter({
  pokemon,
  onClose,
}: {
  pokemon: PokemonData;
  onClose: () => void;
}) {
  const { catchPokemon, isPokemonCaught } = useCaughtPokemon();
  const [state, setState] = useState<EncounterState>("idle");
  const [attempts, setAttempts] = useState(0);
  const alreadyCaught = isPokemonCaught(pokemon.id);

  const catchChance = useMemo(() => {
    if (pokemon.id >= 144 && pokemon.id <= 151) return 0.38;
    if (pokemon.id >= 243 && pokemon.id <= 251) return 0.38;
    if (pokemon.id >= 377 && pokemon.id <= 386) return 0.38;
    return 0.72;
  }, [pokemon.id]);

  const throwBall = () => {
    if (state === "throwing" || state === "caught") return;

    setState("throwing");
    setAttempts((current) => current + 1);

    window.setTimeout(() => {
      if (alreadyCaught || Math.random() <= catchChance) {
        catchPokemon(pokemon);
        setState("caught");
        return;
      }

      setState("escaped");
      window.setTimeout(() => setState("idle"), 700);
    }, 900);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if ((key === "a" || key === "enter" || key === "e") && state !== "caught") {
        event.preventDefault();
        throwBall();
      }

      if (key === "r" || key === "escape" || key === "b") {
        event.preventDefault();
        onClose();
      }

      if (state === "caught" && (key === "a" || key === "enter" || key === "e")) {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, state]);

  return (
    <div className="encounter-screen" role="dialog" aria-modal="true" aria-label={`Wild ${pokemon.name} encounter`}>
      <div className="encounter-sky" />
      <div className="encounter-tree-line" />
      <div className="encounter-grass" />

      <div className="encounter-status">
        <div className="encounter-status__name">{pokemon.name}</div>
        <div className="encounter-status__level">Lv. {Math.max(3, Math.min(50, 4 + (pokemon.id % 23)))}</div>
        <div className="encounter-hp"><span /></div>
      </div>

      <div className={`encounter-pokemon ${state === "throwing" ? "is-targeted" : ""}`}>
        <img src={spriteUrl(pokemon.id)} alt={pokemon.name} draggable={false} />
        <span className="encounter-shadow" />
      </div>

      <div className={`encounter-ball ${state === "throwing" ? "is-thrown" : ""} ${state === "caught" ? "is-caught" : ""}`} aria-hidden="true">
        <span />
      </div>

      <section className="encounter-dialog" aria-live="polite">
        <p>
          {state === "caught"
            ? `${pokemon.name} was caught!${alreadyCaught ? " It was already registered in your collection." : " Added to your collection."}`
            : state === "throwing"
              ? "The Poké Ball is shaking..."
              : state === "escaped"
                ? `${pokemon.name} broke free!`
                : `A wild ${pokemon.name} appeared!`}
        </p>

        <div className="encounter-actions">
          {state === "caught" ? (
            <button type="button" onClick={onClose}>Continue</button>
          ) : (
            <>
              <button type="button" onClick={throwBall} disabled={state === "throwing"}>
                Throw Ball
              </button>
              <button type="button" className="secondary" onClick={onClose} disabled={state === "throwing"}>
                Run
              </button>
            </>
          )}
        </div>

        <div className="encounter-meta">
          <span>#{pokemon.pokedexNumber}</span>
          <span>{attempts > 0 ? `${attempts} throw${attempts === 1 ? "" : "s"}` : "A / Enter: Throw"}</span>
          <span>R / B: Run</span>
        </div>
      </section>
    </div>
  );
}
