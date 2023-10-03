import "./Techs.css";

function Techs() {
  return (
    <section className="techs" id="techs" aria-label="технологии">
      <div className="techs__flex">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__heading">7 технологий</h3>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__lists">
          <li className="techs__element">HTML</li>
          <li className="techs__element">CSS</li>
          <li className="techs__element">JS</li>
          <li className="techs__element">React</li>
          <li className="techs__element">Git</li>
          <li className="techs__element">Express.js</li>
          <li className="techs__element">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
