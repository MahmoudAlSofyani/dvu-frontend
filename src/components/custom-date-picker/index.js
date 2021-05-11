import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ selected, handleDateChange, placeHolder, id }) => {
  return (
    <DatePicker
      className="bg-charcoal border-none p-2 rounded-md shadow-md text-white border-2 w-full"
      selected={selected}
      onChange={(date) => handleDateChange(date)}
      dateFormat={["dd-MM-yyyy"]}
      placeholderText={placeHolder + " *"}
      minDate={new Date()}
      wrapperClassName="w-full"
      id={id}
    />
  );
};

export default CustomDatePicker;
