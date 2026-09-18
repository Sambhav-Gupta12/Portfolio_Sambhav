import Container from "./Container";
import { socialLinks } from "../data/social";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-12 border-b border-border"
    >
      <Container className="py-14 md:py-20">
        <div className="max-w-xl">
          <h2
            id="contact-heading"
            className="text-2xl font-medium tracking-tight text-foreground md:text-3xl"
          >
            Contact
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Want to talk about a project, internship, or collaboration? Reach
            out directly.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {socialLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-base font-medium text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
