import "./MoviesCard.css";

function MoviesCard({
  card,
  savedMovies,
  isMoviesPage,
  isSavedMoviesPage,
  onClick,
}) {
  const duration = convertDuration();
  const isMovieSaved = checkIsMovieSaved(card);

  function convertDuration() {
    const houres = Math.floor(card.duration / 60);
    const minutes = card.duration % 60;
    return `${houres}ч${minutes}м`;
  }

  function checkIsMovieSaved(card) {
    if (isMoviesPage) {
      const isMovieSaved = savedMovies.some((savedMovie) => savedMovie.movieId === card.id);
      return isMovieSaved;
    }
  }

  return (
    <li className="card">
      <a
        className="card__image link"
        href={card.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="card__image"
          src={
            isSavedMoviesPage
              ? card.image
              : `https://api.nomoreparties.co/${card.image.url}`
          }
          alt={card.nameRU}
        />
      </a>
      <div className="card__body">
        <h2 className="card__title">{card.nameRU}</h2>
        {isSavedMoviesPage ? (
          <button
            className={`
              card__delete-button
              button
            `}
            type="button"
            aria-label="удалить"
            onClick={() => onClick(card)}
          ></button>
        ) : (
          <button
            className={`
              card__save-button
              ${isMovieSaved ? "card__save-button_active" : ""}
              button
            `}
            type="button"
            aria-label="сохранить или удалить"
            onClick={() => onClick(card)}
          ></button>
        )}
        <span className="card__time">{duration}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
