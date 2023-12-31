import useFormAndValidation from "../../../hooks/useFormAndValidation";
import AuthInput from "../AuthInput/AuthInput";
import Auth from "../Auth";
import AuthSubmitButton from "../AuthSubmitButton/AuthSubmitButton";
import AuthForm from "../AuthForm/AuthForm";
import { REGEX_EMAIL } from "../../../utils/constants";

function Login({
  isErrorMessage,
  setIsErrorMessage,
  isSubmitted,
  setIsSubmitted,
  onLogin,
}) {
  
  const { values, errors, isValid, handleChange } = useFormAndValidation({
    email: "",
    password: "",
  });

  const disabledButton = !isValid || isSubmitted;
  const disabledInput = isSubmitted;

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      setIsErrorMessage("");
      onLogin(values.email, values.password);
      setIsSubmitted(true);
    }
  }

  return (
    <Auth
      greeting="Рады видеть!"
      question="Ещё не зарегистрированы?"
      link="Регистрация"
      route="/signup"
    >
      <AuthForm name="login" onSubmit={handleSubmit}>
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
          placeholder="**************"
          value={values.password || ""}
          isErrorMessage={errors.password}
          onChange={handleChange}
          disabled={disabledInput}
        />
        <AuthSubmitButton
          form="login"
          isErrorMessage={isErrorMessage}
          text="Войти"
          disabled={disabledButton}
        />
      </AuthForm>
    </Auth>
  );
}

export default Login;
