import React from "react";

const CurrencySelect = ({ option, value, ...props }) => {
  return (
    <select {...props} value={value}>
      {Object.keys(option).map((value, key) => (
        <option key={key} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelect;
