import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Utility Funtion
import { checkToken } from "../../utils/checkToken";

// Icon
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { IoMdCreate, IoMdTrash } from "react-icons/io";

// Image
import logo from "../../assets/logo.svg";

function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (import.meta.env.VITE_APP_MODE === "production" && !checkToken()) {
      navigate("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const email = localStorage.getItem("email");

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    navigate("/");
  }

  return (
    <div className="flex space-x-5 min-h-screen bg-gray-300">
      {/* Sidebar */}
      <aside className="basis-1/5 bg-gray-500 flex flex-col overflow-hidden">
        {/* Branding */}
        <div className="basis-1/6 flex flex-col items-center justify-center ">
          <img src={logo} alt="" />
        </div>

        {/* Divider */}
        <div className="w-full flex justify-center">
          <span className="h-1 w-10/12 border-t-2 border-gray-800"></span>
        </div>

        {/* Menus */}
        <div className="flex-1 flex flex-col justify-center items-center space-y-6">
          <Link
            to="create-vm"
            className="py-2 px-5 text-white flex items-center space-x-2 rounded-md bg-green-500 font-medium hover:bg-green-600 transition-colors ease-in-out duration-200"
          >
            <IoMdCreate size={"24px"} />
            <span>Create VM</span>
          </Link>

          <Link
            to={"destroy-vm"}
            className="py-2
            px-5
            text-white
            flex
            items-center
            space-x-2
            rounded-md
            bg-red-500
            font-medium
            hover:bg-red-600
            transition-colors
            ease-in-out
            duration-200"
          >
            <IoMdTrash size={"24px"} />
            Destroy VM
          </Link>
        </div>

        {/* Divider */}
        <div className=" w-full flex justify-center">
          <span className="h-1 w-10/12 border-t-2 border-gray-800"></span>
        </div>
        {/* Profile */}
        <div className="basis-1/5 flex flex-col justify-around pr-4">
          <p className="text-white text-right ">{email}</p>

          <button
            className="text-[#FF2929] flex items-center justify-end  space-x-4 text-lg font-medium cursor-pointer"
            onClick={logout}
          >
            <FaArrowRightFromBracket />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="py-4 w-full bg-gray-300 flex-1 flex flex-col">
        <h1 className="font-bold text-2xl mb-6">Virtual Machine Management</h1>

        {/* Children page here */}
        <article className="flex flex-1 items-center justify-center">
          <Outlet />
        </article>
      </main>
    </div>
  );
}
export default DashboardLayout;
