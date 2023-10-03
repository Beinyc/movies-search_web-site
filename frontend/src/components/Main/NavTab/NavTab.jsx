import "./NavTab.css";

function NavTab() {
  return (
    <section className="navtab" aria-label="навигационная панель">
      <nav className="navtab__nav-bar">
        <ul className="navtab__element">
          <li className="navtab__lists">
            <a className="navtab__link link" href="#project">
              О проекте
            </a>
          </li>
          <li className="navtab__lists">
            <a className="navtab__link link" href="#techs">
              Технологии
            </a>
          </li>
          <li className="navtab__lists">
            <a className="navtab__link link" href="#student">
              Студент
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;
