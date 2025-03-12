/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";

function AlertBase({ visible, setVisible, children }) {
  if (!visible) return null; // Don't render anything if the modal is not visible

  return createPortal(
    <section
      className={`fixed inset-0 flex justify-center items-center transition-all ease-in-out ${
        visible ? "visible bg-black/70" : "invisible"
      }`}
    >
      <div className="bg-white w-sm rounded-md shadow-lg py-4 text-center">
        {/* Title and Messages */}
        {children}

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setVisible(false);
          }}
          className="px-3 py-1 bg-black text-white mt-4 cursor-pointer rounded-md"
        >
          Close
        </button>
      </div>
    </section>,
    document.querySelector("#popup-container")
  );
}

export default AlertBase;
