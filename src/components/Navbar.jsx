import { useEffect, useId, useState } from "react";
import Container from "./Container";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

const linkClass =
  "text-sm text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    function onResize() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(false);
      }
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container
        as="nav"
        className="flex h-12 items-center justify-between gap-3"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="min-h-11 shrink-0 inline-flex items-center text-sm font-medium tracking-wide text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={closeMenu}
        >
          SAMBHAV GUPTA
        </a>

        {/* Desktop / tablet landscape links */}
        <ul className="hidden items-center gap-1 md:flex md:gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`${linkClass} inline-flex min-h-11 items-center px-2.5`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-border text-foreground hover:border-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-4 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </Container>

      <div
        id={menuId}
        className={`border-t border-border md:hidden ${open ? "block" : "hidden"}`}
      >
        <Container as="ul" className="flex flex-col py-2">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`${linkClass} flex min-h-11 items-center`}
                onClick={closeMenu}
              >
                {label}
              </a>
            </li>
          ))}
        </Container>
      </div>
    </header>
  );
}
