import { useEffect } from "react";
import { errorNoKeywords } from "../../../utils/constants";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import "./SearchForm.css";

function SearchForm({
  isMoviesPage,
  onSubmit,
  onCheckboxChange,
  isShortMoviesChecked,
}) {
  
  const { values, setValues, errors, setErrors, isValid, handleChange } = useFormAndValidation({
    searchText: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid || values.searchText === "") {
      setErrors({ searchText: errorNoKeywords });
    } else {
      onSubmit(values.searchText);
    }
  }

  useEffect(() => {
    if (isMoviesPage) {
      setValues({ searchText: localStorage.getItem("searchText") });
    }
  }, [isMoviesPage, setValues]);

  return (
    <section className="search" aria-label="форма поиска">
      <div className="search__flex">
        <form
          className="search__form"
          name="search"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            className="search__input input"
            type="text"
            name="searchText"
            placeholder="Фильм"
            autoComplete="off"
            value={values.searchText || ""}
            onChange={handleChange}
          />
          <span className="search__error-message">{errors.searchText}</span>
          <button
            className="search__submit-button button"
            type="submit"
          ></button>
        </form>
        <FilterCheckbox
          onChange={onCheckboxChange}
          isChecked={isShortMoviesChecked}
        />
      </div>
    </section>
  );
}

export default SearchForm;
