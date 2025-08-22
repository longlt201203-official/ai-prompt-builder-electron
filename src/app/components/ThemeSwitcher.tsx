import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const THEMES = ["default", "ocean", "emerald", "violet"] as const;
type ThemeName = (typeof THEMES)[number];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>("default");
  const [dark, setDark] = useState(false);

  // Load stored preferences
  useEffect(() => {
    const storedTheme = localStorage.getItem("app-theme") as ThemeName | null;
    const storedDark = localStorage.getItem("app-dark") === "true";
    if (storedTheme && THEMES.includes(storedTheme)) setTheme(storedTheme);
    setDark(storedDark);
  }, []);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    // Dark class
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    if (theme === "default") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
    localStorage.setItem("app-theme", theme);
    localStorage.setItem("app-dark", String(dark));
  }, [theme, dark]);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex gap-1">
        {THEMES.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={t === theme ? "default" : "outline"}
            onClick={() => setTheme(t)}
            aria-pressed={t === theme}
          >
            {t}
          </Button>
        ))}
      </div>
      <Button
        size="sm"
        variant={dark ? "secondary" : "outline"}
        onClick={() => setDark((d) => !d)}
      >
        {dark ? "Light" : "Dark"}
      </Button>
    </div>
  );
}
