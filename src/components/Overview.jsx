import React, { useEffect, useState } from "react";

const API_USERS = "http://localhost:8009/api/users";
const API_BOOKS = "http://localhost:8009/api/books";
const API_ISSUES = "http://localhost:8009/api/issues";

const Overview = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    booksIssued: 0,
    overdueBooks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, booksRes, issuesRes] = await Promise.all([
          fetch(API_USERS),
          fetch(API_BOOKS),
          fetch(API_ISSUES),
        ]);

        const [users, books, issues] = await Promise.all([
          usersRes.json(),
          booksRes.json(),
          issuesRes.json(),
        ]);

        const totalUsers = users.length;
        const totalBooks = books.length;
        const booksIssued = issues.filter((i) => !i.returned).length;
        const overdueBooks = issues.filter(
          (i) => !i.returned && new Date(i.dueDate) < new Date()
        ).length;

        setStats({ totalUsers, totalBooks, booksIssued, overdueBooks });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    { label: "Total Books", value: stats.totalBooks, color: "bg-blue-500" },
    { label: "Total Users", value: stats.totalUsers, color: "bg-green-500" },
    { label: "Books Issued", value: stats.booksIssued, color: "bg-yellow-500" },
    { label: "Overdue Books", value: stats.overdueBooks, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {statItems.map((stat) => (
        <div
          key={stat.label}
          className={`p-6 rounded-xl text-white shadow-lg ${stat.color}`}
        >
          <h3 className="text-lg font-semibold">{stat.label}</h3>
          <p className="text-2xl font-bold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Overview;
