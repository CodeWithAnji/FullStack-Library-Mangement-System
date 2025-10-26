// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Info, LogIn, BookOpen, UserCircle2, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully", { theme: "colored" });
  };

  return (
    <nav className="bg-ice shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* LEFT SIDE: Logo + Links */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 text-deepBlue font-bold text-xl">
            <BookOpen />
            <span className="sm:inline">E-Library</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-5 text-grayish font-medium">
            <NavLink
              to="/"
              className="hover:text-aqua transition flex items-center gap-1"
            >
              <Home size={20} />
              <span className="hidden sm:inline">Home</span>
            </NavLink>

            <NavLink
              to="/about"
              className="hover:text-aqua transition flex items-center gap-1"
            >
              <Info size={20} />
              <span className="hidden sm:inline">About</span>
            </NavLink>

            <NavLink
              to="/view-books"
              className="hover:text-aqua transition flex items-center gap-1"
            >
              <BookOpen size={20} />
              <span className="hidden sm:inline">View Books</span>
            </NavLink>
          </div>
        </div>

        {/* RIGHT SIDE: User/Login/Logout */}
        <div className="flex items-center gap-4 text-grayish font-medium">
          {user ? (
            <div className="flex items-center gap-3">
              <UserCircle2 size={22} className="text-deepBlue" />
              <span className="hidden sm:inline font-semibold text-deepBlue">
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 px-3 py-1 rounded-full font-semibold transition-all transform"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-green-500 hover:text-green-700 transition flex items-center gap-1"
            >
              <LogIn size={20} />
              <span className="hidden sm:inline">Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
