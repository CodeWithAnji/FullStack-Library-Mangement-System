import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const states = [
  "Andhra Pradesh",
  "Telangana",
  "Karnataka",
  "Tamil Nadu",
  "Kerala",
];

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    state: "",
    city: "",
    pinCode: "",
    address: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8009/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.text(); // backend returns string message
      if (response.ok) {
        toast.success(data); // ✅ show success toast
        setTimeout(() => navigate("/login"), 1500); // navigate after toast
      } else {
        toast.error(data); // ✅ show error toast
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!"); // ✅ show error toast
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-ice px-4 py-10">
      <div className="bg-white shadow-sm rounded-xl w-full max-w-3xl p-8">
        <h2 className="text-3xl font-bold text-deepBlue text-center mb-6">
          Sign Up
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-aqua"
            />
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-aqua"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-aqua"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-aqua"
            />
            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-aqua"
            />
          </div>

          <textarea
            name="address"
            placeholder="Full Address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-aqua"
          />

          {/* Login Credentials */}
          <div>
            <h4 className="text-deepBlue font-bold px-4 py-1 rounded text-md mb-4 inline-block">
              Login Credentials
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-aqua"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-aqua"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-aqua"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-grayish mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-700 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
