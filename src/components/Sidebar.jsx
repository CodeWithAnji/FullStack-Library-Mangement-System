import React from "react";
import {
  Home,
  Users,
  Book,
  Bell,
  BarChart2,
  LogOut,
  RefreshCcw,
} from "lucide-react";

const Sidebar = ({ setActiveTab, handleLogout }) => {
  const menu = [
    { name: "Overview", key: "overview", icon: <Home size={20} /> },
    { name: "Users", key: "users", icon: <Users size={20} /> },
    { name: "Books", key: "books", icon: <Book size={20} /> },
    {
      name: "Issue/Return",
      key: "issueReturn",
      icon: <RefreshCcw size={20} />,
    },
    { name: "Reports", key: "reports", icon: <BarChart2 size={20} /> },
    { name: "Notifications", key: "notifications", icon: <Bell size={20} /> },
  ];

  return (
    <div className="w-64 bg-deepBlue text-white flex flex-col p-4 space-y-2">
      <h2 className="text-xl font-semibold mb-4 text-center">📚 Admin Panel</h2>
      {menu.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {item.icon}
          {item.name}
        </button>
      ))}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
