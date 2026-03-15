"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { themes, themesByCategory, type ThemeDefinition } from "@/lib/themes";
import { cn } from "@/lib/utils";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={cn("p-2 rounded-md bg-muted", className)}>
        <span className="sr-only">Toggle theme</span>
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </button>
    );
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];

  const ThemeButton = ({ t }: { t: ThemeDefinition }) => (
    <button
      onClick={() => {
        setTheme(t.value);
        setIsOpen(false);
      }}
      className={cn(
        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        theme === t.value && "bg-primary text-primary-foreground"
      )}
    >
      <span className="font-medium">{t.name}</span>
      <span className="block text-xs opacity-70">{t.description}</span>
    </button>
  );

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
          "bg-muted hover:bg-accent transition-colors",
          "border border-border"
        )}
        aria-label="Toggle theme menu"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        <span className="hidden sm:inline">{currentTheme.name}</span>
        <svg
          className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 max-h-96 overflow-auto rounded-lg border border-border bg-popover p-2 shadow-lg z-50">
            <div className="space-y-4">
              <div>
                <h4 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Default
                </h4>
                <div className="space-y-1">
                  {themesByCategory.default.map((t) => (
                    <ThemeButton key={t.value} t={t} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  🖥️ Developer
                </h4>
                <div className="space-y-1">
                  {themesByCategory.dev.map((t) => (
                    <ThemeButton key={t.value} t={t} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  💼 Professional
                </h4>
                <div className="space-y-1">
                  {themesByCategory.professional.map((t) => (
                    <ThemeButton key={t.value} t={t} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
