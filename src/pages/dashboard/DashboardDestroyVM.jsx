import { useState } from "react";
import LabeledInput from "../../components/LabeledInput";
import PrimaryButton from "../../components/PrimaryButton";

function DashboardDestroyVM() {
  // Essential
  const [loading, setLoading] = useState(false);

  // InputValue
  const [vmName, setVmName] = useState("");

  // Method
  async function destroyVM(e) {
    e.preventDefault();

    // Basic validation
    if (!vmName?.trim()) {
      return;
    }

    setLoading(true);

    const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;
    const access_token = localStorage.getItem("access_token");
    try {
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

      alert(data.message);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      setVmName("");
    }
  }

  return (
    <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-md">
      <h2 className="text-center font-bold uppercase border-b-2 border-b-red-400 mb-5">
        Destroy Virtual machine
      </h2>
      <form onSubmit={destroyVM}>
        <LabeledInput
          label={"VM Name"}
          placeholder={"Enter VM to destroy"}
          inputValue={vmName}
          setInputValue={setVmName}
          type={"text"}
        />

        <PrimaryButton buttonText={"Destroy"} loading={loading} />
      </form>
    </div>
  );
}

export default DashboardDestroyVM;
