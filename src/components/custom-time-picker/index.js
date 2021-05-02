import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomTimePicker = ({ selected, handleTimeChange, placeHolder }) => {
  return (
    <DatePicker
      className="bg-transparent border-red border-t-0 border-r-0 border-l-0 text-white border-2 w-full"
      selected={selected}
      onChange={(date) => handleTimeChange(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      placeholderText={placeHolder}
      wrapperClassName="w-full"
      required
    />
  );
};

export default CustomTimePicker;

