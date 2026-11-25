import Contact from "../components/contact";
import ThemeToggle from "../components/theme-toggle";

const projects = [
  {
    name: "SF Ledger",
    url: "https://sfledger.kote.chatgpt.site",
    description: "San Francisco’s books, from department budgets down to individual payments.",
  },
  {
    name: "Wardrobe",
    url: "https://wardrobe.kote.chatgpt.site",
    description: "Photograph the clothes you own and put together outfits from your closet.",
  },
  {
    name: "Apartment buzzer",
    url: "https://github.com/kmushegi/iot-apartment-entry",
    description: "Two little plungers press the buttons on my intercom so I can buzz myself in when I forget my keys.",
  },
  {
    name: "Phone for Agents",
    url: "https://github.com/kmushegi/phone-codex-plugin",
    description: "A phone line an agent can use to call a business and book an appointment.",
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
          I’m from Tbilisi, Georgia, and live in San Francisco. At{" "}
          <a href="https://openai.com/">OpenAI</a>, I build the infrastructure
          we use to train agents with reinforcement learning and run them.
        </p>
        <p>
          At Bowdoin, I wrote classical computer vision code so our RoboCup
          robot, an Aldebaran NAO, could spot a soccer ball. I got into deep
          learning at Toyota Research Institute and later cofounded Komodo to
          help developers train and deploy models.
        </p>
        <p>
          Outside of work, I like tinkering with electronics, playing tennis, and skiing.
        </p>
      </div>

      <section className="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <ul role="list">
          {projects.map(({ name, url, description }) => (
            <li key={url}>
              <a href={url}>{name}</a>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <nav className="links" aria-label="Profiles and contact">
        <a href="https://github.com/kmushegi">GitHub</a>
        <a href="https://www.linkedin.com/in/kmushegi/">LinkedIn</a>
        <a href="https://x.com/kmushegi">X</a>
        <Contact />
      </nav>
    </main>
  );
}
