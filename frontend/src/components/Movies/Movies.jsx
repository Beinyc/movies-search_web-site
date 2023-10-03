import { useState, useEffect } from "react";
import moviesApi from "../../utils/MoviesApi";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import useMoviesFilter from "../../hooks/useMoviesFilter";
import MoviesCardList from "../Movies//MoviesCardList/MoviesCardList";
import {
  errorGetMovies,
  errorNotFoundMovies,
} from "../../utils/constants";
import "./Movies.css";

function Movies({
  savedMovies,
  isMoviesPage,
  isSavedMoviesPage,
  onSave,
  onDelete,
}) {
  const { isFilterSearchedMovies, setIsFilterSearchedMovies } = useMoviesFilter();
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [isSearchedMovies, setIsSearchedMovies] = useState([]);
  const [isShortMoviesValue, setIsShortMoviesValue] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleMoviesSearch(searchText) {
    if (!isAllMovies.length) {
      moviesApi
        .getMovies()
        .then((isAllMovies) => {
          setIsAllMovies(isAllMovies);
          handleFilterSearchedMovies(isAllMovies, searchText);
        })
        .catch((err) => {
          setError(errorGetMovies);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
      setIsLoading(true);
      setError("");
    } else {
      handleFilterSearchedMovies(isAllMovies, searchText);
    }
  }

  function handleFilterSearchedMovies(isAllMovies, searchText) {
    setError("");

    if (isShortMoviesValue.length > 0) {
      const filteredMovies = isFilterSearchedMovies(isShortMoviesValue, searchText);
      if (filteredMovies.length === 0) {
        setError(errorNotFoundMovies);
      } else {
        setIsShortMoviesValue(filteredMovies);
        localStorage.setItem("isShortMoviesValue", JSON.stringify(filteredMovies));
        localStorage.setItem("searchText", searchText);
      }

    } else {
      const filteredMovies = isFilterSearchedMovies(isAllMovies, searchText);
      if (filteredMovies.length === 0) {
        setError(errorNotFoundMovies);
      } else {
        setIsSearchedMovies(filteredMovies);
        localStorage.setItem("isSearchedMovies", JSON.stringify(filteredMovies));
        localStorage.setItem("searchText", searchText);
      }
    }
  }

  function handleFilterShortMovies() {
    if (isShortMovies === false) {
      setIsShortMovies(true);
      const filteredMovies = setIsFilterSearchedMovies(isSearchedMovies);
      if (filteredMovies.length === 0) {
        setError(errorNotFoundMovies);
      } else {
        setIsShortMoviesValue(filteredMovies);
        localStorage.setItem("isShortMoviesValue", JSON.stringify(filteredMovies));
        localStorage.setItem("isChecked", isShortMovies);
      }
    } else {
      setIsShortMovies(false);
      setIsShortMoviesValue([]);
      localStorage.removeItem("isShortMoviesValue");
      localStorage.removeItem("isChecked");
      setError("");
    }
  }

  useEffect(() => {
    if (isMoviesPage) {
      setIsSearchedMovies(JSON.parse(localStorage.getItem("isSearchedMovies")) ?? []);
      setIsShortMoviesValue(JSON.parse(localStorage.getItem("isShortMoviesValue")) ?? []);
      setIsShortMovies(localStorage.getItem("isChecked") ?? false);
    }
  }, [isMoviesPage]);

  function handleClickMovie(card) {
    const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
    if (savedMovie) {
      onDelete(savedMovie._id);
      return;
    }
    onSave(card);
  }

  function renderMovies() {
    if (isShortMoviesValue.length > 0) {
      return isShortMoviesValue;
    } else {
      return isSearchedMovies;
    }
  }

  return (
    <main className="main">
      <SearchForm
        isMoviesPage={isMoviesPage}
        onSubmit={handleMoviesSearch}
        onCheckboxChange={handleFilterShortMovies}
        isShortMoviesChecked={isShortMovies}
      />
      {isLoading && <Preloader />}
      {!isLoading && !error && (isSearchedMovies.length > 0 || isShortMoviesValue.length > 0) && (
        <MoviesCardList
          cards={renderMovies()}
          savedMovies={savedMovies}
          isMoviesPage={isMoviesPage}
          isSavedMoviesPage={isSavedMoviesPage}
          onClick={handleClickMovie}
        />
      )}
      {error && <p className="request-error">{error}</p>}
    </main>
  );
}

export default Movies;
