import Container from "./Container";
import { socialLinks } from "../data/social";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="scroll-mt-12 border-t border-border"
      aria-label="Footer"
    >
      <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          <span className="font-medium text-foreground">Sambhav Gupta</span>
          <span aria-hidden="true"> · </span>
          <span>{year}</span>
        </p>

        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="text-sm text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
