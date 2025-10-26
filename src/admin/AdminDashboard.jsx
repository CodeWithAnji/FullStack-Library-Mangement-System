import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import Users from "../components/Users";
import Books from "../components/Books";
import IssueReturn from "../components/IssueReturn";
import Reports from "../components/Reports";
import Notifications from "../components/Notifications";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully!", { theme: "colored" });
    navigate("/login");
  };

  const renderSection = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "users":
        return <Users />;
      case "books":
        return <Books />;
      case "issueReturn":
        return <IssueReturn />;
      case "reports":
        return <Reports />;
      case "notifications":
        return <Notifications />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar setActiveTab={setActiveTab} handleLogout={handleLogout} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-deepBlue mb-4">
          Welcome,{" "}
          <span className="font-bold text-blue-600 ">
            {user?.username || "Admin"}
          </span>
        </h1>
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
