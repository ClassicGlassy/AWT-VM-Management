import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = async (e) => {
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
    setSuccess(null);

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
      console.log(data);

      setSuccess(data.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-[#F7F2E8]">
      <form
        onSubmit={handleRegister}
        className="mx-auto h-full w-1/3 p-7 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center"
      >
        {/* Title */}
        <div className="flex items-center justify-center mb-6">
          <h1 className="font-bold text-4xl uppercase">Register</h1>
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
            {loading ? "Registering..." : "Register User"}
          </button>

          <Link
            to={"/"}
            className="mt-5 cursor-pointer border-2 bg-[#FDC886] py-1 px-3 rounded-xl font-medium text-lg text-center"
          >
            Login
          </Link>
        </div>
      </form>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </main>
  );
}

export default Register;
