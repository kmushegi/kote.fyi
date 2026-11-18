"use client";

import { useEffect, useState } from "react";

const storageKey = "theme-preference";

function storedTheme() {
  try {
    const theme = localStorage.getItem(storageKey);
    return theme === "light" || theme === "dark" ? theme : null;
  } catch { return null; }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#202722" : "#f7f4ea");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = (value) => { applyTheme(value); setTheme(value); };
    update(document.documentElement.dataset.theme || storedTheme() || (media.matches ? "dark" : "light"));
    const onChange = (event) => { if (!storedTheme()) update(event.matches ? "dark" : "light"); };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return <button className="theme-toggle" type="button" aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={theme === "dark"} onClick={() => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next); setTheme(next);
    try { localStorage.setItem(storageKey, next); } catch { /* The switch still works when storage is unavailable. */ }
  }}><svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><circle cx="14" cy="14" r="5" /><path d="M14 2v3m0 18v3M2 14h3m18 0h3M5.5 5.5l2.2 2.2m12.6 12.6 2.2 2.2M5.5 22.5l2.2-2.2M20.3 7.7l2.2-2.2" /></svg><span className="theme-label-light">Lights off</span><span className="theme-label-dark">Lights on</span></button>;
}
