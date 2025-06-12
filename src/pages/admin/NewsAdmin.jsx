import React, { useEffect, useState } from "react";
import "../../styles/componentStyles/NewsAdmin.css";
import { FaRegNewspaper } from "react-icons/fa";

export default function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNews, setEditingNews] = useState(null);

  // Загрузка новостей с бэка
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/news");
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
      const res = await fetch(`http://localhost:3001/api/news/${slug}`, {
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

  // Открыть модалку
  const handleEdit = (slug) => {
    const item = news.find((n) => n.slug === slug);
    setEditingNews({ ...item });
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

  // Сохранить изменения
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:3001/api/news/${editingNews.slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingNews),
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
      <h2 className="section-title">
        <FaRegNewspaper className="section-icon" />
        Gestion des actualités
      </h2>
    <div className="news-admin-container">

      {loading && <p>Chargement...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && news.length === 0 && (
        <p>Aucune actualité trouvée.</p>
      )}

      <div className="news-list">
        {news.map(({ slug, title, date, image, content }) => (
          <div key={slug} className="news-item">
            {image && <img src={image} alt={title} className="news-image" />}
            <div className="news-info">
              <h3>{title}</h3>
              <p className="news-date">
                {new Date(date).toLocaleDateString("fr-FR")}
              </p>
              <p className="news-content">{content}</p>
              <div className="news-actions">
                <button
                  onClick={() => handleEdit(slug)}
                  className="edit-button"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => handleDelete(slug)}
                  className="delete-button"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно редактирования */}
      {editingNews && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>✏️ Modifier l’actualité</h3>
            <input
              name="title"
              value={editingNews.title}
              onChange={handleFormChange}
              placeholder="Titre"
            />
            <textarea
              name="content"
              value={editingNews.content}
              onChange={handleFormChange}
              rows={5}
              placeholder="Contenu"
            />
            <input
              name="image"
              value={editingNews.image}
              onChange={handleFormChange}
              placeholder="Image URL"
            />
            <div className="modal-actions">
              <button onClick={handleSave} className="save-button">
                💾 Enregistrer
              </button>
              <button onClick={handleCancel} className="cancel-button">
                ❌ Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
