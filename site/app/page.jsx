import EasterEgg from "../components/easter-egg";
import ThemeToggle from "../components/theme-toggle";
import ToyShelf from "../components/toy-shelf";

export default function Page() {
  return (
    <div className="page-shell" id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Kote Mushegiani home">kote<span>.fyi</span><span className="brand-star" aria-hidden="true">✳</span></a>
        <span className="header-note">a small corner of the internet</span>
        <ThemeToggle />
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hello-title">
          <div className="hero-copy">
            <p className="eyebrow"><span lang="ka">გამარჯობა!</span><span className="greeting-line" aria-hidden="true" />Hello there</p>
            <h1 id="hello-title">Hi, I’m <span className="name">Kote<span className="name-period">.</span><svg className="name-underline" viewBox="0 0 400 28" fill="none" aria-hidden="true"><path d="M6 17C92 1 253 2 391 10M33 24C159 13 288 14 363 20" /></svg></span></h1>
            <p className="full-name">Konstantine Mushegiani, if we’re being formal.</p>
            <div className="hero-intro">
              <p>I build infrastructure for AI agents at <a href="https://openai.com" target="_blank" rel="noreferrer">OpenAI<span aria-hidden="true">↗</span></a>. I like making complicated things work, and useful things exist.</p>
              <p>From <span className="place-name">Georgia<span className="georgia-flag" aria-label="Georgian flag">🇬🇪</span></span>, now in San Francisco. Previously, I built Komodo. Before that, RoboCup at Bowdoin got me hooked on making machines do things.</p>
            </div>
            <nav className="social-links" aria-label="Find me elsewhere">
              <a href="https://github.com/kmushegi" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
              <a href="https://www.linkedin.com/in/kmushegi/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href="https://x.com/kmushegi" target="_blank" rel="noreferrer">X <span aria-hidden="true">↗</span></a>
            </nav>
          </div>
          <div className="portrait-area">
            <span className="portrait-annotation" aria-hidden="true">me, more or less <svg viewBox="0 0 65 55" fill="none"><path d="M4 4c36-7 42 13 33 38m-10-12 10 15 14-11" /></svg></span>
            <span className="portrait-spark" aria-hidden="true">✳</span>
            <EasterEgg />
            <div className="travel-note" aria-label="San Francisco to Tbilisi"><span>SF</span><svg viewBox="0 0 160 40" fill="none" aria-hidden="true"><path d="M3 25c24-27 55 28 78-1S126 3 151 13" /><path className="travel-arrow" d="m141 4 12 10-14 4" /></svg><span lang="ka">თბილისი</span></div>
          </div>
        </section>
        <ToyShelf />
      </main>
      <footer className="site-footer"><p><span lang="ka">კოტე</span> / Kote Mushegiani</p><p>Thanks for stopping by. <span aria-hidden="true">✳</span></p></footer>
    </div>
  );
}
