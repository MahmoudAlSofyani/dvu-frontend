import React from "react";

const DropdownField = ({
  options,
  placeholder,
  required,
  handleInputChange,
  name,
  disabled = false,
  style = 1,
}) => {
  return (
    <>
      {style === 1 ? (
        <div className="flex flex-col mb-6">
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
      ) : style === 2 ? (
        <div className="flex flex-col mb-6 ">
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
        </div>
      ) : null}
    </>
  );
};

export default DropdownField;
