/* eslint-disable react/prop-types */
function LabeledInputNumber({
  label,
  placeholder,
  icon,
  inputValue,
  setInputValue,
  minimum,
  maximum,
}) {
  return (
    <div className="mb-6">
      <label className="text-gray-700 text-lg font-bold mb-2 flex items-center">
        <span className=" mr-2 align-middle text-xl">{icon}</span>
        {label}
      </label>

      <div className="">
        <input
          type="number"
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-relaxed  focus:outline-blue-600 "
          placeholder={`${placeholder}`}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          autoComplete="true"
          required={true}
          min={minimum}
          max={maximum}
        />
      </div>
    </div>
  );
}

export default LabeledInputNumber;
