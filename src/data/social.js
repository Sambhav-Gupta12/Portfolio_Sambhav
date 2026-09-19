import { Mail, FileText } from "lucide-react";
import { Github, Linkedin } from "../components/icons";

export const socialIcons = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  resume: FileText,
};

export const RESUME_HREF = "/resume.pdf";

export const socialLinks = [
  {
    id: "email",
    label: "Email",
    href: "mailto:sambhavgupt12@gmail.com",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Sambhav-Gupta12",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sambhav-gupta-494347369",
  },
  {
    id: "resume",
    label: "View Resume",
    href: RESUME_HREF,
  },
];
