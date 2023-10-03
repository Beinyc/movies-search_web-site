import Promo from "../Main/Promo/Promo";
import Portfolio from "../Main/Portfolio/Portfolio";
import NavTab from "../Main/NavTab/NavTab";
import AboutMe from "../Main/AboutMe/AboutMe";
import Techs from "../Main/Techs/Techs";
import AboutProject from "../Main/AboutProject/AboutProject";

function Main() {
  return (
    <main>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
