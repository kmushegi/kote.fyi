"use client";

import { useEffect, useState } from "react";

const storageKey = "theme-preference";

function getStoredTheme() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedTheme = window.localStorage.getItem(storageKey);
  return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
}

function getPreferredTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (nextTheme, persist = false) => {
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", nextTheme === "dark" ? "#111512" : "#f5efe4");

      if (persist) {
        window.localStorage.setItem(storageKey, nextTheme);
      }

      setTheme(nextTheme);
    };

    applyTheme(
      document.documentElement.dataset.theme || getStoredTheme() || getPreferredTheme(),
    );

    const handleChange = (event) => {
      if (getStoredTheme()) {
        return;
      }

      applyTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const nextThemeLabel = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={theme === "dark"}
      onClick={() => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = nextTheme;
        document.documentElement.style.colorScheme = nextTheme;
        document
          .querySelector('meta[name="theme-color"]')
          ?.setAttribute("content", nextTheme === "dark" ? "#111512" : "#f5efe4");
        window.localStorage.setItem(storageKey, nextTheme);
        setTheme(nextTheme);
      }}
    >
      <span className="theme-toggle-dot" aria-hidden="true"></span>
      <span>{nextThemeLabel}</span>
    </button>
  );
}
