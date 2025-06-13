import React, { useState } from "react";
import NewsForm from "../admin/NewsForm";
import EventList from "../admin/EventList";
import EventForm from "../admin/EventForm";
import Messages from "../admin/Messages";
import NewsAdmin from "./NewsAdmin";
import PartenairesAdmin from "../admin/PartenairesAdmin";
import CreneauxAdmin from "../admin/CreneauxAdmin";
import "../../styles/pageStyles/Dashboard.css";
import {
  FaPlus,
  FaRegNewspaper,
  FaCalendarPlus,
  FaCalendarAlt,
  FaEnvelopeOpenText,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const [section, setSection] = useState("newsList");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // или navigate если используешь React Router
  };

  const renderSection = () => {
    switch (section) {
      case "newsForm":
        return <NewsForm />;
      case "newsList":
        return <NewsAdmin />;
      case "eventForm":
        return <EventForm />;
      case "eventList":
        return <EventList />;
      case "partenaires":
        return <PartenairesAdmin />;
      case "creneaux":
        return <CreneauxAdmin />;
      case "messages":
        return <Messages />;
      default:
        return null;
    }
  };

  const menuItems = [
    { key: "newsForm", icon: <FaPlus />, label: "Ajouter une actualité" },
    { key: "newsList", icon: <FaRegNewspaper />, label: "Actualités" },
    { key: "eventForm", icon: <FaCalendarPlus />, label: "Ajouter un événement" },
    { key: "eventList", icon: <FaCalendarAlt />, label: "Événements" },
    { key: "partenaires", icon: <FaRegNewspaper />, label: "Partenaires" },
    { key: "creneaux", icon: <FaCalendarAlt />, label: "Créneaux" },
    { key: "messages", icon: <FaEnvelopeOpenText />, label: "Messages" },
  ];

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2 className="admin-title">Panneau Admin</h2>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={section === item.key ? "active" : ""}
                onClick={() => setSection(item.key)}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
            <li onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Se déconnecter</span>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="admin-content">{renderSection()}</main>

      {/* Mobile bottom nav */}
      <div className="admin-bottom-nav">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={section === item.key ? "active" : ""}
            onClick={() => setSection(item.key)}
          >
            {item.icon}
          </button>
        ))}
        <button onClick={handleLogout}>
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
}
