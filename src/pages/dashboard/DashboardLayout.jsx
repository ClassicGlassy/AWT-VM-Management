import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Utility Funtion
import { checkToken } from "../../utils/checkToken";

// Image
import Sidebar from "./dashboardComponents/Sidebar";

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
    <div className="flex gap-4 ">
      {/* Sidebar */}
      <Sidebar email={email} logout={logout} />

      {/* Main */}
      <main className="mt-4 p-6 bg-stone-50 rounded-tl-lg py-4 w-full  flex-1 flex flex-col">
        <h1 className="font-bold text-xl mb-6">Virtual Machine Management</h1>

        {/* Children page here */}
        <article className=" flex flex-1 items-center justify-center">
          <Outlet />
        </article>
      </main>
    </div>
  );
}
export default DashboardLayout;
