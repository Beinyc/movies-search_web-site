import { durationShortMovies } from "../utils/constants";

function useMoviesFilter() {
  // найти те фильмы, которые в своих названиях
  // на русском и английском языках содержат текст запроса
  const isFilterSearchedMovies = (movies, searchText) => {
    const isSearchedMovies = movies.filter(({ nameRU, nameEN }) => {
      return (
        nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
        nameEN.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    return isSearchedMovies;
  };

  // найти те фильмы, длительность которых не превышает 40 минут
  const setIsFilterSearchedMovies = (movies) => {
    const isShortMoviesValue = movies.filter(({ duration }) => {
      return duration <= durationShortMovies;
    });
    return isShortMoviesValue;
  };

  return { isFilterSearchedMovies, setIsFilterSearchedMovies };
}

export default useMoviesFilter;
