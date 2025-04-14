import {
  FadeIn,
  MotionRainbowGradientHover,
  MotionRainbowText,
  StaggerContainer,
  StaggerItem,
} from "@/components/framer-animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  categoryKeywords,
  MentalHealthQuotes,
  resources,
} from "@/utils/mental-health";
import { createLazyFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import {
  FaHandsHelping,
  FaHeart,
  FaLeaf,
  FaSmile,
  FaSun,
} from "react-icons/fa";

export const Route = createLazyFileRoute("/mental-health/quote")({
  component: QuotePage,
});

// Define quote categories for better organization
const quoteCategories = [
  {
    name: "Positivity",
    icon: <FaSun className="text-yellow-400" />,
    color: "from-yellow-300 to-orange-400",
  },
  {
    name: "Self-Care",
    icon: <FaHeart className="text-pink-400" />,
    color: "from-pink-300 to-purple-400",
  },
  {
    name: "Growth",
    icon: <FaLeaf className="text-green-400" />,
    color: "from-green-300 to-teal-400",
  },
  {
    name: "Support",
    icon: <FaHandsHelping className="text-blue-400" />,
    color: "from-blue-300 to-indigo-400",
  },
  {
    name: "Joy",
    icon: <FaSmile className="text-amber-400" />,
    color: "from-amber-300 to-yellow-400",
  },
];

function QuotePage() {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showResources, setShowResources] = useState(false);
  const [isQuoteChanging, setIsQuoteChanging] = useState(false);

  // Filter quotes based on selected category (simple implementation)
  const getFilteredQuotes = useCallback(() => {
    if (!activeCategory) return MentalHealthQuotes;

    return MentalHealthQuotes.filter((quote) => {
      const keywords = categoryKeywords[activeCategory] || [];
      return keywords.some((keyword) =>
        quote.toLowerCase().includes(keyword.toLowerCase())
      );
    });
  }, [activeCategory]);

  const randomQuote = useCallback(() => {
    // Set changing state for animation
    setIsQuoteChanging(true);

    // Use setTimeout to allow exit animation to complete
    setTimeout(() => {
      const filteredQuotes = getFilteredQuotes();
      if (filteredQuotes.length === 0) {
        setSelectedQuote("No quotes found in this category. Try another!");
        setQuoteIndex(-1);
        setIsQuoteChanging(false);
        return;
      }

      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
      setQuoteIndex(MentalHealthQuotes.indexOf(randomQuote));
      setSelectedQuote(randomQuote);
      setIsQuoteChanging(false);
    }, 200); // Match this with exit animation duration
  }, [getFilteredQuotes]);

  const updateQuote = useCallback(
    (type: "next" | "previous") => {
      const filteredQuotes = getFilteredQuotes();
      if (filteredQuotes.length === 0 || !selectedQuote) return;

      const currentFilteredIndex = filteredQuotes.indexOf(selectedQuote);

      // Set changing state for animation
      setIsQuoteChanging(true);

      // Use setTimeout to allow exit animation to complete
      setTimeout(() => {
        switch (type) {
          case "next":
            if (currentFilteredIndex < filteredQuotes.length - 1) {
              const nextQuote = filteredQuotes[currentFilteredIndex + 1];
              setSelectedQuote(nextQuote);
              setQuoteIndex(MentalHealthQuotes.indexOf(nextQuote));
            }
            break;
          case "previous":
            if (currentFilteredIndex > 0) {
              const prevQuote = filteredQuotes[currentFilteredIndex - 1];
              setSelectedQuote(prevQuote);
              setQuoteIndex(MentalHealthQuotes.indexOf(prevQuote));
            }
            break;
          default:
            break;
        }
        setIsQuoteChanging(false);
      }, 200); // Match this with exit animation duration
    },
    [selectedQuote, getFilteredQuotes]
  );

  // Handle category selection
  const selectCategory = useCallback((category: string | null) => {
    setActiveCategory(category);
  }, []);

  useEffect(() => {
    randomQuote();
  }, [randomQuote, activeCategory]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full min-h-screen py-12 px-4 bg-linear-to-b from-background to-background/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[95%] sm:max-w-[80%] md:max-w-[70%] flex flex-col gap-8">
        {/* Cheerful Header */}
        <FadeIn>
          <div className="text-center">
            <h1 className="font-mono text-4xl font-bold tracking-wide mb-3">
              <MotionRainbowText className="from-yellow-400 via-pink-500 to-blue-500">
                Mental Health Moments
              </MotionRainbowText>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of uplifting quotes to brighten your day and support
              your mental wellbeing. Remember, it's okay to not be okay, and
              taking care of yourself is a strength, not a weakness.
            </p>
          </div>
        </FadeIn>

        {/* Category Selection */}
        <StaggerContainer>
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            <StaggerItem>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={!activeCategory ? "default" : "outline"}
                  onClick={() => selectCategory(null)}
                  className="rounded-full"
                >
                  All Quotes
                </Button>
              </motion.div>
            </StaggerItem>

            {quoteCategories.map((category) => (
              <StaggerItem key={category.name}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={
                      activeCategory === category.name ? "default" : "outline"
                    }
                    onClick={() => selectCategory(category.name)}
                    className={`rounded-full flex items-center gap-2 ${activeCategory === category.name ? "bg-linear-to-r " + category.color : ""}`}
                  >
                    {category.icon}
                    {category.name}
                  </Button>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Quote Display */}
        <MotionRainbowGradientHover>
          <Card className="w-full bg-card/80 backdrop-blur-xs border-border/40 shadow-xl">
            <CardContent className="p-8">
              <div className="min-h-[150px] flex items-center justify-center text-center">
                <p className="font-mono text-xl md:text-2xl font-medium leading-relaxed">
                  <AnimatePresence mode="wait">
                    {isQuoteChanging ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        Changing quote...
                      </motion.span>
                    ) : selectedQuote ? (
                      <motion.span
                        key={quoteIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                      >
                        "{selectedQuote}"
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        Loading a wonderful quote for you...
                      </motion.span>
                    )}
                  </AnimatePresence>
                </p>
              </div>
            </CardContent>
          </Card>
        </MotionRainbowGradientHover>

        {/* Navigation Controls */}
        <div className="flex flex-row justify-between items-center w-full gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={() => updateQuote("previous")}
              disabled={quoteIndex <= 0}
              className="rounded-full hover:bg-purple-500/20"
            >
              Previous
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full overflow-hidden"
          >
            <Button
              variant="default"
              onClick={randomQuote}
              className="rounded-full bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Random Quote
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={() => updateQuote("next")}
              disabled={
                quoteIndex === MentalHealthQuotes.length - 1 || quoteIndex < 0
              }
              className="rounded-full hover:bg-purple-500/20"
            >
              Next
            </Button>
          </motion.div>
        </div>

        {/* Resources Toggle */}
        <div className="mt-4 text-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="ghost"
              onClick={() => setShowResources(!showResources)}
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
            >
              {showResources
                ? "Hide Resources"
                : "Show Mental Health Resources"}
            </Button>
          </motion.div>
        </div>

        {/* Resources Section */}
        <AnimatePresence>
          {showResources && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              // className="overflow-hidden"
            >
              <StaggerContainer staggerDelay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {resources.map((resource) => (
                    <StaggerItem key={resource.name}>
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline block h-full"
                      >
                        <Card className="h-full hover:shadow-md hover:border-purple-500/50 hover:bg-card/90">
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg text-purple-400">
                              {resource.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {resource.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.a>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supportive Footer */}
        <FadeIn delay={0.3}>
          <div className="text-center text-sm text-muted-foreground mt-4">
            <p>
              Remember: Your mental health matters. Be kind to yourself today.
            </p>
          </div>
        </FadeIn>
      </div>
    </motion.div>
  );
}
