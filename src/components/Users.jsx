import React, { useState, useEffect } from "react";
import { Trash2, UserCircle2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8009/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:8009/api/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("User deleted successfully");
        setUsers(users.filter((u) => u.id !== id));
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-deepBlue mb-6 flex items-center gap-2">
        <UserCircle2 size={26} className="text-green-600" />
        User Management
      </h2>

      <div className="bg-white shadow-md overflow-hidden border-gray-100 rounded-lg">
        <table className="w-full table-auto text-sm md:text-base">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left w-16">S.No.</th>
              <th className="py-3 px-4 text-left">Full Name</th>
              <th className="py-3 px-4 text-left">Mobile Number</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, index) => (
                <tr
                  key={u.id}
                  className="border-b hover:bg-gray-100 transition-all"
                >
                  <td className="py-3 px-4 text-gray-700 font-medium text-center">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {u.fullName}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {u.mobileNumber || "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{u.email}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition-all"
                      title="Delete User"
                    >
                      <Trash2 size={18} className="text-red-700" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-6 text-center text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default Users;
