import React, { useEffect, useState } from "react";
import "../../styles/componentStyles/Messages.css";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingId, setSendingId] = useState(null);

  // ─────────────────────────── загрузка списка
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://volleyback.onrender.com/api/contact", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        setMessages(await res.json()); // ← должен включать { replied: Boolean, replyDate? }
      } catch {
        setError("Erreur de chargement des messages.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ─────────────────────────── ответить
  const handleReply = async (id) => {
    if (!window.confirm("Envoyer la réponse ?")) return;
    try {
      setSendingId(id);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://volleyback.onrender.com/api/contact/${id}/reply`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error();

      // обновляем локально «répondu»
      setMessages((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, replied: true, replyDate: new Date().toISOString() } : m
        )
      );
      alert("Réponse envoyée !");
    } catch {
      alert("Erreur lors de l’envoi de la réponse.");
    } finally {
      setSendingId(null);
    }
  };

  // ─────────────────────────── supprimer
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce message ?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://volleyback.onrender.com/api/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch {
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

        {messages.map((msg) => (
          <div key={msg._id} className="message-card">
            <div className="message-header">
              <strong>{msg.name}</strong> &lt;{msg.email}&gt;
              <span className="message-date">
                {new Date(msg.createdAt).toLocaleString("fr-FR")}
              </span>
              {msg.replied && <span className="badge-replied">✅ Répondu</span>}
            </div>

            <p className="message-text">{msg.message}</p>

            <div className="message-actions">
              <button
                className="reply-button"
                onClick={() => handleReply(msg._id)}
                disabled={msg.replied || sendingId === msg._id}
              >
                {msg.replied
                  ? "Déjà répondu"
                  : sendingId === msg._id
                  ? "Envoi..."
                  : "📝 Répondre"}
              </button>

              <button
                className="delete-button"
                onClick={() => handleDelete(msg._id)}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
