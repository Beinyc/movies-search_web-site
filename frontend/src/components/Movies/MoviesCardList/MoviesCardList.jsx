import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import {
  viewPortExtraLarge,
  viewPortLarge,
  viewPortMedium,
  initialCardsExtraLarge,
  initialCardsLarge,
  initialCardsMedium,
  initialCardsSmall,
  moreCardsExtraLarge,
  moreCardsLarge,
  moreCardsMedium,
  moreCardsSmall,
  
} from "../../../utils/constants";
import "./MoviesCardList.css";

function MoviesCardList({
  cards,
  savedMovies,
  isMoviesPage,
  isSavedMoviesPage,
  onClick,
}) {
  const [isInitialCards, setIsInitialCards] = useState(0);
  const [isMoreCards, setIsMoreCards] = useState(0);
  const [isVisibilityDisplay, setIsVisibilityDisplay] = useState(0);
  const [isWindowWidth, setIsWindowWidth] = useState(window.screen.width);

  useEffect(() => {
    setIsVisibilityDisplay(0);
  }, [cards]);

  useEffect(() => {
    console.log(isWindowWidth);
    if (isWindowWidth >= viewPortExtraLarge) {
      setIsInitialCards(initialCardsExtraLarge);
      setIsMoreCards(moreCardsExtraLarge);
    } else if (isWindowWidth >= viewPortLarge) {
      setIsInitialCards(initialCardsLarge);
      setIsMoreCards(moreCardsLarge);
    } else if (isWindowWidth >= viewPortMedium) {
      setIsInitialCards(initialCardsMedium);
      setIsMoreCards(moreCardsMedium);
    } else if (isWindowWidth <= viewPortMedium) {
      setIsInitialCards(initialCardsSmall);
      setIsMoreCards(moreCardsSmall);
    }

    function handleUpdateWindowWidth() {
      setIsWindowWidth(window.screen.width);
    }

    window.addEventListener("resize", handleUpdateWindowWidth);
    return () => window.removeEventListener("resize", handleUpdateWindowWidth);
  }, [isWindowWidth, setIsWindowWidth]);

  function handleAddMoreCards() {
    setIsVisibilityDisplay(isVisibilityDisplay + 1);
    console.log(isVisibilityDisplay);
  }

  const isButtonActive = cards.length > (isInitialCards + isVisibilityDisplay * isMoreCards)
  
  return (
    <section
      className={`
        movies
        ${isSavedMoviesPage ? "movies_type_saved" : ""}
      `}
      aria-label="фильмы"
    >
      <div className="movies__flex">
        <ul className="movies__element">
          {isSavedMoviesPage
            ? cards.map((card) => (
                <MoviesCard
                  card={card}
                  key={card._id}
                  savedMovies={savedMovies}
                  isMoviesPage={isMoviesPage}
                  isSavedMoviesPage={isSavedMoviesPage}
                  onClick={onClick}
                />
              ))
            : cards
                .slice(0, isInitialCards + isVisibilityDisplay * isMoreCards)
                .map((card) => (
                  <MoviesCard
                    card={card}
                    key={card.id}
                    savedMovies={savedMovies}
                    isMoviesPage={isMoviesPage}
                    isSavedMoviesPage={isSavedMoviesPage}
                    onClick={onClick}
                  />
                ))}
        </ul>
        {isButtonActive && (
                  <button
                    className="movies__add-button button"
                    onClick={handleAddMoreCards}
                  >
                    Ещё
                  </button>
                )}
      </div>
    </section>
  );
}

export default MoviesCardList;
