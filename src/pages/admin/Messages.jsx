import React, { useEffect, useState } from "react";
import "../../styles/componentStyles/Messages.css";
import { toast } from "react-toastify";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingId, setSendingId] = useState(null);

  // Состояния модалки
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyingToId, setReplyingToId] = useState(null);

  // ─────────────────────────── загрузка списка
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://volleyback.onrender.com/api/contact", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        setMessages(await res.json());
      } catch {
        setError("Erreur de chargement des messages.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ─────────────────────────── отправка ответа
  const submitReply = async () => {
    if (!replyText.trim()) return alert("Veuillez écrire une réponse.");
    if (!window.confirm("Envoyer cette réponse ?")) return;

    try {
      setSendingId(replyingToId);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://volleyback.onrender.com/api/contact/${replyingToId}/reply`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ replyText }),
        }
      );

      if (!res.ok) throw new Error();

      setMessages((prev) =>
        prev.map((m) =>
          m._id === replyingToId
            ? { ...m, replied: true, replyDate: new Date().toISOString() }
            : m
        )
      );

      alert("Réponse envoyée !");
      setShowModal(false);
      setReplyText("");
      setReplyingToId(null);
      toast.success("Réponse envoyée avec succès !");
    } catch {
      alert("Erreur lors de l’envoi de la réponse.");
      toast.error("Erreur lors de l'envoi de la réponse.");
    } finally {
      setSendingId(null);
    }
  };

  // ─────────────────────────── удалить сообщение
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce message ?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://volleyback.onrender.com/api/contact/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error();
      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success("Message supprimé avec succès !");
    } catch {
      alert("Erreur lors de la suppression.");
      toast.error("Erreur lors de la suppression du message.");
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

            {msg.replied && msg.replyText && (
              <div className="message-reply">
                <strong>Réponse de l'admin :</strong>
                <p className="reply-text">{msg.replyText}</p>
                <span className="message-date">
                {new Date(msg.updatedAt).toLocaleString("fr-FR")}
              </span>
              </div>
            )}

            <div className="message-actions">
              <button
                className="reply-button"
                onClick={() => {
                  setReplyingToId(msg._id);
                  setReplyText("");
                  setShowModal(true);
                }}
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

      {/* Модалка */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Répondre au message</h2>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Écrivez votre réponse ici..."
              rows={6}
            />
            <div className="modal-buttons">
              <button
                onClick={submitReply}
                disabled={sendingId === replyingToId}
              >
                {sendingId === replyingToId ? "Envoi..." : "Envoyer"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setReplyText("");
                  setReplyingToId(null);
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
