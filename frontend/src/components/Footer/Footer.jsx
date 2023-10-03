import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__flex">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__button">
          <p className="footer__year">© 2023</p>
          <ul className="footer__lists">
            <li className="footer__element">
              <a
                className="footer__link link"
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__element">
              <a
                className="footer__link link"
                href="https://github.com/Beinyc/movies-explorer-frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
