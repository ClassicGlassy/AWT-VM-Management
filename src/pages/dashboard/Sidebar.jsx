/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// Icons
import { FaArrowRightFromBracket, FaList } from "react-icons/fa6";
import { IoMdCreate, IoMdTrash } from "react-icons/io";

// Logo Branding
import logo from "../../assets/icon.svg";

// Components
import LinkButtonPositive from "../../components/linkButton/LinkButtonPositive";
import LinkButtonNegative from "../../components/linkButton/LinkButtonNegative";
import LinkButtonPrimary from "../../components/linkButton/LinkButtonPrimary";

function Sidebar({ email, logout }) {
  return (
    <nav className="sticky top-0 left-0 flex flex-col w-20 md:w-52 h-screen p-2">
      {/* Branding */}
      <Link
        to={"/dashboard"}
        className="w-full h-20 border-b-2 flex items-center justify-center "
      >
        <img
          src={logo}
          alt="access world logo"
          className="object-fill w-auto h-12"
        />
        <h3 className="hidden md:block ml-2 text-xl font-bold">
          AccessWorld Tech
        </h3>
      </Link>

      {/* Menus */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {/* List VM Link */}
        <LinkButtonPrimary to={"vms"} Icon={FaList} text={"List Machines"} />

        {/* CreateVM Link */}
        <LinkButtonPositive
          to={"create-vm"}
          Icon={IoMdCreate}
          text={"Create Machine"}
        />

        {/* DestroyVM Link*/}
        <LinkButtonNegative
          to={"destroy-vm"}
          Icon={IoMdTrash}
          text={"Destroy Machine"}
        />
      </div>

      {/* User section */}
      <div className="w-full h-20 border-t-2 text-right flex flex-col justify-center ">
        <p className="text-black overflow-x-clip mb-2">{email}</p>
        <button
          className="text-negative hover:text-negative-hover text-right flex items-center justify-end cursor-pointer"
          onClick={logout}
        >
          <FaArrowRightFromBracket className="mr-2 text-2xl md:text-xl" />
          <span className="hidden font-bold md:block">Logout</span>
        </button>
      </div>
    </nav>
  );
}
export default Sidebar;
