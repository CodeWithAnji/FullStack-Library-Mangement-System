import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8009/api/issues";
const USERS_API = "http://localhost:8009/api/users";
const BOOKS_API = "http://localhost:8009/api/books";

const IssueReturn = () => {
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ user: null, book: null, dueDate: "" });

  const fetchIssues = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setIssues(data);
  };

  const fetchUsers = async () => {
    const res = await fetch(USERS_API);
    const data = await res.json();
    setUsers(data);
  };

  const fetchBooks = async () => {
    const res = await fetch(BOOKS_API);
    const data = await res.json();
    setBooks(data.filter((b) => b.quantity > 0));
  };

  useEffect(() => {
    fetchIssues();
    fetchUsers();
    fetchBooks();
  }, []);

  const handleIssue = async (e) => {
    e.preventDefault();
    if (!form.user || !form.book || !form.dueDate) return;

    const payload = {
      userId: form.user.value,
      bookId: form.book.value,
      dueDate: form.dueDate,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Book issued!");
        setForm({ user: null, book: null, dueDate: "" });
        fetchIssues();
        fetchBooks();
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
        fetchBooks();
      }
    } catch {
      toast.error("Error returning book");
    }
  };

  // Convert users/books to React Select options
  const userOptions = users.map((u) => ({ value: u.id, label: u.username }));
  const bookOptions = books.map((b) => ({
    value: b.id,
    label: `${b.title} (${b.quantity} available)`,
  }));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Issue / Return Management</h2>

      {/* Issue Form */}
      <form
        onSubmit={handleIssue}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6"
      >
        <Select
          options={userOptions}
          value={form.user}
          onChange={(selected) => setForm({ ...form, user: selected })}
          placeholder="Select User"
        />

        <Select
          options={bookOptions}
          value={form.book}
          onChange={(selected) => setForm({ ...form, book: selected })}
          placeholder="Select Book"
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
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
              <td className="p-2 border">{i.user?.username || i.userId}</td>
              <td className="p-2 border">{i.book?.title || i.bookId}</td>
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
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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
