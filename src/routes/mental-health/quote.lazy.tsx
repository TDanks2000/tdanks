import RainbowText from "@/components/rainbowText";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MentalHealthQuotes } from "@/utils/quotes";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

export const Route = createLazyFileRoute("/mental-health/quote")({
  component: QuotePage,
});

function QuotePage() {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const randomQuote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * MentalHealthQuotes.length);
    const randomQuote = MentalHealthQuotes[randomIndex];
    setQuoteIndex(randomIndex);
    setSelectedQuote(randomQuote);
  }, []);

  const updateQuote = useCallback(
    (type: "next" | "previous") => {
      switch (type) {
        case "next":
          if (selectedQuote) {
            const index = MentalHealthQuotes.indexOf(selectedQuote);
            if (index < MentalHealthQuotes.length - 1) {
              setSelectedQuote(MentalHealthQuotes[index + 1]);
              setQuoteIndex(index + 1);
            }
          }
          break;
        case "previous":
          if (selectedQuote) {
            const index = MentalHealthQuotes.indexOf(selectedQuote);
            if (index > 0) {
              setSelectedQuote(MentalHealthQuotes[index - 1]);
              setQuoteIndex(index - 1);
            }
          }
          break;
        default:
          break;
      }
    },
    [selectedQuote]
  );

  useEffect(() => {
    randomQuote();
  }, [randomQuote]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="max-w-[90%] sm:max-w-[60%] flex flex-col gap-5">
        {/* <h1 className="font-mono text-3xl font-bold text-left -tracking-wide">Mental Health Quote</h1>
        <Separator className="mb-2 bg-white/35" /> */}
        <h1 className="font-mono text-3xl font-bold tracking-wide text-center mb-2">
          <RainbowText>
            {selectedQuote ? selectedQuote : "Mental Health Quote"}
          </RainbowText>
        </h1>

        <Separator />

        <div className="flex flex-row justify-between items-center w-full ">
          <Button
            variant="outline"
            onClick={() => updateQuote("previous")}
            disabled={quoteIndex === 0}
          >
            PREVIOUS
          </Button>
          <Button variant="outline" onClick={randomQuote}>
            RANDOM
          </Button>
          <Button
            variant="outline"
            onClick={() => updateQuote("next")}
            disabled={quoteIndex === MentalHealthQuotes.length - 1}
          >
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
}
