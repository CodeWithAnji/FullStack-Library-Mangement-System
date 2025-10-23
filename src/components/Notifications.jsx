import React, { useEffect, useState } from "react";

const Notifications = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const res = await fetch("http://localhost:8009/api/alerts");
      const data = await res.json();
      setAlerts(data);
    };
    fetchAlerts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🔔 Notifications & Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts right now 🎉</p>
      ) : (
        <ul className="space-y-2">
          {alerts.map((a, i) => (
            <li
              key={i}
              className={`p-3 rounded shadow-sm ${
                a.type === "overdue"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {a.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
