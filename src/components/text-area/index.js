import React from "react";

const TextArea = ({ placeholder, rows, required, handleInputChange, name }) => {
  return (
    <textarea
      className="bg-charcoal rounded-md p-2 text-white"
      rows={rows}
      name={name}
      onChange={handleInputChange}
      placeholder={required ? placeholder + " *" : placeholder}
    />
  );
};

export default TextArea;
