import "./AuthSubmitButton.css";

function AuthSubmitButton({ form, isErrorMessage, text, disabled }) {
  return (
    <div
      className={`
        auth__submit-flex
        auth__submit-flex_type_${form}
      `}
    >
      <span className="auth__error-request">{isErrorMessage}</span>
      <button
        className="auth__submit-button button"
        type="submit"
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}

export default AuthSubmitButton;
