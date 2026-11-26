import "./globals.css";

const themeScript = `(() => {
  try {
    const theme = localStorage.getItem("theme-preference");
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
    }
  } catch {}
})();`;

export const metadata = {
  metadataBase: new URL("https://kote.fyi"),
  title: "Kote Mushegiani",
  description: "I’m Kote Mushegiani. I work on agent infrastructure at OpenAI and live in San Francisco.",
  openGraph: { type: "profile", url: "https://kote.fyi" },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
