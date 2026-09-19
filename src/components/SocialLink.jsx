import { socialIcons } from "../data/social";

const sizeMap = {
  sm: 14,
  md: 16,
  lg: 18,
};

/**
 * Icon + label link for Email / GitHub / LinkedIn / Resume.
 * @param {"email"|"github"|"linkedin"|"resume"} id
 */
export default function SocialLink({
  id,
  href,
  label,
  className = "",
  iconSize = "md",
}) {
  const Icon = socialIcons[id];
  const external = !href.startsWith("mailto:");
  const px = sizeMap[iconSize] ?? sizeMap.md;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`transition-hover inline-flex items-center gap-2 ${className}`.trim()}
      data-cursor="hover"
    >
      {Icon ? (
        <Icon
          size={px}
          strokeWidth={1.75}
          aria-hidden="true"
          className="shrink-0"
        />
      ) : null}
      <span>{label}</span>
    </a>
  );
}
