import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8009"; // Spring Boot backend
const API_URL = `${BASE_URL}/api/books`;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    quantity: "",
    isbn: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);

  const fileInputRef = useRef(null); // ✅ Ref for file input

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Fantasy",
    "Biography",
    "Education",
    "History",
    "Technology",
    "Others",
  ];

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch {
      toast.error("Failed to load books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Add or update book
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) formData.append(key, form[key]);
    });

    try {
      const res = await fetch(url, { method, body: formData });

      if (res.ok) {
        toast.success(editId ? "Book updated!" : "Book added!");
        setForm({
          title: "",
          author: "",
          genre: "",
          quantity: "",
          isbn: "",
          image: null,
        });
        setEditId(null);

        // ✅ Clear file input display
        if (fileInputRef.current) fileInputRef.current.value = "";

        fetchBooks();
      } else {
        toast.error("Failed to save book");
      }
    } catch {
      toast.error("Error saving book");
    }
  };

  // Delete book
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.info("Book deleted");
        fetchBooks();
      } else {
        toast.error("Failed to delete book");
      }
    } catch {
      toast.error("Error deleting book");
    }
  };

  // Edit book
  const handleEdit = (b) => {
    setForm({
      title: b.title,
      author: b.author,
      genre: b.genre,
      quantity: b.quantity,
      isbn: b.isbn,
      image: null,
    });
    setEditId(b.id);

    // ✅ Clear file input when editing a book
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
        📚 Book Management
      </h2>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-6 bg-white p-4 shadow-md rounded-lg border border-gray-100"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded col-span-1 md:col-span-2"
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="border p-2 rounded col-span-1 md:col-span-2"
          required
        />

        {/* Genre dropdown */}
        <select
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Genre</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="ISBN"
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          className="border p-2 rounded"
          required
        />

        {/* Book image input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef} // ✅ attach ref
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="border p-2 rounded col-span-1 md:col-span-2"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors col-span-1 md:col-span-1"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Books Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 border">S.No.</th>
              <th className="p-3 border">Cover</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Author</th>
              <th className="p-3 border">Genre</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">ISBN</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((b, index) => (
                <tr key={b.id} className="border-b hover:bg-gray-100">
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3 text-center">
                    {b.imageUrl ? (
                      <img
                        src={`${BASE_URL}${b.imageUrl}`}
                        alt={b.title}
                        className="w-12 h-12 object-cover rounded mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No Image</span>
                    )}
                  </td>
                  <td className="p-3">{b.title}</td>
                  <td className="p-3">{b.author}</td>
                  <td className="p-3">{b.genre}</td>
                  <td className="p-3 text-center">{b.quantity}</td>
                  <td className="p-3">{b.isbn}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(b)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="p-4 text-center text-gray-500 italic"
                >
                  No books available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
