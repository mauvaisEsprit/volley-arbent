import React, { useEffect, useState } from "react";
import "../../styles/componentStyles/Messages.css";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3001/api/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Erreur lors du chargement");

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
        setError("Erreur de chargement des messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce message ?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3001/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
      <>
      <h1 className="section-title">📩 Messages reçus</h1>
    <div className="messages-container">
      {loading && <p>Chargement...</p>}
      {error && <p className="messages-error">{error}</p>}
      {!loading && messages.length === 0 && <p>Aucun message reçu.</p>}
      {!loading &&
        messages.map(({ _id, name, email, message, createdAt }) => (
          <div key={_id} className="message-card">
            <div className="message-header">
              <strong>{name}</strong> &lt;{email}&gt;
              <span className="message-date">
                {new Date(createdAt).toLocaleString("fr-FR")}
              </span>
            </div>
            <p className="message-text">{message}</p>
            <button className="delete-button" onClick={() => handleDelete(_id)}>
              🗑️ Supprimer
            </button>
          </div>
        ))}
    </div>
    </>
  );
}
