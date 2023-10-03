import "./AuthInput.css";

function AuthInput({
  id,
  type,
  name,
  label,
  placeholder,
  minLength,
  maxLength,
  pattern,
  value,
  isErrorMessage,
  onChange,
  disabled,
}) {
  return (
    <div className="auth__field">
      <label className="auth__text" htmlFor={id}>
        {label}
      </label>
      <input
        className={`
          auth__input
          ${isErrorMessage ? `auth__input_type_error` : ""}
          input
        `}
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        value={value}
        onChange={onChange}
        autoComplete="off"
        required
        disabled={disabled}
      />
      <span className="auth__message">
        {isErrorMessage}
      </span>
    </div>
  );
}

export default AuthInput;
