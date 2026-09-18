export default function Container({
  children,
  as: Tag = "div",
  className = "",
  ...props
}) {
  return (
    <Tag
      className={`mx-auto w-full max-w-container px-4 sm:px-5 md:px-6 ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}
