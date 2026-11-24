import Contact from "../components/contact";
import ThemeToggle from "../components/theme-toggle";

export default function Page() {
  return (
    <main className="profile">
      <header className="profile-heading">
        <h1>Kote Mushegiani</h1>
        <ThemeToggle />
      </header>

      <div className="bio">
        <p>
          I’m from Tbilisi, Georgia, and live in San Francisco. I work on agent
          infrastructure at <a href="https://openai.com/">OpenAI</a>.
        </p>
        <p>
          Before that, I built Komodo. I got into robotics at Bowdoin, where I
          worked on soccer-playing robots for RoboCup.
        </p>
        <p>
          Outside of work, I like tinkering with electronics and cars, playing
          tennis and padel, and skiing when there’s snow.
        </p>
      </div>

      <nav className="links" aria-label="Profiles and contact">
        <a href="https://github.com/kmushegi">GitHub</a>
        <a href="https://www.linkedin.com/in/kmushegi/">LinkedIn</a>
        <a href="https://x.com/kmushegi">X</a>
        <Contact />
      </nav>
    </main>
  );
}
