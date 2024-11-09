import { createContext, useContext, useEffect, useState } from "react";

// Default values for the theme and storage key
const initialState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext(initialState);

export function ThemeProviders({
  children,
  defaultTheme = "system",
  storageKey = "darkMode",  // Keeping the localStorage key as darkMode
}) {
  const [theme, setTheme] = useState(() => {
    // Retrieve stored theme or fallback to default
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme classes
    root.classList.remove("light", "dark");

    // If system theme is selected, set according to user's system preference
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    // If specific theme is selected, apply it
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      // Store the selected theme in localStorage under "darkMode"
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
