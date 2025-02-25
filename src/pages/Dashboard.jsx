import { useState } from "react";

function Dashboard() {
  // State

  const [vmName, setVmName] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;
  const access_token = localStorage.getItem("access_token");
  // const access_token = "SDADADAF2323";

  async function createVM() {
    const response = await fetch(`${BASE_URL}/create-vm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        vsphere_server: "lab.samundra.local",
        datacenter: "Datacenter",
        datastore: "TEST-LUN0",
        resource_pool: "Resources",
        name: `${vmName}`,
        template: "ubuntu-focal-20.04-cloudimg",
        network: "Lab Network",
        cpus: 1,
        memory: 1096,
        disk_size: 30,
      }),
    });

    const data = await response.json();

    console.log(data);
  }

  async function destroyVM() {
    const response = await fetch(`${BASE_URL}/destroy-vm`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        name: `${vmName}`,
      }),
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <main className="min-h-screen bg-[#F7F2E8]">
      {/* VM Name Input */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <input
          type="text"
          name="vmname"
          placeholder="Enter VM Name"
          className="w-1/2 p-3 rounded-md mb-4 border border-gray-500"
          onChange={(e) => setVmName(e.target.value)}
        />
        <div className="w-full flex justify-around">
          {/* Create VM Button */}
          <button
            onClick={createVM}
            className="mb-4 border-2 border-black py-2 px-3 rounded-md cursor-pointer bg-green-500 text-black font-bold"
          >
            Create VM
          </button>
          {/* Destroy VM Button */}
          <button
            onClick={destroyVM}
            className="mb-4 border-2 border-black py-2 px-3 rounded-md cursor-pointer bg-red-600 text-white font-bold"
          >
            Destroy VM
          </button>
        </div>
      </form>
    </main>
  );
}
export default Dashboard;
