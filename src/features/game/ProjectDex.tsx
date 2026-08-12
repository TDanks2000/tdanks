import { ExternalLink, Github, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PROJECTDEX_ENTRIES, type ProjectDexEntry } from "./projectDexData";
import "./projectdex.css";

function ProjectImage({ entry, className }: { entry: ProjectDexEntry; className: string }) {
  const [src, setSrc] = useState(entry.image);

  useEffect(() => setSrc(entry.image), [entry.image]);

  return (
    <img
      src={src}
      alt={`${entry.displayName} project artwork`}
      className={className}
      data-fit={entry.imageFit ?? "cover"}
      onError={() => setSrc("/images/favicon.svg")}
      draggable={false}
    />
  );
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function ProjectDex({ onClose }: { onClose: () => void }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const selected = PROJECTDEX_ENTRIES[selectedIndex];

  useEffect(() => {
    screenRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      switch (key) {
        case "arrowdown":
        case "s":
          event.preventDefault();
          setSelectedIndex((current) =>
            current + 1 >= PROJECTDEX_ENTRIES.length ? 0 : current + 1,
          );
          break;
        case "arrowup":
        case "w":
          event.preventDefault();
          setSelectedIndex((current) =>
            current - 1 < 0 ? PROJECTDEX_ENTRIES.length - 1 : current - 1,
          );
          break;
        case "home":
          event.preventDefault();
          setSelectedIndex(0);
          break;
        case "end":
          event.preventDefault();
          setSelectedIndex(PROJECTDEX_ENTRIES.length - 1);
          break;
        case "enter":
        case "e":
          event.preventDefault();
          openExternal(selected.href);
          break;
        case "g":
          if (selected.github) {
            event.preventDefault();
            openExternal(selected.github);
          }
          break;
        case "escape":
        case "b":
          event.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, selected]);

  return (
    <div
      ref={screenRef}
      className="projectdex-screen"
      role="dialog"
      aria-modal="true"
      aria-label="ProjectDex"
      tabIndex={-1}
    >
      <header className="projectdex-topbar">
        <div className="projectdex-title">
          <span className="projectdex-title__mark">✦</span>
          <span>ProjectDex</span>
        </div>
        <div className="projectdex-count">
          SEEN {PROJECTDEX_ENTRIES.length.toString().padStart(2, "0")} · BUILT{" "}
          {PROJECTDEX_ENTRIES.length.toString().padStart(2, "0")}
        </div>
        <button
          type="button"
          className="projectdex-close"
          onClick={onClose}
          aria-label="Close ProjectDex"
        >
          <X size={14} />
        </button>
      </header>

      <div className="projectdex-body">
        <section className="projectdex-detail" aria-live="polite">
          <div className="projectdex-entry-heading">
            <span className="projectdex-number">
              #{selected.number.toString().padStart(3, "0")}
            </span>
            <h2>{selected.title}</h2>
          </div>

          <div className="projectdex-card-content">
            <div className="projectdex-art-frame">
              <ProjectImage entry={selected} className="projectdex-art" />
            </div>

            <div className="projectdex-copy">
              <p>{selected.description}</p>

              <div className="projectdex-tags" aria-label="Project tags">
                {selected.tags.map((tag) => (
                  <span key={tag} className="projectdex-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="projectdex-data-grid" aria-label="Project data">
                <div className="projectdex-data-cell">
                  <span className="projectdex-data-label">KIND</span>
                  <span className="projectdex-data-value">{selected.kind}</span>
                </div>
                <div className="projectdex-data-cell">
                  <span className="projectdex-data-label">LANGUAGE</span>
                  <span className="projectdex-data-value">{selected.language}</span>
                </div>
                <div className="projectdex-data-cell">
                  <span className="projectdex-data-label">RUNTIME</span>
                  <span className="projectdex-data-value">{selected.runtime}</span>
                </div>
                <div className="projectdex-data-cell">
                  <span className="projectdex-data-label">STATUS</span>
                  <span className="projectdex-data-value">{selected.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="projectdex-actions">
            <a
              className="projectdex-action primary"
              href={selected.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={15} />
              Open project
            </a>
            {selected.github ? (
              <a
                className="projectdex-action"
                href={selected.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={15} />
                GitHub repo
              </a>
            ) : (
              <span className="projectdex-action" aria-disabled="true">
                Private source
              </span>
            )}
          </div>
        </section>

        <nav className="projectdex-list" aria-label="ProjectDex entries">
          {PROJECTDEX_ENTRIES.map((entry, index) => {
            const isSelected = index === selectedIndex;

            return (
              <button
                key={entry.number}
                type="button"
                className={`projectdex-list-item ${isSelected ? "is-selected" : ""}`}
                aria-current={isSelected ? "true" : undefined}
                onClick={() => setSelectedIndex(index)}
                onDoubleClick={() => openExternal(entry.href)}
              >
                <ProjectImage entry={entry} className="projectdex-list-image" />
                <span className="projectdex-list-meta">
                  <span className="projectdex-list-number">
                    #{entry.number.toString().padStart(3, "0")}
                  </span>
                  <span className="projectdex-list-name">{entry.title}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <footer className="projectdex-footer" aria-label="ProjectDex controls">
        <span>
          <kbd>↑↓</kbd> Select
        </span>
        <span>
          <kbd>Enter</kbd> Open
        </span>
        <span>
          <kbd>G</kbd> GitHub
        </span>
        <span>
          <kbd>B</kbd> Back
        </span>
      </footer>
    </div>
  );
}
