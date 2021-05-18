import React from "react";

const InputField = ({
  placeholder,
  name,
  handleInputChange,
  required,
  disabled = false,
  type,
  value,
  defaultValue,
  styleType = 1,
  errorMessage,
  accept = "*",
}) => {
  return (
    <>
      {styleType === 1 ? (
        <div>
          <input
            className="bg-transparent focus:outline-none border-b-2 w-full border-red text-white rounded-none"
            placeholder={required ? placeholder + " *" : placeholder}
            onChange={handleInputChange}
            name={name}
            required={required}
            type={type}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            accept={accept}
          />
          {errorMessage ? (
            <p className="text-red text-sm">{errorMessage}</p>
          ) : null}
        </div>
      ) : styleType === 2 ? (
        <div>
          <input
            className="bg-charcoal focus:outline-none  w-full text-white p-2 rounded-md shadow-md"
            placeholder={required ? placeholder + " *" : placeholder}
            onChange={handleInputChange}
            name={name}
            required={required}
            type={type}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            accept={accept}
          />
          {errorMessage ? (
            <p className="text-red text-sm">{errorMessage}</p>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
export default InputField;
