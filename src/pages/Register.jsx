import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { FaEnvelope, FaLock } from "react-icons/fa6";

// Component
import LabeledInputValidate from "../components/inputbox/LabeledInputValidate";
import PrimaryButton from "../components/PrimaryButton";

function Register() {
  const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;

  const [loading, setLoading] = useState(false);

  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email?.trim() || !password?.trim()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      const data = await response.json();

      alert(data.message);

      // Redirect to Login
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="container bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          <span className="bg-gradient-to-r text-transparent from-blue-500 to-blue-700 bg-clip-text">
            AWT-VM Register
          </span>
        </h2>

        <form onSubmit={handleRegister}>
          {/* Email Field */}
          <LabeledInputValidate
            label={"Email"}
            placeholder={"Enter your Email"}
            icon={<FaEnvelope />}
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
            icon={<FaLock />}
            type={"password"}
            inputValue={password}
            setInputValue={setPassword}
            regex={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/}
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
  );
}

export default Register;
