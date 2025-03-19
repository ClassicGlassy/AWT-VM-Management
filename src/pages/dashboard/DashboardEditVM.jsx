import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import LabeledInput from "../../components/inputbox/LabeledInput";
import LabeledInputNumber from "../../components/inputbox/LabeledInputNumber";
import PrimaryButton from "../../components/button/PrimaryButton";

import PositiveAlert from "../../components/alert/PositiveAlert";
import NegativeAlert from "../../components/alert/NegativeAlert";

// Icons
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaHardDrive, FaMemory, FaServer, FaSpinner } from "react-icons/fa6";

function DashboardEditVM() {
  const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;
  const access_token = localStorage.getItem("access_token");

  // Button Requirement
  const [loading, setLoading] = useState(false);

  // Data Loading
  const [dataLoading, setDataLoading] = useState(true);

  const { uid } = useParams();

  // Inputs
  const [vmName, setVmName] = useState("");
  const [vmCPU, setVmCPU] = useState();
  const [vmRAM, setVmRAM] = useState();
  const [vmDisk, setVmDisk] = useState();

  // Alert Requirements
  const [successToggle, setSuccessToggle] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [errorToggle, setErrorToggle] = useState(false);
  const [errorText, setErrorText] = useState("");

  // Load the machine details
  useEffect(() => {
    async function loadVMDetails() {
      try {
        const response = await fetch(`${BASE_URL}/vms/${uid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });

        const data = await response.json();

        // Check if the Status code is 200
        if (!response.ok) {
          throw new Error(data?.message || "Request failed. Please try again.");
        }

        setVmName(data.name);
        setVmCPU(data.cpu);
        setVmRAM(data.ram);
        setVmDisk(data.disk);
      } catch (error) {
        // Request Error
        setErrorToggle(true);
        setErrorText(error);
        // setDataLoading(false);
      } finally {
        setDataLoading(false);
      }
    }

    loadVMDetails();
  }, [access_token, BASE_URL, uid]);

  // Modify Machine configurations
  async function modifyVM(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/vms/${uid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          cpus: `${vmCPU}`,
          memory: `${vmRAM * 1024}`,
          disk_size: `${vmDisk}`,
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
    }
  }

  // If data is loading
  if (dataLoading) {
    return (
      <span className="text-5xl animate-spin">
        <FaSpinner />
      </span>
    );
  } else {
    return (
      <>
        {/* If no data is fetched */}
        {!vmName?.trim() ||
        vmCPU === null ||
        vmRAM === null ||
        vmDisk === null ? (
          <p className="text-gray-700 text-lg font-bold mb-2 flex items-center">
            {errorText.message}
          </p>
        ) : (
          // {/* Main Content */}
          <div className="bg-white shadow-md rounded-xl px-10 py-6 w-full max-w-5xl">
            <h2 className="text-center text-xl font-bold uppercase border-b-2 border-b-blue-400 mb-5">
              Modify Virtual machine
            </h2>

            <form onSubmit={modifyVM} className="space-y-4">
              {/* Machine Credentials */}
              <fieldset className="border-2 border-gray-500 px-6 py-2 rounded-lg">
                <legend className="mb-2">Machine Credentials</legend>

                <div className="">
                  {/* VM Name */}
                  <LabeledInput
                    label={"Machine Name"}
                    placeholder={"Enter Machine Name"}
                    inputValue={vmName}
                    setInputValue={setVmName}
                    type={"text"}
                    Icon={MdDriveFileRenameOutline}
                    disabled
                  />
                </div>
              </fieldset>

              {/* Machine Configuration */}
              <fieldset className="border-2 border-gray-500 px-6 py-2 rounded-lg">
                <legend className="mb-2">Machine Configuration</legend>

                <div className="grid auto-rows-min gap-x-4 md:grid-cols-2">
                  {/* CPU Cores */}
                  <LabeledInputNumber
                    label={"CPU Cores"}
                    placeholder={"Enter CPU Cores"}
                    inputValue={vmCPU}
                    setInputValue={setVmCPU}
                    type={"number"}
                    Icon={HiMiniCpuChip}
                    maximum={16}
                  />

                  {/* Memory */}
                  <LabeledInputNumber
                    label={"Memory (in GB)"}
                    placeholder={"Enter Memory size (in GB)"}
                    inputValue={vmRAM}
                    setInputValue={setVmRAM}
                    type={"number"}
                    Icon={FaMemory}
                    maximum={32}
                  />

                  {/* Disk */}
                  <LabeledInputNumber
                    label={"Disk size (in GB)"}
                    placeholder={"Enter Disk size (in GB)"}
                    inputValue={vmDisk}
                    setInputValue={setVmDisk}
                    type={"number"}
                    Icon={FaHardDrive}
                    maximum={100}
                  />

                  {/* Temporary vsphere_server */}
                  <LabeledInput
                    label={"vSphere Server"}
                    inputValue={"lab.samundra.local"}
                    Icon={FaServer}
                    disabled
                  />
                </div>
              </fieldset>

              {/* Create Button */}
              <div className="col-start-1 md:col-end-3">
                <PrimaryButton
                  buttonText={"Modify Machine"}
                  loading={loading}
                />
              </div>
            </form>
          </div>
        )}

        {/* Success Alert */}
        <PositiveAlert
          isVisible={successToggle}
          setIsVisible={setSuccessToggle}
          title={"Machine Update"}
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
}
export default DashboardEditVM;
