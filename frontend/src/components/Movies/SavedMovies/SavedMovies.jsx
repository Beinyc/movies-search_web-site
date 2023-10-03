import { useState } from 'react';
import { errorNotFoundMovies } from '../../../utils/constants';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useMoviesFilter from '../../../hooks/useMoviesFilter';
import './SavedMovies.css';
import { useEffect } from 'react';

function SavedMovies({ isSavedMoviesPage, onDelete }) {
	const { isFilterSearchedMovies, setIsFilterSearchedMovies } = useMoviesFilter();
	const [isShortMovies, setIsShortMovies] = useState(false);
	const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
    const [allSavedMovies, setAllSavedMovies] = useState([]);


	function handleFilterSearchedMovies(searchText) {
		setError('');
    setSearchQuery(searchText)
		const filter = isFilterSearchedMovies(allSavedMovies, searchText);
    console.log(filter)
    if (isShortMovies) {
    const shortMovies = setIsFilterSearchedMovies(filter)
    setFilteredSavedMovies(shortMovies)    
    }
    if (!isShortMovies) {
      setFilteredSavedMovies(filter)
    }

		if (!filter.length) {
      setError(errorNotFoundMovies);
      return
    }
	}

	 function handleFilterShortMovies() {
    setIsShortMovies(!isShortMovies)
	}

  useEffect(() => {
    if (allSavedMovies.length !== 0) {
      handleFilterSearchedMovies(searchQuery);
    }
    }, [isShortMovies]);
  

	function handleDeleteMovie(card) {
    onDelete(card._id)
      .then(() => {
        setAllSavedMovies(films => films.filter(film => film._id !== card._id))
        setFilteredSavedMovies(films => films.filter(film => film._id !== card._id))
      })
      .catch((err) => console.log(err))
	}


  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('savedMovies'))
    if (storage === null) {
      return 
    }
    if (storage !== null) {
      setAllSavedMovies(storage)
      setFilteredSavedMovies(storage)
    }
  }, [])



	return (
		<main className='main'>
			<SearchForm
				onSubmit={handleFilterSearchedMovies}
				onCheckboxChange={handleFilterShortMovies}
				isShortMoviesChecked={isShortMovies}
			/>
			{!error && (
					<MoviesCardList
						cards={filteredSavedMovies}
						isSavedMoviesPage={isSavedMoviesPage}
						onClick={handleDeleteMovie}
					/>
				)}
			{error && <p className='request-error'>{error}</p>}
		</main>
	);
}

export default SavedMovies;
