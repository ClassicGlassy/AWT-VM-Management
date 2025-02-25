import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";

function Login() {
  const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Run when Page loads
  useEffect(() => {
    function checkToken() {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        console.log("access found");

        // Connect to Server

        // If Token is valid then Redirect to Dashboard Logic
      }
    }
    checkToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Basic validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError(null);

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
        throw new Error("Registration failed. Please try again.");
      }

      // If Status code is 2000
      const data = await response.json();

      // Store the Key to LocalStorage
      localStorage.setItem("access_token", data.access_token);

      redirect("/dashboard");
      // console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-[#F7F2E8]">
      <form
        onSubmit={handleLogin}
        className="mx-auto h-full w-1/3 p-7 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center"
      >
        {/* Title */}
        <div className="flex items-center justify-center mb-6">
          <h1 className="font-bold text-4xl uppercase">Login</h1>
        </div>

        {/* Email */}
        <div className="flex justify-between w-full">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            className="w-full p-3 rounded-md mb-4 border border-gray-500"
          />
        </div>

        {/* Password */}
        <div className="flex justify-between w-full">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className="w-full p-3 rounded-md mb-4 border border-gray-500 "
          />
        </div>

        {/* Button */}
        <div className="w-full flex justify-around flex-col">
          <button
            type="submit"
            className="mt-5 cursor-pointer border-2 bg-[#FDC886] py-1 px-3 rounded-xl font-medium text-lg"
            disabled={loading}
          >
            {loading ? "Logging..." : "Login"}
          </button>

          <Link
            to={"/register"}
            className="mt-5 cursor-pointer border-2 bg-[#FDC886] py-1 px-3 rounded-xl font-medium text-lg text-center"
          >
            Register
          </Link>
        </div>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </main>
  );
}
export default Login;
