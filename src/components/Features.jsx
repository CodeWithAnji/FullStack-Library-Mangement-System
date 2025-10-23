import React from "react";
import { Database, Search, AlertTriangle } from "lucide-react";

const features = [
  {
    icon: <Database size={40} className="text-deepBlue" />,
    title: "Digital Book Inventory",
    desc: "Manage your books digitally with advanced cataloging and easy search access.",
  },
  {
    icon: <Search size={40} className="text-deepBlue" />,
    title: "Search Books",
    desc: "Find books quickly using our smart search system powered by keywords and filters.",
  },
  {
    icon: <AlertTriangle size={40} className="text-deepBlue" />,
    title: "Defaulter List",
    desc: "Track and manage overdue books and defaulters effortlessly using automation tools.",
  },
];

const Features = () => (
  <section className="py-16 bg-ice">
    <h2 className="text-3xl font-bold text-center mb-4 text-deepBlue">
      Our Features
    </h2>
    <p className="text-center text-grayish mb-10">
      Discover what makes our platform efficient and user-friendly
    </p>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
      {features.map((f, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 text-center shadow-sm border border-ice hover:shadow-md hover:border-aqua transition-all transform hover:scale-105"
        >
          <div className="flex justify-center mb-4">{f.icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-aqua">{f.title}</h3>
          <p className="text-grayish">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
