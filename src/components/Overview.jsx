import React from "react";

const Overview = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { label: "Total Books", value: 1200, color: "bg-blue-500" },
        { label: "Total Users", value: 540, color: "bg-green-500" },
        { label: "Books Issued", value: 230, color: "bg-yellow-500" },
        { label: "Overdue Books", value: 17, color: "bg-red-500" },
      ].map((stat) => (
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
