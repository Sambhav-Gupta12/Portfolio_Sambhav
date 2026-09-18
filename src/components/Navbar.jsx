import Container from "./Container";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container
        as="nav"
        className="flex h-12 items-center justify-between gap-4"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="shrink-0 text-sm font-medium tracking-wide text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          SAMBHAV GUPTA
        </a>

        <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 sm:gap-x-5">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
}
