import { useEffect, useId, useMemo, useState } from "react";
import Container from "./Container";
import { useActiveSection } from "../hooks/useActiveSection";

const NAV_LINKS = [
  { href: "#work", id: "work", label: "Work" },
  { href: "#about", id: "about", label: "About" },
  { href: "#journey", id: "journey", label: "Journey" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const sectionIds = useMemo(() => NAV_LINKS.map((link) => link.id), []);
  const activeId = useActiveSection(sectionIds);

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
      <nav aria-label="Primary">
        <Container className="flex h-12 items-center justify-between gap-3">
          <a
            href="#hero"
            className="transition-hover inline-flex min-h-11 shrink-0 items-center text-sm font-medium tracking-wide text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            data-cursor="hover"
            onClick={closeMenu}
          >
            SAMBHAV GUPTA
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ href, id, label }) => {
              const isActive = activeId === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className="nav-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    data-cursor="hover"
                    aria-current={isActive ? "true" : undefined}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="transition-hover inline-flex h-11 w-11 items-center justify-center rounded border border-border text-foreground hover:border-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
            data-cursor="hover"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-4 bg-current transition-hover ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-4 bg-current transition-hover ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-4 bg-current transition-hover ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </Container>

        <div
          id={menuId}
          className={`border-t border-border md:hidden ${open ? "block" : "hidden"}`}
        >
          <Container as="ul" className="flex flex-col py-2">
            {NAV_LINKS.map(({ href, id, label }) => {
              const isActive = activeId === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className="nav-link-mobile focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    data-cursor="hover"
                    aria-current={isActive ? "true" : undefined}
                    onClick={closeMenu}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </Container>
        </div>
      </nav>
    </header>
  );
}
