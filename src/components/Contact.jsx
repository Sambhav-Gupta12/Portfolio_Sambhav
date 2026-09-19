import Container from "./Container";
import SocialLink from "./SocialLink";
import { socialLinks } from "../data/social";
import { RevealSection } from "./Reveal";
import WordReveal from "./WordReveal";

export default function Contact() {
  return (
    <RevealSection
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
          <WordReveal className="mt-3 text-base leading-relaxed text-muted">
            Want to talk about a project, internship, or collaboration? Reach
            out directly.
          </WordReveal>

          <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-1">
            {socialLinks.map(({ id, label, href }) => (
              <li key={id}>
                <SocialLink
                  id={id}
                  href={href}
                  label={label}
                  iconSize="md"
                  className="min-h-11 px-2 text-base font-medium text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </RevealSection>
  );
}
