import React, { useEffect, useState } from "react";
import "../../styles/componentStyles/TarifsAdmin.css";
import PriceAdmin from "../admin/PriceAdmin";

const API_URL = "https://volleyback.onrender.com/api/articles";

export default function TarifsManager() {
  const [showPrices, setShowPrices] = useState(true); // true = PriceAdmin, false = Articles

  // Состояния для articles и управление ими
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchArticles();
  }, []);

    const openModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

   const closeModal = () => {
    setModalImage(null);
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Erreur lors du chargement des données");
      const data = await res.json();
      data.sort((a, b) => a.order - b.order);
      setArticles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleEdit = (article) => {
    setEditId(article._id);
    setFormData({
      name: article.name,
      price: article.price,
      description: article.description || "",
      image: article.image || "",
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ name: "", price: "", description: "", image: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet article ?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      setArticles((arts) => arts.filter((a) => a._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Veuillez remplir les champs nom et prix");
      return;
    }

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/${editId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erreur lors de l'enregistrement");

      const saved = await res.json();

      if (editId) {
        setArticles((arts) =>
          arts.map((a) => (a._id === editId ? saved : a))
        );
      } else {
        setArticles((arts) => [...arts, saved]);
      }

      handleCancel();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="tm-page">
      <h2 className="section-title">Gestion des tarifs</h2>

      {/* Кнопка переключения */}
      <div className="tm-toggle-wrapper">
  <button
    onClick={() => setShowPrices((prev) => !prev)}
    className="tm-btn-toggle"
  >
    {showPrices ? "Afficher: Magasin" : "Afficher: Prix des Pass"}
  </button>
</div>



      {/* Отображаем PriceAdmin или Articles */}
      {showPrices ? (
        <PriceAdmin />
      ) : (
        <div className="tm-container">
          <h1 className="price-admin__title">Magasin</h1>
          <form className="tm-form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Nom de l'article"
              value={formData.name}
              onChange={handleChange}
              className="tm-input tm-input-name"
              required
            />
            <input
              name="price"
              placeholder="Prix (ex: 30 €, 35 € / 40 €)"
              value={formData.price}
              onChange={handleChange}
              className="tm-input tm-input-price"
              required
            />
            <input
              name="description"
              placeholder="Description (optionnel)"
              value={formData.description}
              onChange={handleChange}
              className="tm-input tm-input-description"
            />
            <input
              name="image"
              placeholder="URL de l'image (optionnel)"
              value={formData.image}
              onChange={handleChange}
              className="tm-input tm-input-image"
            />
            <div className="tm-buttons">
              <button type="submit" className="tm-btn tm-btn-submit">
                {editId ? "Enregistrer" : "Ajouter"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="tm-btn tm-btn-cancel"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>

          {loading && <p className="tm-loading">Chargement...</p>}
          {error && <p className="tm-error">{error}</p>}

          <ul className="tm-list">
            {articles.map((article) => (
              <li key={article._id} className="tm-list-item">
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.name}
                    className="tm-article-image"
                    loading="lazy"
                     style={{ cursor: "pointer", maxWidth: "80px", maxHeight: "80px", objectFit: "cover" }}
                    onClick={() => openModal(article.image)}
                  />
                )}
                <div className="tm-article-info">
                  <strong className="tm-article-name">{article.name}</strong>{" "}
                  <span className="tm-article-price">{article.price} €</span>
                  {article.description && (
                    <div className="tm-article-desc">{article.description}</div>
                  )}
                </div>
                <div className="tm-article-actions">
                  <button
                    onClick={() => handleEdit(article)}
                    className="tm-btn tm-btn-edit"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="tm-btn tm-btn-delete"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Модалка */}
          {modalImage && (
            <div className="modal-backdrop" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // Чтобы клик на модалке не закрывал ее
              >
                <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                  &times;
                </button>
                <img src={modalImage} alt="Article large" className="modal-image" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
