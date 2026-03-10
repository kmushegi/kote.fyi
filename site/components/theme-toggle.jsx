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

function applyTheme(nextTheme, persist = false) {
  const root = document.documentElement;

  root.classList.add("theme-changing");
  root.dataset.theme = nextTheme;
  root.style.colorScheme = nextTheme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", nextTheme === "dark" ? "#111512" : "#f5efe4");

  if (persist) {
    window.localStorage.setItem(storageKey, nextTheme);
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove("theme-changing");
    });
  });
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const initialTheme =
      document.documentElement.dataset.theme || getStoredTheme() || getPreferredTheme();
    applyTheme(initialTheme);
    setTheme(initialTheme);

    const handleChange = (event) => {
      if (getStoredTheme()) {
        return;
      }

      const nextTheme = event.matches ? "dark" : "light";
      applyTheme(nextTheme);
      setTheme(nextTheme);
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
        applyTheme(nextTheme, true);
        setTheme(nextTheme);
      }}
    >
      <span className="theme-toggle-dot" aria-hidden="true"></span>
      <span>{nextThemeLabel}</span>
    </button>
  );
}
