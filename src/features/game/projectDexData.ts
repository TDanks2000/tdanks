export type ProjectDexEntry = {
  number: number;
  title: string;
  displayName: string;
  description: string;
  image: string;
  imageFit?: "cover" | "contain";
  kind: string;
  language: string;
  runtime: string;
  status: string;
  tags: string[];
  href: string;
  github?: string;
};

const githubPreview = (repo: string) =>
  `https://opengraph.githubassets.com/tdanks-projectdex/${repo}`;

export const PROJECTDEX_ENTRIES: ProjectDexEntry[] = [
  {
    number: 1,
    title: "recap.games",
    displayName: "Recap.Games",
    description:
      "A game announcement and event recap platform built to make showcase reveals, trailers, and release information easier to discover.",
    image: "https://recap.games/favicon.ico",
    imageFit: "contain",
    kind: "Web product",
    language: "TypeScript",
    runtime: "Next.js",
    status: "Active",
    tags: ["Games", "Web", "TypeScript", "Next.js"],
    href: "https://recap.games/",
  },
  {
    number: 2,
    title: "@api-wrappers/igdb-wrapper",
    displayName: "IGDB Wrapper",
    description:
      "A type-safe IGDB v4 client with fluent APICalypse queries, Twitch OAuth, retries, pagination, image helpers, and rate limiting.",
    image: githubPreview("Api-Wrappers/igdb-wrapper"),
    kind: "API client",
    language: "TypeScript",
    runtime: "Node / Bun",
    status: "Published",
    tags: ["IGDB", "API", "TypeScript", "Bun"],
    href: "https://www.npmjs.com/package/@api-wrappers/igdb-wrapper",
    github: "https://github.com/Api-Wrappers/igdb-wrapper",
  },
  {
    number: 3,
    title: "@api-wrappers/tmdb-wrapper",
    displayName: "TMDB Wrapper",
    description:
      "A typed TMDB API v3 client covering movies, TV, search, discover, images, watch providers, sessions, and more.",
    image: githubPreview("Api-Wrappers/tmdb-wrapper"),
    kind: "API client",
    language: "TypeScript",
    runtime: "Node / Bun",
    status: "Published",
    tags: ["TMDB", "Movies", "API", "TypeScript"],
    href: "https://www.npmjs.com/package/@api-wrappers/tmdb-wrapper",
    github: "https://github.com/Api-Wrappers/tmdb-wrapper",
  },
  {
    number: 4,
    title: "@api-wrappers/anilist-wrapper",
    displayName: "AniList Wrapper",
    description:
      "A typed TypeScript SDK for AniList GraphQL with helpers for anime, manga, characters, staff, users, media lists, and raw queries.",
    image: githubPreview("Api-Wrappers/anilist-wrapper"),
    kind: "GraphQL SDK",
    language: "TypeScript",
    runtime: "Node / Bun",
    status: "Published",
    tags: ["AniList", "Anime", "GraphQL", "TypeScript"],
    href: "https://www.npmjs.com/package/@api-wrappers/anilist-wrapper",
    github: "https://github.com/Api-Wrappers/anilist-wrapper",
  },
  {
    number: 5,
    title: "@api-wrappers/api-core",
    displayName: "API Core",
    description:
      "The shared HTTP runtime behind API-Wrappers, providing retries, timeouts, authentication, caching, rate limiting, and custom transports.",
    image: githubPreview("Api-Wrappers/api-core"),
    kind: "Runtime library",
    language: "TypeScript",
    runtime: "Node / Bun",
    status: "Published",
    tags: ["HTTP", "Runtime", "API", "TypeScript"],
    href: "https://www.npmjs.com/package/@api-wrappers/api-core",
    github: "https://github.com/Api-Wrappers/api-core",
  },
  {
    number: 6,
    title: "react-incremental-library",
    displayName: "React Incremental Library",
    description:
      "A React library for building incremental, idle, and clicker games with reusable hooks and state stores.",
    image: githubPreview("TDanks2000/react-incremental-lib"),
    kind: "React library",
    language: "TypeScript",
    runtime: "React",
    status: "Published",
    tags: ["React", "Games", "Hooks", "TypeScript"],
    href: "https://www.npmjs.com/package/react-incremental-library",
    github: "https://github.com/TDanks2000/react-incremental-lib",
  },
];
