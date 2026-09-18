export default function Container({
  children,
  as: Tag = "div",
  className = "",
  ...props
}) {
  return (
    <Tag
      className={`mx-auto w-full max-w-container px-4 md:px-6 lg:px-8 ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}
