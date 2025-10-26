import React, { useEffect, useState } from "react";

const API_BOOKS = "http://localhost:8009/api/books";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const fetchBooks = async () => {
    try {
      const res = await fetch(API_BOOKS);
      const data = await res.json();
      setBooks(data);

      const uniqueGenres = ["All", ...new Set(data.map((b) => b.genre))];
      setGenres(uniqueGenres);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books based on search and selected genre
  const filteredBooks = books.filter((b) => {
    const matchesGenre = selectedGenre === "All" || b.genre === selectedGenre;
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <h2 className="text-4xl font-bold mb-6 text-green-700 text-center">
        📚 Explore Books
      </h2>

      {/* Search & Genre Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Books by genre */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200"
            >
              <div className="h-60 w-full bg-gray-100 rounded-t-xl overflow-hidden flex items-center justify-center">
                {book.imageUrl ? (
                  <img
                    src={`http://localhost:8009${book.imageUrl}`}
                    alt={book.title}
                    className="h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400 italic">No Image</span>
                )}
              </div>

              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-800 mb-1">
                  {book.title}
                </h4>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Author:</span> {book.author}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Genre:</span> {book.genre}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">ISBN:</span> {book.isbn}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Available:</span>{" "}
                  {book.quantity}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full mt-10">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewBooks;
