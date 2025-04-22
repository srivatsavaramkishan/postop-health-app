// src/components/CheckupDateSelector.jsx

import React from 'react';

const CheckupDateSelector = ({ checkupDates, selectedDate, onSelectDate }) => {
  return (
    <div className="mb-4">
      <label htmlFor="checkupDate" className="block font-semibold mb-2">
        Select Checkup Date:
      </label>
      <select
        id="checkupDate"
        value={selectedDate}
        onChange={(e) => onSelectDate(e.target.value)}
        className="border p-2 rounded w-full"
      >
        {checkupDates.map((date, idx) => (
          <option key={idx} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CheckupDateSelector;
