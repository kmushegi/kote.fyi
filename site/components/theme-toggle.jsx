"use client";

export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.dataset.theme || (systemDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme-preference", next);
    } catch {
      // The selected theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Switch color scheme"
      title="Switch color scheme"
    >
      <span aria-hidden="true" />
    </button>
  );
}
