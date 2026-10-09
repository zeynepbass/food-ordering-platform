import { useId } from "react";

const Input = ({ label, type = "text", errorMessage, touched, className = "", id, ...inputProps }) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(touched && errorMessage);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="field-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`field-input ${hasError ? "field-input-error" : ""}`}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        {...inputProps}
      />
      {hasError && (
        <p id={errorId} className="field-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
