import React from "react";

const InputField = ({
  placeholder,
  name,
  handleInputChange,
  required,
  disabled = false,
  type,
  value,
  defaultValue
}) => {
  return (
    <>
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
    </>
  );
};
export default InputField;
