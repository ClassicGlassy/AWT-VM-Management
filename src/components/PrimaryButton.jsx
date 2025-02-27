/* eslint-disable react/prop-types */
import { FaSpinner } from "react-icons/fa6";

function PrimaryButton({ buttonText, loading }) {
  return (
    <button
      type="submit"
      className={`bg-blue-400 text-white font-bold flex items-center justify-center py-3 px-4 rounded focus:outline-none hover:bg-blue-600 w-full cursor-pointer disabled:bg-blue-300  disabled:cursor-not-allowed `}
      disabled={loading}
    >
      {loading ? (
        <FaSpinner className="text-center animate-spin" />
      ) : (
        `${buttonText}`
      )}
    </button>
  );
}

export default PrimaryButton;
