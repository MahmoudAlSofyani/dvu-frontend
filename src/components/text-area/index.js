import React from "react";

const TextArea = ({
  placeholder,
  rows,
  required,
  handleInputChange,
  name,
  errorMessage,
}) => {
  return (
    <div>
      <textarea
        className="bg-charcoal rounded-md p-2 text-white w-full"
        rows={rows}
        name={name}
        onChange={handleInputChange}
        placeholder={required ? placeholder + " *" : placeholder}
      />
      {errorMessage ? <p className="text-red text-sm">{errorMessage}</p> : null}
    </div>
  );
};

export default TextArea;
