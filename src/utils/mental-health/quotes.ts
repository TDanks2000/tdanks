export type MentalHealthCategory =
  | "Positivity"
  | "Self-Care"
  | "Growth"
  | "Support"
  | "Joy";

export interface MentalHealthMoment {
  text: string;
  categories: MentalHealthCategory[];
}

export const MentalHealthQuotes: MentalHealthMoment[] = [
  {
    text: "You do not have to solve your whole life today. One manageable next step is enough.",
    categories: ["Support", "Growth"],
  },
  {
    text: "A difficult day does not erase the progress you have already made.",
    categories: ["Growth", "Positivity"],
  },
  {
    text: "Rest can be useful, necessary, and productive in its own way.",
    categories: ["Self-Care"],
  },
  {
    text: "You are allowed to make space for yourself, even when other people need things from you.",
    categories: ["Self-Care", "Support"],
  },
  {
    text: "Some days are about moving forward. Some are about getting through. Both count.",
    categories: ["Growth", "Support"],
  },
  {
    text: "You can be proud of yourself for doing something that felt small but took a lot of effort.",
    categories: ["Positivity", "Growth"],
  },
  {
    text: "You do not need to earn a break by reaching exhaustion first.",
    categories: ["Self-Care"],
  },
  {
    text: "Asking for help can be part of looking after yourself, not a sign that you have failed.",
    categories: ["Support", "Self-Care"],
  },
  {
    text: "Your feelings can be real and important without needing to make every decision for you.",
    categories: ["Growth", "Self-Care"],
  },
  {
    text: "There can still be good moments in a hard week. You are allowed to notice both.",
    categories: ["Positivity", "Joy"],
  },
  {
    text: "You deserve the same patience you would offer someone you care about.",
    categories: ["Self-Care", "Support"],
  },
  {
    text: "Progress is not always obvious while you are in the middle of it.",
    categories: ["Growth", "Positivity"],
  },
  {
    text: "It is fine to change the plan when your energy, needs, or circumstances change.",
    categories: ["Self-Care", "Growth"],
  },
  {
    text: "You can reach out before things become unbearable. Support does not have to be a last resort.",
    categories: ["Support"],
  },
  {
    text: "A quiet moment, a favourite song, a warm drink, or a message from someone you trust can still matter.",
    categories: ["Joy", "Self-Care"],
  },
  {
    text: "You are allowed to enjoy something without turning it into an achievement.",
    categories: ["Joy", "Self-Care"],
  },
  {
    text: "Starting again does not mean starting from nothing. You bring what you learned with you.",
    categories: ["Growth", "Positivity"],
  },
  {
    text: "You do not need the perfect words to tell someone you are having a hard time.",
    categories: ["Support"],
  },
  {
    text: "Small routines can give a difficult day a little structure. Small still counts.",
    categories: ["Self-Care", "Growth"],
  },
  {
    text: "You can care about becoming better without treating the person you are today like a problem to fix.",
    categories: ["Growth", "Self-Care"],
  },
  {
    text: "A setback can be information, not a verdict on where you are going.",
    categories: ["Growth", "Positivity"],
  },
  {
    text: "You are allowed to protect time for the people, places, and things that make life feel lighter.",
    categories: ["Joy", "Self-Care"],
  },
  {
    text: "Connection can begin with something simple: a message, a call, or sitting beside someone you trust.",
    categories: ["Support", "Joy"],
  },
  {
    text: "There is no prize for carrying everything alone.",
    categories: ["Support"],
  },
  {
    text: "You can have mixed feelings about the same thing. People are more complicated than one emotion at a time.",
    categories: ["Self-Care", "Growth"],
  },
  {
    text: "Notice what made today a little easier. It may be worth making room for again tomorrow.",
    categories: ["Joy", "Positivity"],
  },
  {
    text: "A good moment does not invalidate a hard one, and a hard moment does not cancel every good thing.",
    categories: ["Positivity", "Joy"],
  },
  {
    text: "You can take things one conversation, one task, or one hour at a time when the bigger picture feels too much.",
    categories: ["Support", "Self-Care"],
  },
  {
    text: "Your pace can change. What matters today may be different from what mattered yesterday.",
    categories: ["Growth", "Self-Care"],
  },
  {
    text: "Make room for something that feels genuinely good, even if it is brief and ordinary.",
    categories: ["Joy"],
  },
];
