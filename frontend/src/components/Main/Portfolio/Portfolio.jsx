import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio" aria-label="портфолио">
      <div className="portfolio__flex">
        <h2 className="portfolio__title">Портфолио</h2>
        <nav className="portfolio__navbar">
          <ul className="portfolio__lists">
            <li className="portfolio__element">
              <a
                className="portfolio__link link"
                href="https://beinyc.github.io/teach-to-learn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Статичный сайт
                <span className="portfolio__arrow">↗</span>
              </a>
            </li>
            <li className="portfolio__element">
              <a
                className="portfolio__link link"
                href="https://beinyc.github.io/travel-russia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Адаптивный сайт
                <span className="portfolio__arrow">↗</span>
              </a>
            </li>
            <li className="portfolio__element">
              <a
                className="portfolio__link link"
                href="https://beinyc.github.io/mesto-react/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Одностраничное приложение
                <span className="portfolio__arrow">↗</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Portfolio;
