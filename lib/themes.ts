export type ThemeDefinition = {
  name: string;
  value: string;
  category: "default" | "dev" | "professional";
  description: string;
};

export const themes: ThemeDefinition[] = [
  // Default themes
  {
    name: "Light",
    value: "light",
    category: "default",
    description: "Clean light theme",
  },
  {
    name: "Dark",
    value: "dark",
    category: "default",
    description: "Classic dark theme",
  },
  {
    name: "System",
    value: "system",
    category: "default",
    description: "Match system preference",
  },

  // Developer themes
  {
    name: "Catppuccin",
    value: "catppuccin",
    category: "dev",
    description: "Warm pastel dark theme",
  },
  {
    name: "Gruvbox",
    value: "gruvbox",
    category: "dev",
    description: "Retro warm-toned dark",
  },
  {
    name: "Rosé Pine",
    value: "rose-pine",
    category: "dev",
    description: "Elegant muted dark theme",
  },
  {
    name: "Solarized",
    value: "solarized",
    category: "dev",
    description: "Classic scientific palette",
  },
  {
    name: "GitHub Dark",
    value: "github-dark",
    category: "dev",
    description: "Clean developer dark",
  },
  {
    name: "One Dark",
    value: "one-dark",
    category: "dev",
    description: "Atom's iconic dark theme",
  },
  {
    name: "Everforest",
    value: "everforest",
    category: "dev",
    description: "Warm green comfort",
  },

  // Professional themes
  {
    name: "Corporate Blue",
    value: "corporate-blue",
    category: "professional",
    description: "Clean corporate aesthetic",
  },
  {
    name: "Executive",
    value: "executive",
    category: "professional",
    description: "Elegant dark business theme",
  },
  {
    name: "Slate",
    value: "slate",
    category: "professional",
    description: "Modern neutral tones",
  },
  {
    name: "Ocean",
    value: "ocean",
    category: "professional",
    description: "Calming blue-green palette",
  },
  {
    name: "Minimal",
    value: "minimal",
    category: "professional",
    description: "High contrast, distraction-free",
  },
];

export const themesByCategory = {
  default: themes.filter((t) => t.category === "default"),
  dev: themes.filter((t) => t.category === "dev"),
  professional: themes.filter((t) => t.category === "professional"),
};
