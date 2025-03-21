// "use client";

// import { useState } from "react";

// interface SwitchProps {
//   checked?: boolean;
//   onChange?: (checked: boolean) => void;
// }

// export function Switch({ checked = false, onChange }: SwitchProps) {
//   const [isChecked, setIsChecked] = useState(checked);

//   const handleToggle = () => {
//     const newChecked = !isChecked;
//     setIsChecked(newChecked);
//     if (onChange) {
//       onChange(newChecked);
//     }
//   };

//   return (
//     <button
//       className={`relative w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-colors ${
//         isChecked ? "bg-green-500" : "bg-gray-400"
//       }`}
//       onClick={handleToggle}
//     >
//       <div
//         className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
//           isChecked ? "translate-x-6" : "translate-x-0"
//         }`}
//       />
//     </button>
//   );
// }
"use client";

import { useEffect, useState } from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Switch({ checked = false, onChange }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  // Sync internal state when `checked` prop changes
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <button
      role="switch"
      aria-checked={isChecked}
      tabIndex={0}
      className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors focus:outline-none
        ${isChecked ? "bg-green-500" : "bg-gray-400"}
      `}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform
          ${isChecked ? "translate-x-6" : "translate-x-0"}
        `}
      />
    </button>
  );
}
