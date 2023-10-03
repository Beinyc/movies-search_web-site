import useFormAndValidation from "../../../hooks/useFormAndValidation";
import AuthForm from "../AuthForm/AuthForm";
import { REGEX_NAME, REGEX_EMAIL } from "../../../utils/constants";
import Auth from "../Auth";
import AuthInput from "../AuthInput/AuthInput";
import AuthSubmitButton from "../AuthSubmitButton/AuthSubmitButton";

function Register({
  isErrorMessage,
  setIsErrorMessage,
  isSubmitted,
  setIsSubmitted,
  onRegister,
}) {

  const { values, errors, isValid, handleChange } = useFormAndValidation({
    name: "",
    email: "",
    password: "",
  });
  
  const disabledButton = !isValid || isSubmitted;
  const disabledInput = isSubmitted;

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      setIsErrorMessage("");
      onRegister(values.name, values.email, values.password);
      setIsSubmitted(true);
    }
  }

  return (
    <Auth
      greeting="Добро пожаловать!"
      question="Уже зарегистрированы?"
      link="Войти"
      route="/signin"
    >
      <AuthForm name="registration" onSubmit={handleSubmit}>
        <AuthInput
          id="name"
          type="text"
          name="name"
          label="Имя"
          placeholder="Никита Апатенко"
          minLength="2"
          maxLength="30"
          pattern={REGEX_NAME}
          value={values.name || ""}
          isErrorMessage={errors.name}
          onChange={handleChange}
          disabled={disabledInput}
        />
        <AuthInput
          id="email"
          type="email"
          name="email"
          label="Email"
          placeholder="apatenko.nikita31rus@yandex.ru"
          pattern={REGEX_EMAIL}
          value={values.email || ""}
          isErrorMessage={errors.email}
          onChange={handleChange}
          disabled={disabledInput}
        />
        <AuthInput
          id="password"
          type="password"
          name="password"
          label="Пароль"
          placeholder="***********"
          value={values.password || ""}
          isErrorMessage={errors.password}
          onChange={handleChange}
          disabled={disabledInput}
        />
        <AuthSubmitButton
          form="register"
          isErrorMessage={isErrorMessage}
          text="Зарегистрироваться"
          disabled={disabledButton}
        />
      </AuthForm>
    </Auth>
  );
}

export default Register;
