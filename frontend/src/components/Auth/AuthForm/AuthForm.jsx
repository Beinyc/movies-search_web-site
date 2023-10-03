import "./AuthForm.css";

function AuthForm({ name, onSubmit, children }) {
  return (
    <form
      name={name}
      className="auth__form"
      onSubmit={onSubmit}
      noValidate
    >
      {children}
    </form>
  );
}

export default AuthForm;
