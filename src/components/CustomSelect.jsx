


import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./CustomSelect.css";


function CustomSelect({ options, placeholder, onChange, value }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState(null);

  // 受控 selected 狀態
  const selected = value || null;

  // 點擊外部自動關閉（portal 需同時判斷 triggerRef 和 dropdownRef）
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // 計算下拉選單位置
  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 2000
      });
    } else {
      setDropdownStyle(null);
    }
  }, [open]);

  const handleSelect = (option) => {
    setOpen(false);
    if (onChange) onChange(option);
  };

  // 下拉選單內容（只有計算好位置才 render，避免閃爍）
  const dropdown = open && dropdownStyle ? (
    ReactDOM.createPortal(
      <ul
        className={`custom-options open`}
        style={dropdownStyle}
        ref={dropdownRef}
      >
        {options.map((option) => (
          <li
            key={option.value}
            className={`custom-option ${selected?.value === option.value ? "selected" : ""}`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>,
      document.body
    )
  ) : null;

  return (
    <div className="custom-select" style={{ position: "relative" }}>
      <div
        className={`custom-select-trigger ${open ? "open" : ""} ${selected ? "has-value" : ""}`}
        onClick={() => setOpen(!open)}
        ref={triggerRef}
      >
        {selected ? selected.label : placeholder}
      </div>
      {dropdown}
    </div>
  );
}

export default CustomSelect;
