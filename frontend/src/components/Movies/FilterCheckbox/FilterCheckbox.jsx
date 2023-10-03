import "./FilterCheckbox.css";

function FilterCheckbox({ onChange, isChecked }) {
  return (
    <div className="filter">
      <label className="filter__description">
        <input
          className="filter__invisible"
          type="checkbox"
          onChange={onChange}
        />
        <span
          className={
            `filter__visible
            ${isChecked ? "filter__visible-checkbox_checked" : ""}
            button`
          }
        ></span>
        <span className="filter__text">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
