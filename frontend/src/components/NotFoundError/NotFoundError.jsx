import { Link } from "react-router-dom";
import "./NotFoundError.css";

function ErrorNotFound() {
  return (
    <section className="not-found" aria-label="страница не найдена">
      <div className="not-found__error">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__description">Страница не найдена</p>
      </div>
      <Link className="not-found__link link" to={-1}>
        Назад
      </Link>
    </section>
  );
}

export default ErrorNotFound;
