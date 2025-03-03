/* eslint-disable react/prop-types */
// import { useState } from "react";

function ImageRadioButton({
  label,
  groupName,
  value,
  option,
  setOption,
  icon,
}) {
  // const [selected, setSelected] = useState(false);

  function handleClick() {
    setOption(value);
    // setSelected((prev) => !prev);
  }

  // function

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer p-4 border-2 text-gray-600 rounded-lg transition ${
        option === value
          ? "bg-blue-500 text-white border-blue-500"
          : "border-gray-300"
      }`}
    >
      <div className="text-5xl flex justify-center mb-3">{icon}</div>
      <p className="text-center font-bold text-lg">{label}</p>
      <input
        type="radio"
        name={groupName}
        value={value}
        className="hidden"
        readOnly
      />
    </div>
  );
}
export default ImageRadioButton;
