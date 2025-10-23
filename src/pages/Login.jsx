// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // ✅ import auth context

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ access login from context
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8009/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Welcome ${data.username}!`, { theme: "colored" });

        const userData = {
          id: data.id,
          username: data.username,
          role: data.role,
        };

        login(userData); // ✅ update global auth state

        setTimeout(() => {
          if (data.role === "ADMIN") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }, 1200);
      } else {
        toast.error(data.message || "Invalid username or password", {
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error! Please try again later.", {
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-ice py-10">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold text-deepBlue text-center mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-grayish mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-700 font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
