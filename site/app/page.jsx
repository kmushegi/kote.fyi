import EasterEgg from "../components/easter-egg";
import ThemeToggle from "../components/theme-toggle";

const year = new Date().getFullYear();

export default function Page() {
  return (
    <div className="page-shell">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Kote Mushegiani home">
          <span className="brand-copy">kote</span>
          <span className="brand-subcopy">for your information</span>
        </a>
        <div className="site-nav">
          <ThemeToggle />
        </div>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <h1>Kote Mushegiani</h1>
            <div className="hero-intro">
              <p>
                I am from Georgia 🇬🇪 and live in San Francisco. I am interested in
                infrastructure, AI systems, robotics, and useful software. I also like
                tinkering with electronics, cars, tennis, and padel.
              </p>
              <p>
                Right now I work on agent infrastructure at OpenAI. Before that I built
                Komodo. A lot of this started with RoboCup at Bowdoin.
              </p>
            </div>

            <div className="social-inline" id="links" aria-label="Social links">
              <a href="https://github.com/kmushegi" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/kmushegi/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a href="https://x.com/kmushegi" target="_blank" rel="noreferrer">
                X
              </a>
            </div>
          </div>

          <EasterEgg />
        </section>
      </main>

      <footer className="site-footer">
        <p>{year} Kote Mushegiani</p>
      </footer>
    </div>
  );
}
