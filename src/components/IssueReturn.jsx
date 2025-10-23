import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8009/api/issues";

const IssueReturn = () => {
  const [issues, setIssues] = useState([]);
  const [form, setForm] = useState({ userId: "", bookId: "", dueDate: "" });

  const fetchIssues = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setIssues(data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleIssue = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Book issued!");
        setForm({ userId: "", bookId: "", dueDate: "" });
        fetchIssues();
      }
    } catch {
      toast.error("Failed to issue book");
    }
  };

  const handleReturn = async (id) => {
    try {
      const res = await fetch(`${API_URL}/return/${id}`, { method: "PUT" });
      if (res.ok) {
        const { fine } = await res.json();
        toast.info(
          fine > 0
            ? `Returned with fine ₹${fine}`
            : "Book returned successfully"
        );
        fetchIssues();
      }
    } catch {
      toast.error("Error returning book");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🔄 Issue / Return Management</h2>

      {/* Issue Book Form */}
      <form
        onSubmit={handleIssue}
        className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4"
      >
        <input
          placeholder="User ID"
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          placeholder="Book ID"
          value={form.bookId}
          onChange={(e) => setForm({ ...form, bookId: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Issue Book
        </button>
      </form>

      {/* Issued Books Table */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Book</th>
            <th className="p-2 border">Issue Date</th>
            <th className="p-2 border">Due Date</th>
            <th className="p-2 border">Returned</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((i) => (
            <tr key={i._id}>
              <td className="p-2 border">{i.userId}</td>
              <td className="p-2 border">{i.bookId}</td>
              <td className="p-2 border">
                {new Date(i.issueDate).toLocaleDateString()}
              </td>
              <td className="p-2 border">
                {new Date(i.dueDate).toLocaleDateString()}
              </td>
              <td className="p-2 border">{i.returned ? "✅" : "❌"}</td>
              <td className="p-2 border">
                {!i.returned && (
                  <button
                    onClick={() => handleReturn(i._id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Mark Returned
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueReturn;
