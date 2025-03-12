import { useState } from "react";

// Components
import LabeledInput from "../../components/inputbox/LabeledInput";
import PrimaryButton from "../../components/button/PrimaryButton";

import PositiveAlert from "../../components/alert/PositiveAlert";
import NegativeAlert from "../../components/alert/NegativeAlert";

function DashboardDestroyVM() {
  // Button Requirement
  const [loading, setLoading] = useState(false);

  // InputValue
  const [vmName, setVmName] = useState("");

  // Alert Requirements
  const [successToggle, setSuccessToggle] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [errorToggle, setErrorToggle] = useState(false);
  const [errorText, setErrorText] = useState("");

  // OnSubmit Function
  async function destroyVM(e) {
    e.preventDefault();

    // Basic validation
    if (!vmName?.trim()) {
      return;
    }

    setLoading(true);

    try {
      // BASE_URL for Fetch and access_token for Authorization.
      const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;
      const access_token = localStorage.getItem("access_token");

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
    }
  }

  return (
    <>
      {/* Main Content */}
      <div className="block bg-white shadow-md rounded-xl px-10 py-6 pb-8 w-full max-w-3xl">
        <h2 className="text-center font-bold text-xl uppercase border-b-2 border-b-red-400 mb-5">
          Destroy Virtual machine
        </h2>
        <form onSubmit={destroyVM}>
          <LabeledInput
            label={"VM Name"}
            type={"text"}
            placeholder={"Enter VM to destroy"}
            inputValue={vmName}
            setInputValue={setVmName}
          />

          <PrimaryButton buttonText={"Destroy"} loading={loading} />
        </form>
      </div>

      {/* Success Alert */}
      <PositiveAlert
        isVisible={successToggle}
        setIsVisible={setSuccessToggle}
        title={"Destroyed"}
        message={successText}
      />

      {/* Error Alert */}
      <NegativeAlert
        isVisible={errorToggle}
        setIsVisible={setErrorToggle}
        title={"Error"}
        message={errorText}
      />
    </>
  );
}

export default DashboardDestroyVM;
