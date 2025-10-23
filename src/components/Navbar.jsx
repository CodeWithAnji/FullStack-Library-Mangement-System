// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Info, LogIn, BookOpen, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // ✅ import context
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth(); // ✅ access user + logout from context

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully", { theme: "colored" });
  };

  return (
    <nav className="bg-ice shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-2 text-deepBlue font-bold text-xl">
          <BookOpen />
          <span>E-Library</span>
        </div>

        <div className="flex items-center gap-6 text-grayish font-medium">
          <NavLink
            to="/"
            className="hover:text-aqua transition flex items-center gap-1"
          >
            <Home size={18} /> Home
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-aqua transition flex items-center gap-1"
          >
            <Info size={18} /> About
          </NavLink>
          <NavLink
            to="/view-books"
            className="hover:text-aqua transition flex items-center gap-1"
          >
            <BookOpen size={18} /> View Books
          </NavLink>

          {user ? (
            <div className="flex items-center gap-3">
              <User size={20} className="text-deepBlue" />
              <span className="font-semibold text-deepBlue">
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 px-4 py-2 rounded-full font-semibold transition-all transform"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-green-500 hover:text-green-700 transition flex items-center gap-1"
            >
              <LogIn size={18} /> Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
