import useFormAndValidation from "../../../hooks/useFormAndValidation";
import { useEffect, useContext } from "react";
import { REGEX_NAME, REGEX_EMAIL } from "../../../utils/constants";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({
  isErrorMessage,
  setIsErrorMessage,
  isNotice,
  setIsNotice,
  isEditMode,
  onEdit,
  onUpdate,
  onLogout,
  isSubmitted,
  setIsSubmitted,
}) {
  
  const isCurrentUser = useContext(CurrentUserContext);

  const { values, setValues, errors, isValid, handleChange } = useFormAndValidation({
    name: "",
    email: "",
  });

  const disabledButton =
    !isValid ||
    (values.name === isCurrentUser.name && values.email === isCurrentUser.email) ||
    isSubmitted;

  const disabledInput = !isEditMode || isSubmitted;

  useEffect(() => {
    setValues({
      name: isCurrentUser.name,
      email: isCurrentUser.email,
    });
  }, [setValues, isCurrentUser]);

  function handleEditMode() {
    onEdit(true);
    setIsNotice("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      setIsErrorMessage("");
      onUpdate(values.name, values.email);
      setIsSubmitted(true);
    }
  }

  return (
    <main className="profile">
      <div className="profile__text">
        <h2 className="profile__hello">{`Привет, ${values.name}!`}</h2>
        <form
          className="profile__form"
          name="profile"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="profile__field">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              className={`
                profile__input
                ${errors.name ? `profile__input_type_error` : ""}
                input
              `}
              id="name"
              type="text"
              placeholder="Никита Апатенко"
              name="name"
              minLength="2"
              maxLength="30"
              pattern={REGEX_NAME}
              value={values.name || ""}
              onChange={handleChange}
              autoComplete="off"
              disabled={disabledInput}
              required
            />
            <span className="profile__error-message">{errors.name}</span>
          </div>
          <div className="profile__field">
            <label className="profile__label" htmlFor="email">
              Email
            </label>
            <input
              className={`
                profile__input
                ${errors.email ? `profile__input_type_error` : ""}
                input
              `}
              id="email"
              type="email"
              placeholder="apatenko.nikita31rus@mail.ru"
              name="email"
              pattern={REGEX_EMAIL}
              value={values.email || ""}
              onChange={handleChange}
              autoComplete="off"
              disabled={disabledInput}
              required
            />
            <span className="profile__error-message">{errors.email}</span>
          </div>
        </form>
        {!isEditMode ? (
          <div className="profile__actions-flex">
            <span className="profile__error-request">{isNotice}</span>
            <button
              className="profile__edit-button button"
              type="button"
              onClick={handleEditMode}
            >
              Редактировать
            </button>
            <button
              className="profile__logout-button button"
              type="button"
              onClick={onLogout}
            >
              Выйти из аккаунта
            </button>
          </div>
        ) : (
          <div className="profile__submit-flex">
            <span className="profile__error-request">{isErrorMessage}</span>
            <button
              className="profile__submit-button button"
              type="submit"
              disabled={disabledButton}
              onClick={handleSubmit}
            >
              Сохранить
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Profile;
