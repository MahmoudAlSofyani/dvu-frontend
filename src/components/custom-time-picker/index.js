import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomTimePicker = ({ selected, handleTimeChange, placeHolder }) => {
  return (
    <DatePicker
      className="bg-charcoal border-none p-2 rounded-md shadow-md text-white border-2 w-full"
      selected={selected}
      onChange={(date) => handleTimeChange(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      placeholderText={placeHolder + " *"}
      wrapperClassName="w-full"
      required
    />
  );
};

export default CustomTimePicker;

