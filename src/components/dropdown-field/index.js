import React from "react";

const DropdownField = ({
  options,
  placeholder,
  required,
  handleInputChange,
  name,
  disabled = false,
  styleType = 1,
  errorMessage,
}) => {
  return (
    <>
      {styleType === 1 ? (
        <div className="flex flex-col">
          <label htmlFor={name} className="text-white opacity-50 mb-1">
            {placeholder} {required ? <span>*</span> : null}
          </label>
          <select
            disabled={disabled}
            className="bg-transparent border-b-2 border-red rounded-none text-white"
            required={required}
            onChange={handleInputChange}
            name={name}
            defaultValue=""
          >
            <option value="" disabled></option>
            {options.map((_option, index) => (
              <option key={index} value={_option.value}>
                {_option.label}
              </option>
            ))}
          </select>
        </div>
      ) : styleType === 2 ? (
        <div className="flex flex-col ">
          <label htmlFor={name} className="text-white opacity-50 mb-1">
            {placeholder} {required ? <span>*</span> : null}
          </label>
          <select
            disabled={disabled}
            className="bg-charcoal text-white p-2 rounded-md shadow-md"
            required={required}
            onChange={handleInputChange}
            name={name}
            defaultValue=""
          >
            <option value="" disabled></option>
            {options.map((_option, index) => (
              <option key={index} value={_option.value}>
                {_option.label}
              </option>
            ))}
          </select>
          {errorMessage ? (
            <p className="text-red text-sm">{errorMessage}</p>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default DropdownField;
