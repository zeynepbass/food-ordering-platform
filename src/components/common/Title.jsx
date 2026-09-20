const Title = ({ children, addClass = "" }) => (
  <div className={`${addClass} font-dancing font-bold`}>{children}</div>
);

export default Title;
