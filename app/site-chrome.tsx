import { sitePath } from "./site-path";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href={sitePath("/")}>
        Zihao (Jason) Zhang
      </a>
      <nav aria-label="Primary">
        <a href={sitePath("/#work")}>Work</a>
        <a href={sitePath("/#approach")}>Approach</a>
        <a href={sitePath("/#about")}>About</a>
        <a href={sitePath("/#contact")}>Contact</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-summary">
        <span>Zihao (Jason) Zhang · Research Engineer</span>
        <p>
          Graduating in August 2026. I&apos;m looking for machine-learning and
          data-engineering roles, and I&apos;m happy to talk about anything
          adjacent.
        </p>
      </div>
      <nav aria-label="Contact">
        <a
          href="https://github.com/TacoRav4"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/jasonzzh"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a href="mailto:jasonzhang5@ucmerced.edu">Email</a>
        <a
          href={sitePath("/resume.pdf")}
          download="Zihao_Jason_Zhang_Resume.pdf"
        >
          Resume
        </a>
      </nav>
    </footer>
  );
}

export function SkipLink() {
  return (
    <a className="skip-link" href="#main">
      Skip to content
    </a>
  );
}
