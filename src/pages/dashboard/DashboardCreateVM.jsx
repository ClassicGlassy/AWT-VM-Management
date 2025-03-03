import { useState } from "react";

// Components
import LabeledInput from "../../components/LabeledInput";
import ImageRadioButton from "../../components/ImageRadioButton";
import PrimaryButton from "../../components/PrimaryButton";

// Icons
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaMemory, FaHardDrive, FaDesktop } from "react-icons/fa6";

import { SiCanonical, SiRockylinux } from "react-icons/si";
import { FaWindows } from "react-icons/fa6";

function DashboardCreateVM() {
  // Essential
  const [loading, setLoading] = useState(false);

  // InputValue
  const [vmName, setVmName] = useState("");
  const [cpu, setCpu] = useState("");
  const [memory, setMemory] = useState("");
  const [disk, setDisk] = useState("");
  const [os, setOs] = useState("");

  // OS Options
  const os_options = [
    {
      name: "Windows Server",
      value: "windows",
      icon: <FaWindows />,
    },
    {
      name: "Ubuntu",
      value: "ubuntu-focal-20.04-cloudimg",
      icon: <SiCanonical />,
    },
    {
      name: "Rockey",
      value: "rockey",
      icon: <SiRockylinux />,
    },
  ];

  // Method
  async function createVM(e) {
    e.preventDefault();

    // Basic Validation
    if (!vmName && !cpu && !memory && !disk && !os) return;

    setLoading(true);

    const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;
    const access_token = localStorage.getItem("access_token");

    try {
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
          template: `${os}`,
          network: "Lab Network",
          cpus: `${cpu}`,
          memory: `${memory}`,
          disk_size: `${disk}`,
        }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      setVmName("");
      setCpu("");
      setMemory("");
      setDisk("");
    }
  }

  return (
    <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-full">
      <h2 className="text-center font-bold uppercase border-b-2 border-b-blue-400 mb-5">
        Create Virtual machine
      </h2>

      <form onSubmit={createVM} className="grid grid-cols-2 gap-5">
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
          type={"number"}
          icon={<HiMiniCpuChip />}
        />

        {/* Memory */}
        <LabeledInput
          label={"Memory (in MB)"}
          placeholder={"Enter Memory size (in MB)"}
          inputValue={memory}
          setInputValue={setMemory}
          type={"number"}
          icon={<FaMemory />}
        />

        {/* Disk */}
        <LabeledInput
          label={"Disk size (in GB)"}
          placeholder={"Enter Disk size (in GB)"}
          inputValue={disk}
          setInputValue={setDisk}
          type={"number"}
          icon={<FaHardDrive />}
        />
        {/* OS Selection */}
        <div className="col-start-1 col-end-3">
          <label className="text-gray-700 text-lg font-bold mb-2 flex items-center">
            <span className=" mr-2 align-middle text-xl">
              <FaDesktop />
            </span>
            Select OS
          </label>
          <div className="grid grid-cols-3 gap-3 mb-4 col-start-1 col-end-3">
            {os_options.map((os_option, key) => (
              <ImageRadioButton
                label={os_option.name}
                groupName={"os_options"}
                value={os_option.value}
                icon={os_option.icon}
                option={os}
                setOption={setOs}
                key={key}
              />
            ))}
          </div>
        </div>

        <div className="col-start-1 col-end-3">
          <PrimaryButton buttonText={"Create VM"} loading={loading} />
        </div>
      </form>
    </div>
  );
}

export default DashboardCreateVM;
