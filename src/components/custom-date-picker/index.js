import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ selected, handleDateChange, placeHolder, id }) => {
  return (
    <DatePicker
      className="bg-transparent border-red border-t-0 border-r-0 border-l-0 text-white border-2 w-full"
      selected={selected}
      onChange={(date) => handleDateChange(date)}
      dateFormat={["dd-MM-yyyy"]}
      placeholderText={placeHolder}
      minDate={new Date()}
      wrapperClassName="w-full"
      id={id}
    />
  );
};

export default CustomDatePicker;
