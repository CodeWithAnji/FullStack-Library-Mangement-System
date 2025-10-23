import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8009/api/books";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    quantity: "",
    isbn: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      toast.error("Failed to load books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(editId ? "Book updated!" : "Book added!");
        setForm({ title: "", author: "", genre: "", quantity: "", isbn: "" });
        setEditId(null);
        fetchBooks();
      } else toast.error("Failed to save book");
    } catch (err) {
      toast.error("Error saving book");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    toast.info("Book deleted");
    fetchBooks();
  };

  const handleEdit = (b) => {
    setForm(b);
    setEditId(b._id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📚 Book Management</h2>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4"
      >
        {["title", "author", "genre", "quantity", "isbn"].map((f) => (
          <input
            key={f}
            type={f === "quantity" ? "number" : "text"}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            value={form[f]}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            className="border p-2 rounded"
            required
          />
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Books Table */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Genre</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">ISBN</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b._id}>
              <td className="p-2 border">{b.title}</td>
              <td className="p-2 border">{b.author}</td>
              <td className="p-2 border">{b.genre}</td>
              <td className="p-2 border">{b.quantity}</td>
              <td className="p-2 border">{b.isbn}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(b)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
