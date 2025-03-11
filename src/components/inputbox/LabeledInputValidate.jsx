import { useEffect, useState, useRef } from "react";

/* eslint-disable react/prop-types */
function LabelInputValidate({
  label,
  placeholder,
  type,
  icon,
  inputValue,
  setInputValue,
  regex,
  errorMsg,
}) {
  const [isValid, setIsValid] = useState(null); // Track the validation state
  const hasTyped = useRef(false); // Track if the user has started typing

  // Validate input based on regex after the user types
  useEffect(() => {
    if (hasTyped.current) {
      // Only validate if the user has started typing
      if (regex) {
        setIsValid(regex.test(inputValue)); // Set isValid based on regex check
      }
    }
  }, [inputValue, regex]);

  const handleInputChange = (e) => {
    // Mark the user as having typed when they interact with the input
    if (!hasTyped.current) {
      hasTyped.current = true;
    }

    // Update the input value
    setInputValue(e.target.value);
  };

  return (
    <div className="mb-6">
      <label className="text-gray-700 text-lg font-bold mb-2 flex items-center">
        <span className="mr-2 align-middle text-xl">{icon}</span>
        {label}
      </label>

      <div>
        <input
          type={type}
          className={`shadow appearance-none border-2 rounded w-full py-3 px-4 text-gray-700 leading-relaxed 
            ${
              isValid === null
                ? "border-blue-600"
                : isValid
                ? "border-green-500"
                : "border-red-500"
            }
            focus:outline-none focus:${
              isValid === null
                ? "border-blue-600"
                : isValid
                ? "border-green-600"
                : "border-red-600"
            }`}
          placeholder={placeholder}
          onChange={handleInputChange}
          value={inputValue}
          autoComplete="true"
          required
          pattern={regex ? `${regex.source}` : ""}
          title={errorMsg}
        />
      </div>
    </div>
  );
}

export default LabelInputValidate;
