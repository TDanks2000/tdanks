import { Button } from "@/components/ui/button";
import {
  type MentalHealthCategory,
  MentalHealthQuotes,
  resources,
} from "@/utils/mental-health";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Phone,
  RefreshCw,
  Smile,
  Sun,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createLazyFileRoute("/mental-health/quote")({
  component: QuotePage,
});

const quoteCategories: Array<{
  name: MentalHealthCategory;
  icon: typeof Sun;
}> = [
  { name: "Positivity", icon: Sun },
  { name: "Self-Care", icon: Heart },
  { name: "Growth", icon: Leaf },
  { name: "Support", icon: Users },
  { name: "Joy", icon: Smile },
];

function QuotePage() {
  const [activeCategory, setActiveCategory] =
    useState<MentalHealthCategory | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<
    (typeof MentalHealthQuotes)[number] | null
  >(null);

  const filteredQuotes = useMemo(() => {
    if (!activeCategory) return MentalHealthQuotes;

    return MentalHealthQuotes.filter((quote) =>
      quote.categories.includes(activeCategory),
    );
  }, [activeCategory]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    setSelectedQuote(filteredQuotes[randomIndex] ?? null);
  }, [filteredQuotes]);

  const filteredIndex = selectedQuote
    ? filteredQuotes.indexOf(selectedQuote)
    : -1;

  const randomQuote = () => {
    if (filteredQuotes.length === 0) return;

    if (filteredQuotes.length === 1) {
      setSelectedQuote(filteredQuotes[0]);
      return;
    }

    const currentIndex = selectedQuote
      ? filteredQuotes.indexOf(selectedQuote)
      : -1;
    let nextIndex = Math.floor(Math.random() * (filteredQuotes.length - 1));

    if (currentIndex >= 0 && nextIndex >= currentIndex) {
      nextIndex += 1;
    }

    setSelectedQuote(filteredQuotes[nextIndex]);
  };

  const moveQuote = (direction: "previous" | "next") => {
    if (filteredIndex < 0) return;

    const nextIndex =
      direction === "previous" ? filteredIndex - 1 : filteredIndex + 1;

    if (nextIndex < 0 || nextIndex >= filteredQuotes.length) return;
    setSelectedQuote(filteredQuotes[nextIndex]);
  };

  return (
    <main className="relative min-h-screen px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to tdanks.com
        </Link>

        <header className="mb-10 max-w-3xl sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            A quieter corner of the site
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Mental health moments
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Short, grounded reminders for difficult or noisy days, plus trusted
            UK support if you need more than a few words on a screen.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
          <section className="rounded-[2rem] border border-border/60 bg-card/70 p-5 shadow-2xl shadow-primary/5 backdrop-blur-xl sm:p-8">
            <div className="mb-7">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Pick a kind of reminder
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Or leave it on All for a mix of everything.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  aria-pressed={activeCategory === null}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === null
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border/70 bg-background/50 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  All
                </button>

                {quoteCategories.map(({ name, icon: Icon }) => {
                  const isActive = activeCategory === name;

                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setActiveCategory(name)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border/70 bg-background/50 text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <Icon className="size-4" />
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/55 px-5 py-6 sm:px-8 sm:py-7">
              <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    A small reminder
                  </span>
                  {filteredIndex >= 0 ? (
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {filteredIndex + 1} / {filteredQuotes.length}
                    </span>
                  ) : null}
                </div>

                <div
                  className="flex min-h-36 items-center"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <AnimatePresence mode="wait">
                    {selectedQuote ? (
                      <motion.div
                        key={selectedQuote.text}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="max-w-3xl text-2xl font-semibold leading-relaxed tracking-tight sm:text-3xl">
                          {selectedQuote.text}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {selectedQuote.categories.map((category) => (
                            <span
                              key={category}
                              className="rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs text-muted-foreground"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-lg text-muted-foreground"
                      >
                        Finding a reminder...
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => moveQuote("previous")}
                  disabled={filteredIndex <= 0}
                  aria-label="Previous reminder"
                  className="rounded-full"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => moveQuote("next")}
                  disabled={
                    filteredIndex < 0 || filteredIndex >= filteredQuotes.length - 1
                  }
                  aria-label="Next reminder"
                  className="rounded-full"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>

              <Button onClick={randomQuote} className="rounded-full sm:px-5">
                <RefreshCw className="size-4" />
                Another reminder
              </Button>
            </div>

            <p className="mt-7 border-t border-border/60 pt-5 text-sm leading-relaxed text-muted-foreground">
              These reminders are here for comfort, not diagnosis or treatment.
              If something is affecting your day-to-day life or feels difficult
              to manage, talking to a qualified professional can help.
            </p>
          </section>

          <aside className="flex flex-col gap-5">
            <section className="rounded-[2rem] border border-rose-500/20 bg-rose-500/5 p-6 backdrop-blur-sm sm:p-7">
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl border border-rose-500/20 bg-background/60 text-rose-400">
                <Phone className="size-5" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-400">
                Need urgent support?
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Get help now
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  If you or someone else is in immediate danger in the UK, call
                  999 or go to A&amp;E.
                </p>
                <p>
                  In England, NHS 111 can help with urgent mental-health needs.
                </p>
                <p>
                  Samaritans is available across the UK and ROI, free, day or
                  night on 116 123.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <a
                  href="tel:116123"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                  <Phone className="size-4" />
                  Call Samaritans: 116 123
                </a>
                <a
                  href="https://www.nhs.uk/every-mind-matters/urgent-support/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-background/50 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background/80"
                >
                  NHS urgent support
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </section>

            <section className="rounded-[2rem] border border-border/60 bg-card/60 p-6 backdrop-blur-sm sm:p-7">
              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  UK resources
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  Places to find support
                </h2>
              </div>

              <div className="space-y-2">
                {resources.map((resource) => (
                  <a
                    key={resource.name}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl border border-transparent p-3 transition-colors hover:border-border/70 hover:bg-background/45"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {resource.name}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {resource.description}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                  </a>
                ))}
              </div>

              <p className="mt-5 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground">
                Outside the UK, use your local emergency service or a trusted
                local health service for urgent and ongoing support.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
