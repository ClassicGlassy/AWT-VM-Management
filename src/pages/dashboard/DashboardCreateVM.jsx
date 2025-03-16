import { useState } from "react";

// Components
import LabeledInput from "../../components//inputbox/LabeledInput";
import LabeledInputNumber from "../../components//inputbox/LabeledInputNumber";
import ImageRadioButton from "../../components/imageRadio/ImageRadioButton";
import PrimaryButton from "../../components/button/PrimaryButton";

import PositiveAlert from "../../components/alert/PositiveAlert";
import NegativeAlert from "../../components/alert/NegativeAlert";

// Icons
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaMemory, FaHardDrive, FaDesktop } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";

// OS Icons
import { SiCanonical, SiRockylinux } from "react-icons/si";
import { FaWindows } from "react-icons/fa6";

function DashboardCreateVM() {
  // Button Requirement
  const [loading, setLoading] = useState(false);

  // InputValue
  const [vmName, setVmName] = useState("");
  const [vmPassword, setVmPassword] = useState("");
  const [cpu, setCpu] = useState("");
  const [memory, setMemory] = useState("");
  const [disk, setDisk] = useState("");
  const [os, setOs] = useState("");

  // Alert Requirements
  const [successToggle, setSuccessToggle] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [errorToggle, setErrorToggle] = useState(false);
  const [errorText, setErrorText] = useState("");

  // OS Options
  const os_options = [
    {
      name: "Windows Server",
      value: "windows",
      icon: FaWindows,
    },
    {
      name: "Ubuntu 20.04 LTS",
      value: "ubuntu-focal-20.04-cloudimg",
      icon: SiCanonical,
    },
    {
      name: "Rockey Linux",
      value: "rockey",
      icon: SiRockylinux,
    },
  ];

  // OnSubmit Method
  async function createVM(e) {
    e.preventDefault();

    // Basic Validation with trimming strings
    if (
      !vmName?.trim() ||
      !vmPassword?.trim() ||
      !cpu?.trim() ||
      !memory?.trim() ||
      !disk?.trim() ||
      !os?.trim()
    ) {
      alert("Please fill out all fields.");
      return;
    }

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
          password: `${vmPassword}`,
          template: `${os}`,
          network: "Lab Network",
          cpus: `${cpu}`,
          memory: `${memory * 1024}`,
          disk_size: `${disk}`,
        }),
      });

      const data = await response.json();

      // Check if the Status code is 200
      if (!response.ok) {
        throw new Error(data?.message || "Request failed. Please try again.");
      }

      // Request Success
      setSuccessToggle(true);
      setSuccessText(data);
    } catch (error) {
      // Request Error
      setErrorToggle(true);
      setErrorText(error);
    } finally {
      setLoading(false);
      setVmName("");
      setCpu("");
      setMemory("");
      setDisk("");
      setOs("");
    }
  }

  return (
    <>
      {/* Main Content */}
      <div className=" bg-white shadow-md rounded-xl px-10 py-6 w-full max-w-5xl ">
        <h2 className="text-center text-xl font-bold uppercase border-b-2 border-b-blue-400 mb-5">
          Create Virtual machine
        </h2>

        <form
          onSubmit={createVM}
          // className="grid auto-rows-min gap-4 md:grid-cols-2"
        >
          {/* Input options in grids */}
          <div className="grid auto-rows-min gap-x-4 md:grid-cols-2">
            {/* VM Name */}
            <LabeledInput
              label={"VM Name"}
              placeholder={"Enter VM Name"}
              inputValue={vmName}
              setInputValue={setVmName}
              type={"text"}
              Icon={MdDriveFileRenameOutline}
            />

            {/* CPU Cores */}
            <LabeledInputNumber
              label={"CPU Cores"}
              placeholder={"Enter CPU Cores"}
              inputValue={cpu}
              setInputValue={setCpu}
              type={"number"}
              Icon={HiMiniCpuChip}
              maximum={16}
            />

            {/* Memory */}
            <LabeledInputNumber
              label={"Memory (in GB)"}
              placeholder={"Enter Memory size (in GB)"}
              inputValue={memory}
              setInputValue={setMemory}
              type={"number"}
              Icon={FaMemory}
              maximum={32}
            />

            {/* Disk */}
            <LabeledInputNumber
              label={"Disk size (in GB)"}
              placeholder={"Enter Disk size (in GB)"}
              inputValue={disk}
              setInputValue={setDisk}
              type={"number"}
              Icon={FaHardDrive}
              maximum={100}
            />
          </div>

          {/* User credential */}
          <div className="col-start-1 md:col-end-3">
            <LabeledInput
              label={"VM Password"}
              inputValue={vmPassword}
              setInputValue={setVmPassword}
              placeholder={"Enter VM Password"}
              Icon={TbLockPassword}
            />
          </div>

          {/* OS Selection */}
          <div className="col-start-1 md:col-end-3">
            <label className="text-gray-700 text-lg font-bold mb-2 flex items-center">
              <span className=" mr-2 align-middle text-xl">
                <FaDesktop />
              </span>
              Select OS
            </label>
            <div className="grid md:grid-cols-3 gap-3 mb-4 col-start-1 col-end-3">
              {os_options.map((os_option, key) => (
                <ImageRadioButton
                  label={os_option.name}
                  groupName={"os_options"}
                  value={os_option.value}
                  Icon={os_option.icon}
                  option={os}
                  setOption={setOs}
                  key={key}
                />
              ))}
            </div>
          </div>

          {/* Create Button */}
          <div className="col-start-1 md:col-end-3">
            <PrimaryButton buttonText={"Create VM"} loading={loading} />
          </div>
        </form>
      </div>

      {/* Success Alert */}
      <PositiveAlert
        isVisible={successToggle}
        setIsVisible={setSuccessToggle}
        title={"VM Created"}
        message={successText}
      />

      {/* Error Alert */}
      <NegativeAlert
        isVisible={errorToggle}
        setIsVisible={setErrorToggle}
        message={errorText}
        title={"Error"}
      />
    </>
  );
}

export default DashboardCreateVM;
