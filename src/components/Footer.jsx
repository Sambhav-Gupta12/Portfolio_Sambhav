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
      <Container className="flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between md:gap-4">
        <p className="text-sm text-muted">
          <span className="font-medium text-foreground">Sambhav Gupta</span>
          <span aria-hidden="true"> · </span>
          <span>{year}</span>
        </p>

        <ul className="flex flex-wrap gap-x-1 gap-y-1">
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="inline-flex min-h-11 items-center px-2 text-sm text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
