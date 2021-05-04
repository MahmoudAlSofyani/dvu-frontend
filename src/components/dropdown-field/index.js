import React from "react";

const DropdownField = ({
  options,
  placeholder,
  required,
  handleInputChange,
  name,
  disabled = false,
}) => {


  return (
    <>
      <div className="flex flex-col mb-6">
        <label for={name} className="text-white opacity-50 mb-1">
          {placeholder} {required ? <span>*</span> : null}
        </label>
        <select
          disabled={disabled}
          className="bg-transparent border-b-2 border-red rounded-none text-white"
          required={required}
          onChange={handleInputChange}
          name={name}
        >
          <option selected disabled hidden></option>
          {options.map((_option, index) => (
            <option key={index} value={_option.value}>{_option.label}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DropdownField;
