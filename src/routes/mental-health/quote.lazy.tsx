import RainbowText from '@/components/rainbowText';
import { MentalHealthQuotes } from '@/utils/quotes';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createLazyFileRoute('/mental-health/quote')({
  component: QuotePage,
});

function QuotePage() {
  const randomQuote = useMemo(() => {
    return MentalHealthQuotes[Math.floor(Math.random() * MentalHealthQuotes.length)];
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="max-w-[90%] sm:max-w-[60%] flex flex-col gap-2">
        {/* <h1 className="font-mono text-3xl font-bold text-left -tracking-wide">Mental Health Quote</h1>
        <Separator className="mb-2 bg-white/35" /> */}
        <h1 className="font-mono text-3xl font-bold tracking-wide text-center">
          <RainbowText>{randomQuote}</RainbowText>
        </h1>
      </div>
    </div>
  );
}
