import React from "react";
import { BookOpen, Search, Users, Clock } from "lucide-react";
import Lib from "../assets/lib1.jpg";

const Home = () => {
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-ice">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl mx-auto px-6 md:px-12 py-16">
        {/* Left: Text Content */}
        <div className="flex flex-col items-start text-left space-y-6 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-deepBlue leading-tight">
            Welcome to the <br />
            <span className="text-aqua">E-Library Management System</span>
          </h1>

          <p className="text-grayish text-lg md:text-xl leading-relaxed">
            Streamline your library operations — manage books, track issues and
            returns, and empower students and admins with a smart digital
            library experience.
          </p>

          <button className="bg-aqua text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-tealish transition-all transform hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Right: Illustration */}
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img
            src={Lib}
            alt="Library illustration"
            className="w-full max-w-md rounded-2xl  object-cover"
          />
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-deepBlue mb-8">
            Our Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen size={40} />,
                title: "Smart Book Management",
                desc: "Easily add, search, and categorize books digitally.",
              },
              {
                icon: <Search size={40} />,
                title: "Fast Search",
                desc: "Find any book or user instantly with advanced search.",
              },
              {
                icon: <Users size={40} />,
                title: "Role-Based Access",
                desc: "Separate dashboards for Admins and Students.",
              },
              {
                icon: <Clock size={40} />,
                title: "Real-Time Tracking",
                desc: "Monitor book issues and returns in real time.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-ice rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
              >
                <div className="text-aqua mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-deepBlue mb-2">
                  {feature.title}
                </h3>
                <p className="text-grayish text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing Features Section */}
      <div className="w-full mt-8 mb-12"></div>
    </main>
  );
};

export default Home;
