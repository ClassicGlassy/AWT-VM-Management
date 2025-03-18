/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function LinkButtonPrimary({ to, Icon, text }) {
  return (
    <Link
      to={to}
      className="py-2 px-5 text-white bg-blue-500 hover:bg-blue-600 flex justify-center items-center rounded-md font-medium transition-colors ease-in-out duration-200"
    >
      <span className="inline-block text-2xl md:text-lg">
        {Icon && <Icon />}
      </span>
      <span className="hidden md:block md:ml-2">{text}</span>
    </Link>
  );
}
export default LinkButtonPrimary;
