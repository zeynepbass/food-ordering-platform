const AuthCard = ({ title, subtitle, onSubmit, children, footer }) => (
  <div className="container flex justify-center py-12 sm:py-20">
    <div className="card w-full max-w-md p-6 sm:p-8">
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
      <form className="mt-8 flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        {children}
      </form>
      {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
    </div>
  </div>
);

export default AuthCard;
