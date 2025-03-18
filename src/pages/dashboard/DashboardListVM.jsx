/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// Components
import LinkButtonPrimary from "../../components/linkButton/LinkButtonPrimary";
import LinkButtonNegative from "../../components/linkButton/LinkButtonNegative";

// Icons
import { FaTrash } from "react-icons/fa6";
import { BsGearFill } from "react-icons/bs";

function DashboardListVM() {
  const [vmList, setVMList] = useState([]);

  const [filterText, setFilterText] = useState("");
  useEffect(() => {
    async function loadVMList() {
      const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;
      const access_token = localStorage.getItem("access_token");

      try {
        const response = await fetch(`${BASE_URL}/vms`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });

        const data = await response.json();
        setVMList(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadVMList();
  }, []);

  return (
    <>
      {/* Main Content */}
      <div className="bg-white shadow-md rounded-xl px-10 py-6 w-full max-w-5xl">
        <h2 className="text-center text-xl font-bold uppercase border-b-2 border-b-blue-400 mb-5">
          List of Virtual machines
        </h2>

        {/* Search bar */}
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Search Machine name"
          className="w-full text-lg px-3 py-2 border-2 border-blue-500 rounded-lg font-medium outline-blue-500 bg-gray-200 text-black placeholder:text-gray-500"
        />

        <table className="w-full border-separate border-spacing-y-2">
          <thead className="text-lg">
            <tr>
              <th colSpan={2} className=" px-4 py-1">
                Machine Name
              </th>
              <th colSpan={1} className="hidden lg:table-cell px-4 py-1">
                Created At
              </th>
              <th colSpan={1} className=" px-4 py-1">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {/* List all VMs */}
            {vmList
              .filter((vm) =>
                vm.name.toLowerCase().includes(filterText.toLowerCase())
              )
              .map((vm, key) => (
                <RowElement
                  vmName={vm.name}
                  uid={vm.uid}
                  createdAt={vm.createdAt}
                  key={key}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default DashboardListVM;

// Row Element
function RowElement({ vmName, uid, createdAt }) {
  return (
    <tr className="even:bg-gray-200 ">
      <td colSpan={2} className=" px-4 py-1">
        {vmName}
      </td>
      <td colSpan={1} className="hidden lg:table-cell px-4 py-1 text-center">
        {createdAt}
      </td>
      <td className="px-4 py-1 flex justify-evenly " colSpan={1}>
        <LinkButtonPrimary
          to={`/dashboard/edit/${uid}`}
          text={"Modify"}
          Icon={BsGearFill}
        />
        {/* <LinkButtonNegative
          to={`/dashboard/edit/${uid}`}
          text={"Delete"}
          Icon={FaTrash}
        /> */}
      </td>
    </tr>
  );
}
