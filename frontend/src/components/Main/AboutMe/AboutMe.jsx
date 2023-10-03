import photo from '../../../images/profile/student.jpg'
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me" id="student" aria-label="о студенте">
      <div className="about-me__flex">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__text">
          <figure className="about-me__image-flex">
            <img className="about-me__image" src={photo} alt="Никита Апатенко" />
          </figure>
          <h3 className="about-me__name">Никита</h3>
          <p className="about-me__year">Фронтенд-разработчик, 22 года</p>
          <p className="about-me__about-me">
          Я родился и живу в городе Старый Оскол, закончил факультет горного инженера ГГПК. У меня есть машина 
          и самолет. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2021 
          года работаю в компании «АО Металлоинвест». После того, как пройду курс по веб-разработке, 
          планирую начать заниматься фриланс-заказами и возможно уйти с моей постоянной работы.
          </p>
          <a
            className="about-me__github-link link"
            href="https://github.com/Beinyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

