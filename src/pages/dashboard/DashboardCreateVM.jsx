import { useState } from "react";

// Components
import LabeledInput from "../../components/LabeledInput";

// Icons
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaMemory, FaHardDrive } from "react-icons/fa6";

function DashboardCreateVM() {
  // Essential
  const [loading, setLoading] = useState(false);

  // InputValue
  const [vmName, setVmName] = useState("");
  const [cpu, setCpu] = useState("");
  const [memory, setMemory] = useState("");
  const [disk, setDisk] = useState("");
  const [os, setOs] = useState("");

  // Method
  async function createVM(e) {
    e.preventDefault();

    const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;
    const access_token = localStorage.getItem("access_token");

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
        cpus: `${cpu}`,
        memory: 1096,
        disk_size: 30,
      }),
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-md">
      <h2 className="text-center font-bold uppercase border-b-2 border-b-blue-400 mb-5">
        Create Virtual machine
      </h2>

      {/* VM Name */}
      <LabeledInput
        label={"VM Name"}
        placeholder={"Enter VM Name"}
        inputValue={vmName}
        setInputValue={setVmName}
        type={"text"}
        icon={<MdDriveFileRenameOutline />}
      />

      {/* CPU Cores */}
      <LabeledInput
        label={"CPU Cores"}
        placeholder={"Enter CPU Cores"}
        inputValue={cpu}
        setInputValue={setCpu}
        type={"text"}
        icon={<HiMiniCpuChip />}
      />

      {/* Memory */}
      <LabeledInput
        label={"Memory (in MB)"}
        placeholder={"Enter Memory size (in MB)"}
        inputValue={memory}
        setInputValue={setMemory}
        type={"text"}
        icon={<FaMemory />}
      />

      {/* Disk */}
      <LabeledInput
        label={"Disk size (in GB)"}
        placeholder={"Enter Disk size (in GB)"}
        inputValue={disk}
        setInputValue={setDisk}
        type={"text"}
        icon={<FaHardDrive />}
      />

      {/* OS Selection */}
      <div className="flex items-center mb-4">
        <input
          type="radio"
          id="option1"
          name="group"
          value="1"
          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor="option1" className="ml-2 text-gray-700">
          Option 1
        </label>
      </div>
      <div className=""></div>
    </div>
  );
}

export default DashboardCreateVM;
