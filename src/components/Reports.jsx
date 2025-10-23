import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Reports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8009/api/reports")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => console.error("Error loading reports"));
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📊 Reports & Statistics</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Books Issued per Month</h3>
          <BarChart width={400} height={250} data={data.monthlyIssues}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="issued" fill="#4f46e5" />
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Most Borrowed Genres</h3>
          <PieChart width={400} height={250}>
            <Pie
              data={data.topGenres}
              dataKey="count"
              nameKey="genre"
              outerRadius={100}
              fill="#82ca9d"
            >
              {data.topGenres?.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Reports;
