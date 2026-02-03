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
    name: "Matrix",
    value: "matrix",
    category: "dev",
    description: "Green on black hacker vibes",
  },
  {
    name: "Dracula",
    value: "dracula",
    category: "dev",
    description: "Popular dark theme with purple accents",
  },
  {
    name: "Nord",
    value: "nord",
    category: "dev",
    description: "Arctic, north-bluish color palette",
  },
  {
    name: "Tokyo Night",
    value: "tokyo-night",
    category: "dev",
    description: "Vibrant Tokyo cityscape colors",
  },
  {
    name: "Synthwave",
    value: "synthwave",
    category: "dev",
    description: "Retro 80s neon aesthetics",
  },
  {
    name: "Monokai",
    value: "monokai",
    category: "dev",
    description: "Classic code editor theme",
  },
  {
    name: "Cyberpunk",
    value: "cyberpunk",
    category: "dev",
    description: "Futuristic neon glow",
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
