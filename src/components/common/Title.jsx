const Title = ({ as: Tag = "h2", className = "section-title", children, ...props }) => (
  <Tag className={className} {...props}>
    {children}
  </Tag>
);

export default Title;
