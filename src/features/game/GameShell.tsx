import { useNavigate } from "@tanstack/react-router";
import {
  Github,
  HeartPulse,
  Mail,
  PackageOpen,
  UserRound,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./game.css";

type PlayerPosition = { x: number; y: number };
type LocationAction = "projectdex" | "external" | "route" | "mailto" | "menu";
type LocationVariant = "project" | "api" | "cave" | "wellness" | "contact" | "gate";

type GameLocation = {
  id: string;
  title: string;
  description: string;
  action: LocationAction;
  target?: string;
  variant: LocationVariant;
  x: number;
  y: number;
  width: number;
  height: number;
  interactionRadius: number;
  blocksMovement?: boolean;
};

const LOCATIONS: GameLocation[] = [
  {
    id: "api-lab",
    title: "API Lab",
    description: "Where typed API clients and developer tooling are built.",
    action: "external",
    target: "https://github.com/Api-Wrappers",
    variant: "api",
    x: 18,
    y: 15,
    width: 17,
    height: 20,
    interactionRadius: 6.5,
    blocksMovement: true,
  },
  {
    id: "projectdex",
    title: "ProjectDex Hall",
    description: "Browse the projects discovered across the TDanks Region.",
    action: "projectdex",
    variant: "project",
    x: 42,
    y: 12,
    width: 19,
    height: 21,
    interactionRadius: 6.5,
    blocksMovement: true,
  },
  {
    id: "github",
    title: "GitHub Cave",
    description: "A cavern full of commits, experiments, and open-source work.",
    action: "external",
    target: "https://github.com/TDanks2000",
    variant: "cave",
    x: 73,
    y: 15,
    width: 16,
    height: 20,
    interactionRadius: 7,
    blocksMovement: true,
  },
  {
    id: "wellness",
    title: "Wellness Center",
    description: "A quiet place with mental-health reminders and trusted support.",
    action: "route",
    target: "/mental-health/quote",
    variant: "wellness",
    x: 19,
    y: 59,
    width: 18,
    height: 21,
    interactionRadius: 6.5,
    blocksMovement: true,
  },
  {
    id: "contact",
    title: "Contact Center",
    description: "Send Tommy a message without leaving the region for long.",
    action: "mailto",
    target: "mailto:tommydanks2000@outlook.com",
    variant: "contact",
    x: 67,
    y: 58,
    width: 18,
    height: 21,
    interactionRadius: 6.5,
    blocksMovement: true,
  },
  {
    id: "trainer",
    title: "Trainer Card",
    description: "Open your in-game menu and view the developer behind the region.",
    action: "menu",
    variant: "gate",
    x: 82,
    y: 73,
    width: 14,
    height: 12,
    interactionRadius: 7,
  },
];

const TREES = [
  [12, 12, 1.2], [12, 26, 1], [13, 70, 1.1], [13, 85, 1.2],
  [20, 42, .9], [25, 8, .85], [29, 42, 1.05], [35, 9, 1],
  [38, 76, .95], [40, 88, 1.1], [63, 9, 1], [66, 38, .9],
  [71, 87, 1.05], [80, 41, 1], [91, 12, 1.2], [92, 29, .95],
  [91, 58, 1.1], [91, 90, 1.2], [61, 77, .85], [34, 60, .8],
] as const;

const ROCKS = [[38, 33], [64, 35], [61, 70], [87, 48], [16, 39], [55, 86]] as const;
const START_POSITION: PlayerPosition = { x: 51.5, y: 53 };
const MOVE_SPEED = 0.019;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function distanceToLocation(player: PlayerPosition, location: GameLocation) {
  const nearestX = clamp(player.x, location.x, location.x + location.width);
  const nearestY = clamp(player.y, location.y, location.y + location.height);
  return Math.hypot(player.x - nearestX, player.y - nearestY);
}

function isBlocked(position: PlayerPosition) {
  return LOCATIONS.some((location) => {
    if (!location.blocksMovement) return false;
    const margin = 0.8;
    return (
      position.x > location.x - margin &&
      position.x < location.x + location.width + margin &&
      position.y > location.y - margin &&
      position.y < location.y + location.height + margin
    );
  });
}

function Building({
  location,
  isNear,
  onInteract,
}: {
  location: GameLocation;
  isNear: boolean;
  onInteract: () => void;
}) {
  const style = {
    left: `${location.x}%`,
    top: `${location.y}%`,
    width: `${location.width}%`,
    height: `${location.height}%`,
  };

  if (location.variant === "cave") {
    return (
      <button
        type="button"
        aria-label={`Enter ${location.title}`}
        className={`game-building ${isNear ? "is-near" : ""}`}
        style={style}
        onClick={onInteract}
      >
        <span className="game-cave" />
        <span className="game-building__sign" style={{ top: "20%" }}>{location.title}</span>
      </button>
    );
  }

  if (location.variant === "gate") {
    return (
      <button
        type="button"
        aria-label={`Open ${location.title}`}
        className={`game-building ${isNear ? "is-near" : ""}`}
        style={style}
        onClick={onInteract}
      >
        <span className="game-gate" />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Enter ${location.title}`}
      className={`game-building ${isNear ? "is-near" : ""}`}
      data-variant={location.variant}
      style={style}
      onClick={onInteract}
    >
      <span className="game-building__body" />
      <span className="game-building__roof" />
      <span className="game-building__sign">{location.title}</span>
      <span className="game-building__door" />
      <span className="game-building__window left" />
      <span className="game-building__window right" />
    </button>
  );
}

export default function GameShell() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState<PlayerPosition>(START_POSITION);
  const [isMoving, setIsMoving] = useState(false);
  const [panel, setPanel] = useState<"projectdex" | "menu" | null>(null);
  const [clock, setClock] = useState(() => new Date());
  const pressedKeys = useRef(new Set<string>());
  const movementRef = useRef(false);

  const nearbyLocation = useMemo(() => {
    return LOCATIONS
      .map((location) => ({ location, distance: distanceToLocation(player, location) }))
      .filter(({ location, distance }) => distance <= location.interactionRadius)
      .sort((a, b) => a.distance - b.distance)[0]?.location ?? null;
  }, [player]);

  const movePlayer = useCallback((dx: number, dy: number) => {
    setPlayer((current) => {
      const next = {
        x: clamp(current.x + dx, 10.5, 96.5),
        y: clamp(current.y + dy, 8.5, 94),
      };
      return isBlocked(next) ? current : next;
    });
  }, []);

  const interact = useCallback((location: GameLocation | null) => {
    if (!location) return;

    switch (location.action) {
      case "projectdex":
        setPanel("projectdex");
        break;
      case "menu":
        setPanel("menu");
        break;
      case "route":
        if (location.target) void navigate({ to: location.target });
        break;
      case "mailto":
        if (location.target) window.location.href = location.target;
        break;
      case "external":
        if (location.target) window.open(location.target, "_blank", "noopener,noreferrer");
        break;
    }
  }, [navigate]);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
        event.preventDefault();
        pressedKeys.current.add(key);
      }

      if ((key === "e" || key === "enter") && !event.repeat) {
        event.preventDefault();
        interact(nearbyLocation);
      }

      if (key === "m" && !event.repeat) {
        event.preventDefault();
        setPanel((current) => current === "menu" ? null : "menu");
      }

      if (key === "escape") setPanel(null);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      pressedKeys.current.delete(event.key.toLowerCase());
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [interact, nearbyLocation]);

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(now - previous, 32);
      previous = now;
      const keys = pressedKeys.current;
      let dx = 0;
      let dy = 0;

      if (keys.has("arrowleft") || keys.has("a")) dx -= 1;
      if (keys.has("arrowright") || keys.has("d")) dx += 1;
      if (keys.has("arrowup") || keys.has("w")) dy -= 1;
      if (keys.has("arrowdown") || keys.has("s")) dy += 1;

      const moving = dx !== 0 || dy !== 0;
      if (moving) {
        const length = Math.hypot(dx, dy) || 1;
        movePlayer((dx / length) * MOVE_SPEED * delta, (dy / length) * MOVE_SPEED * delta);
      }

      if (movementRef.current !== moving) {
        movementRef.current = moving;
        setIsMoving(moving);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [movePlayer]);

  const dialogCopy = nearbyLocation
    ? `${nearbyLocation.description} Press E to enter.`
    : "Welcome to the TDanks Region. Use WASD or the arrow keys to explore the town.";

  return (
    <main className="game-shell" aria-label="TDanks Region game portfolio">
      <div className="game-frame">
        <div className="game-world" aria-label="TDanks Region overworld">
          <div className="game-water" />
          <div className="game-bridge" />
          <div className="game-path-v" />
          <div className="game-path-h" />
          <div className="game-plaza" />

          {TREES.map(([x, y, scale], index) => (
            <span
              key={`${x}-${y}-${index}`}
              className="game-tree"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                "--tree-scale": scale,
              } as React.CSSProperties}
            />
          ))}

          {ROCKS.map(([x, y], index) => (
            <span key={`${x}-${y}-${index}`} className="game-rock" style={{ left: `${x}%`, top: `${y}%` }} />
          ))}

          {LOCATIONS.map((location) => (
            <Building
              key={location.id}
              location={location}
              isNear={nearbyLocation?.id === location.id}
              onInteract={() => interact(location)}
            />
          ))}

          <div
            className={`game-player ${isMoving ? "is-moving" : ""}`}
            style={{ left: `${player.x}%`, top: `${player.y}%` }}
            aria-hidden="true"
          >
            <span className="game-player__body" />
            <span className="game-player__head" />
            <span className="game-player__cap" />
          </div>
        </div>

        <div className="game-hud">
          <span className="game-hud__mark">✦</span>
          <div>
            <div className="game-hud__title">TDanks Region</div>
            <div className="game-hud__sub">EXPLORE · DISCOVER · BUILD</div>
          </div>
        </div>

        <div className="game-clock">
          {clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>

        <section className="game-dialog" aria-live="polite">
          <div className="game-dialog__speaker">T-DEX</div>
          <div className="game-dialog__copy">{dialogCopy}</div>
          <span className="game-dialog__prompt">◆</span>
        </section>

        <aside className="game-controls" aria-label="Game controls">
          <div className="game-control-row"><span className="game-key">WASD</span><span>Move</span></div>
          <div className="game-control-row"><span className="game-key">E</span><span>Interact</span></div>
          <div className="game-control-row"><span className="game-key">M</span><span>Trainer menu</span></div>
        </aside>

        <div className="game-dpad" aria-label="Touch controls">
          <button type="button" className="up" onClick={() => movePlayer(0, -2.2)} aria-label="Move up">▲</button>
          <button type="button" className="left" onClick={() => movePlayer(-2.2, 0)} aria-label="Move left">◀</button>
          <button type="button" className="action" onClick={() => interact(nearbyLocation)} aria-label="Interact">A</button>
          <button type="button" className="right" onClick={() => movePlayer(2.2, 0)} aria-label="Move right">▶</button>
          <button type="button" className="down" onClick={() => movePlayer(0, 2.2)} aria-label="Move down">▼</button>
        </div>

        {panel === "projectdex" ? (
          <div className="game-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="projectdex-title">
            <section className="game-panel">
              <button type="button" className="game-panel__close" onClick={() => setPanel(null)} aria-label="Close ProjectDex">
                <X size={14} />
              </button>
              <PackageOpen size={28} color="#51e7df" />
              <h2 id="projectdex-title">ProjectDex Terminal</h2>
              <p>
                Connection established. The ProjectDex runtime is ready for its project entries — that is the next stacked PR.
              </p>
              <div className="game-menu-list">
                <button type="button" className="game-menu-button" onClick={() => window.open("https://github.com/TDanks2000", "_blank", "noopener,noreferrer")}>Preview repositories <Github size={16} /></button>
                <button type="button" className="game-menu-button" onClick={() => setPanel(null)}>Return to overworld <X size={16} /></button>
              </div>
            </section>
          </div>
        ) : null}

        {panel === "menu" ? (
          <div className="game-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="trainer-menu-title">
            <section className="game-panel">
              <button type="button" className="game-panel__close" onClick={() => setPanel(null)} aria-label="Close menu">
                <X size={14} />
              </button>
              <UserRound size={28} color="#f4c459" />
              <h2 id="trainer-menu-title">Tommy's Trainer Menu</h2>
              <p>Self-taught TypeScript developer from the United Kingdom. Choose a destination.</p>
              <div className="game-menu-list">
                <button type="button" className="game-menu-button" onClick={() => setPanel("projectdex")}>ProjectDex <PackageOpen size={16} /></button>
                <button type="button" className="game-menu-button" onClick={() => void navigate({ to: "/mental-health/quote" })}>Wellness Center <HeartPulse size={16} /></button>
                <button type="button" className="game-menu-button" onClick={() => window.open("https://github.com/TDanks2000", "_blank", "noopener,noreferrer")}>GitHub <Github size={16} /></button>
                <button type="button" className="game-menu-button" onClick={() => { window.location.href = "mailto:tommydanks2000@outlook.com"; }}>Contact <Mail size={16} /></button>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </main>
  );
}
