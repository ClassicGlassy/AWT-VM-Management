/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function LinkButtonNegative({ to, Icon, text }) {
  return (
    <Link
      to={to}
      className="py-2 px-5 text-white bg-negative hover:bg-negative-hover flex justify-center items-center rounded-md font-medium transition-colors ease-in-out duration-200"
    >
      <span className="inline-block text-2xl md:text-3xl">
        {Icon && <Icon />}
      </span>
      <span className="hidden md:block ml-4">{text}</span>
    </Link>
  );
}
export default LinkButtonNegative;
