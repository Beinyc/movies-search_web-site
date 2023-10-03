import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="project" aria-label="о проекте">
      <div className="about-project__flex">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__information">
          <h3 className="about-project__description">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
          <h3 className="about-project__description">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className="about-project__time">
          <div className="about-project__week">1 неделя</div>
          <div className="about-project__week">4 недели</div>
        </div>
        <div className="about-project__objects">
          <span className="about-project__object">Back-end</span>
          <span className="about-project__object">Front-end</span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
