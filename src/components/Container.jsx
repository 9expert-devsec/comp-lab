/* Shared page container: 1200px content, centered, 24px side padding (16px below 768px). */
export default function Container({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`mx-auto w-full max-w-[1248px] px-6 max-md:px-4 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
