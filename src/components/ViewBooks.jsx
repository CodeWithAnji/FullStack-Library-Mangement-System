import React from "react";
import { BookOpen } from "lucide-react";

const books = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "1984", author: "George Orwell" },
];

const ViewBooks = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Available Books
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {books.map((book, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <BookOpen className="mx-auto mb-4 text-blue-600" size={40} />
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewBooks;
