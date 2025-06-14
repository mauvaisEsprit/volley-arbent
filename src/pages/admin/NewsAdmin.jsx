import React, { useEffect, useState } from "react";
import "../../styles/componentStyles/NewsAdmin.css";
import { FaRegNewspaper } from "react-icons/fa";

export default function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNews, setEditingNews] = useState(null);

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  const formatDateForServer = (localDateStr) => {
    if (!localDateStr) return "";
    // Создаём дату из строки локального времени (в формате YYYY-MM-DDTHH:mm)
    const date = new Date(localDateStr);
    return date.toISOString(); // ISO UTC формат для отправки на сервер
  };

  // Загрузка новостей с бэка
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("https://volleyback.onrender.com/api/news");
        if (!res.ok) throw new Error("Erreur de chargement");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        setError("Impossible de charger les actualités.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Удаление новости
  const handleDelete = async (slug) => {
    if (!window.confirm("Supprimer cette actualité ?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://volleyback.onrender.com/api/news/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erreur de suppression");

      setNews((prev) => prev.filter((item) => item.slug !== slug));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  // Открыть модалку — при этом преобразуем дату для input
  const handleEdit = (slug) => {
    const item = news.find((n) => n.slug === slug);
    if (item) {
      setEditingNews({
        ...item,
        date: formatDateForInput(item.date),
      });
    }
  };

  // Закрыть модалку
  const handleCancel = () => {
    setEditingNews(null);
  };

  // Обновить поля формы
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingNews((prev) => ({ ...prev, [name]: value }));
  };

  // Сохранить изменения — перед отправкой конвертируем дату обратно в ISO
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const newsToSave = {
        ...editingNews,
        date: formatDateForServer(editingNews.date),
      };

      const res = await fetch(
        `https://volleyback.onrender.com/api/news/${editingNews.slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newsToSave),
        }
      );

      if (!res.ok) throw new Error("Erreur lors de l’enregistrement");

      const updated = await res.json();
      setNews((prev) =>
        prev.map((item) => (item.slug === updated.slug ? updated : item))
      );
      setEditingNews(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour.");
    }
  };

  return (
    <>
      <section className="admin-news-section">
        <h2 className="section-title">
          <FaRegNewspaper className="section-icon" />
          Gestion des actualités
        </h2>

        <div className="admin-content">
          {loading && <p className="admin-loading">Chargement...</p>}
          {error && <p className="admin-error">{error}</p>}
          {!loading && !error && news.length === 0 && (
            <p className="section-title">Aucune actualité trouvée.</p>
          )}

          <div className="admin-news-list">
            {news.map(({ slug, title, updatedAt, image, content }) => (
              <div key={slug} className="admin-news-card">
                {image && (
                  <div className="admin-image-wrapper">
                    <img src={image} alt={title} className="admin-image" />
                  </div>
                )}
                <div className="admin-news-details">
                  <h3 className="admin-news-title">{title}</h3>
                  <p className="admin-news-date">
                    {new Date(updatedAt).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </p>
                  <p className="admin-news-text">{content}</p>
                  <div className="admin-news-actions">
                    <button
                      onClick={() => handleEdit(slug)}
                      className="admin-btn edit"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(slug)}
                      className="admin-btn delete"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {editingNews && (
          <div className="admin-modal-overlay">
            <div className="admin-modal">
              <h3 className="admin-modal-title">✏️ Modifier l’actualité</h3>
              <input
                name="title"
                value={editingNews.title}
                onChange={handleFormChange}
                placeholder="Titre"
                className="admin-input"
              />
              <input
                type="datetime-local"
                name="date"
                value={editingNews.date || ""}
                onChange={handleFormChange}
                placeholder="Date"
                className="admin-input-date"
              />
              <textarea
                name="content"
                value={editingNews.content}
                onChange={handleFormChange}
                rows={5}
                placeholder="Contenu"
                className="admin-textarea"
              />
              <input
                name="image"
                value={editingNews.image}
                onChange={handleFormChange}
                placeholder="Image URL"
                className="admin-input"
              />
              <div className="admin-modal-actions">
                <button onClick={handleSave} className="admin-btn save">
                  💾 Enregistrer
                </button>
                <button onClick={handleCancel} className="admin-btn cancel">
                  ❌ Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
