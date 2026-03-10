import { Fraunces, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "700"],
  variable: "--font-fraunces",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});

const themeScript = `(() => {
  const storageKey = "theme-preference";
  const storedTheme = localStorage.getItem(storageKey);
  const theme = storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const themeColor = theme === "dark" ? "#111512" : "#f5efe4";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColor);
})();`;

export const metadata = {
  metadataBase: new URL("https://kote.fyi"),
  title: "Kote Mushegiani",
  description:
    "Kote Mushegiani is interested in infrastructure, AI systems, robotics, and useful software.",
  openGraph: {
    title: "Kote Mushegiani",
    description: "Personal site for Kote Mushegiani.",
    type: "website",
    images: ["/static/generated/kote-line-2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kote Mushegiani",
    description: "Personal site for Kote Mushegiani.",
    images: ["/static/generated/kote-line-2.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${ibmPlexMono.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <meta name="theme-color" content="#f5efe4" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
