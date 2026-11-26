import ThemeToggle from "../components/theme-toggle";

const projects = [
  {
    name: "SF Ledger",
    url: "https://sfledger.kote.chatgpt.site",
  },
  {
    name: "Wardrobe",
    url: "https://wardrobe.kote.chatgpt.site",
  },
  {
    name: "Apartment buzzer",
    url: "https://github.com/kmushegi/iot-apartment-entry",
  },
  {
    name: "Phone for Agents",
    url: "https://github.com/kmushegi/phone-codex-plugin",
  },
];

export default function Page() {
  return (
    <main className="profile">
      <header className="profile-heading">
        <h1>Kote Mushegiani</h1>
        <ThemeToggle />
      </header>

      <div className="bio">
        <p>
          I’m Kote (<i>ko·tay</i> in English, <i>ko·te</i> in Georgian).
          I grew up in Tbilisi, Georgia, went to Bowdoin College in Maine,
          and now live in San Francisco. At{" "}
          <a href="https://openai.com/">OpenAI</a>, I build the software we use
          to train agents with reinforcement learning and run them in production.
        </p>
        <p>
          At Bowdoin, I used classical computer vision to help our RoboCup robot
          spot a soccer ball. I got into deep learning at Toyota Research Institute,
          where I worked on robots that chose their own training images and a way
          for a robot to find its bearings by looking at a pattern of light on
          the ceiling. Later, I cofounded Komodo to help developers train and deploy models.
        </p>
        <p>
          Outside of work, I like tinkering with electronics, playing tennis, and skiing.
        </p>
      </div>

      <section className="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <ul role="list">
          {projects.map(({ name, url }) => (
            <li key={url}>
              <a href={url}>{name}</a>
            </li>
          ))}
        </ul>
      </section>

      <nav className="links" aria-label="Social profiles">
        <a href="https://github.com/kmushegi">GitHub</a>
        <a href="https://www.linkedin.com/in/kmushegi/">LinkedIn</a>
        <a href="https://x.com/kmushegi">X</a>
      </nav>
    </main>
  );
}
