import { useState } from "react";
import { Link } from "react-router-dom";

// Component
import LabeledInputValidate from "../components/inputbox/LabeledInputValidate";
import PrimaryButton from "../components/button/PrimaryButton";

import InfoAlert from "../components/alert/InfoAlert";
import NegativeAlert from "../components/alert/NegativeAlert";

// Icons
import { FaEnvelope, FaLock } from "react-icons/fa6";

function Register() {
  // Button Requirement
  const [loading, setLoading] = useState(false);

  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Alert Requirements
  const [successToggle, setSuccessToggle] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [errorToggle, setErrorToggle] = useState(false);
  const [errorText, setErrorText] = useState("");

  // OnSubmit Function
  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email?.trim() || !password?.trim()) {
      return;
    }

    setLoading(true);

    try {
      const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      {/* Main Content */}
      <main className="flex justify-center items-center h-screen">
        <div className="container bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-md">
          {/* Register Title */}
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            <span className="bg-gradient-to-r text-transparent from-blue-500 to-blue-700 bg-clip-text">
              AWT-VM Register
            </span>
          </h2>

          {/* Form */}
          <form onSubmit={handleRegister}>
            {/* Email Field */}
            <LabeledInputValidate
              label={"Email"}
              placeholder={"Enter your Email"}
              Icon={FaEnvelope}
              type={"email"}
              inputValue={email}
              setInputValue={setEmail}
              regex={/^[a-zA-Z0-9._]+@accessworld\.net$/}
              errorMsg={
                "Please enter a valid email address ending with @accessworld.net"
              }
            />

            {/* Password Field */}
            <LabeledInputValidate
              label={"Password"}
              placeholder={"Enter your password"}
              Icon={FaLock}
              type={"password"}
              inputValue={password}
              setInputValue={setPassword}
              regex={/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/}
              errorMsg={
                "Password must contain at least one uppercase letter and a number, and be at least 8 characters long."
              }
            />

            {/* Register Button */}
            <div className="flex items-center justify-center">
              <PrimaryButton buttonText="Register" loading={loading} />
            </div>
          </form>

          {/* Link to Login page */}
          <div className="text-center mt-4">
            <Link to="/" className="hover:underline">
              Login
            </Link>
          </div>
        </div>
      </main>

      {/* Success Alert */}
      <InfoAlert
        isVisible={successToggle}
        setIsVisible={setSuccessToggle}
        title={"Email Verification"}
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

export default Register;
