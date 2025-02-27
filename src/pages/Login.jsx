import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { FaEnvelope, FaLock } from "react-icons/fa6";
// import { FaSpinner } from "react-icons/fa6";

// Component
import LabeledInput from "../components/LabeledInput";
import PrimaryButton from "../components/PrimaryButton";

function Login() {
  const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Run when Page loads
  let navigate = useNavigate();
  useEffect(() => {
    document.title = "AccessWorld - VM Login";

    function checkToken() {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        // Connect to Server

        // If Token is valid then Redirect to Dashboard Logic
        navigate("/dashboard");
      }
    }
    checkToken();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("trying to login");

    // Basic validation
    if (!email || !password) {
      return;
    }

    setLoading(true);
    // setError(null);

    try {
      // Response to the Server
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the Status code is 200
      if (!response.ok) {
        throw new Error("An Error has occured! Try again");
      }

      // If Status code is 200
      const data = await response.json();

      // Store the Key to LocalStorage
      localStorage.setItem("access_token", data.access_token);

      // Redirects to dashboard
      navigate("/dashboard");
    } catch (error) {
      // setError(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          <span className="bg-gradient-to-r text-transparent from-blue-500 to-blue-700 bg-clip-text">
            AWT-VM LOGIN
          </span>
        </h2>

        <form onSubmit={handleLogin}>
          <LabeledInput
            label={"Email"}
            placeholder={"Enter your Email"}
            icon={<FaEnvelope />}
            type={"email"}
            inputValue={email}
            setInputValue={setEmail}
          />

          <LabeledInput
            label={"Password"}
            placeholder={"Enter your password"}
            icon={<FaLock />}
            type={"password"}
            inputValue={password}
            setInputValue={setPassword}
          />

          <div className="flex items-center justify-center">
            {/* <button
              type="submit"
              className={`bg-blue-400 text-white font-bold flex items-center justify-center py-3 px-4 rounded focus:outline-none hover:bg-blue-600 w-full cursor-pointer disabled:bg-blue-300  disabled:cursor-not-allowed `}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="text-center animate-spin" />
              ) : (
                "Login"
              )}
            </button> */}

            <PrimaryButton buttonText={"Login"} loading={loading} />
          </div>
        </form>

        <div className="text-center mt-4">
          <Link to="/register" className="hover:underline">
            Register User
          </Link>
        </div>
      </div>
    </main>
  );
}
export default Login;
