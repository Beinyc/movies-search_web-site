import { NavLink } from "react-router-dom";
import './Auth.css'

function Auth({
  greeting,
  question,
  link,
  route,
  children,
}) {
  return (
    <main className="auth">
      <div className="auth__content">
        <NavLink className="auth__logo button" to="/" />
        <h2 className="auth__greeting">{greeting}</h2>
        {children}
        <p className="auth__questions">{question} {""}
          <NavLink className="auth__link link" to={route}>{link}</NavLink>
        </p>
      </div>
    </main>
  );
}

export default Auth;