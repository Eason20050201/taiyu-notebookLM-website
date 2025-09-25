import { useState } from "react";
import "./CustomSelect.css";

function CustomSelect({ options, placeholder, onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="custom-select">
      <div
        className={`custom-select-trigger ${open ? "open" : ""} ${
          selected ? "has-value" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        {selected ? selected.label : placeholder}
      </div>
      <ul className={`custom-options ${open ? "open" : ""}`}>
        {options.map((option) => (
          <li
            key={option.value}
            className={`custom-option ${
              selected?.value === option.value ? "selected" : ""
            }`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomSelect;
