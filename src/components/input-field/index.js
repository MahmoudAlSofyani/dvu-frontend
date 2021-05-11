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
  style = 1,
}) => {
  return (
    <>
      {style === 1 ? (
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
        />
      ) : style === 2 ? (
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
        />
      ) : null}
    </>
  );
};
export default InputField;
