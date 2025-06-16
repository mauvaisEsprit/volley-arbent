import React, { useEffect, useState } from "react";
import Hero from "../assets/photo.avif"; // главная картинка (можно оставить для шапки)
import "../styles/pageStyles/Tarifs.css";
import Images from "../components/Images"; // компонент для шапки с картинкой и текстом
import Prices from "../components/Prices";
const API_URL = "https://volleyback.onrender.com/api/articles";

export default function Tarifs() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null); // для модалки

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Erreur lors du chargement des données");
      const data = await res.json();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (loading) return <p className="loading">Chargement...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <Images images={Hero} text="Nos tarifs" buttonText="Découvrir" />
      {/* Компонент для администрирования тарифов */}
      <Prices />
      {/* Секция со статьями */}
      <div className="tarifs-page">
        <section className="articles">
          <h2 className="tarifs-h2 ">Articles à l’unité</h2>
          {articles.length === 0 ? (
            <p>Aucun article disponible.</p>
          ) : (
            <ul className="articles-list">
              {articles
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((a) => (
                  // Внутри map()
<li key={a._id} className="article-item" onClick={() => setModalImage(a.photo || a.image || Hero)}>
  <div className="article-info">
    <div className="article-image-wrapper">
      <img
        src={a.photo || a.image || Hero}
        alt={a.name}
        className="article-image"
        loading="lazy"
      />
    </div>
    <div className="article-texts">
      <strong className="article-name">{a.name}</strong>
      <span className="dots" />
      <span className="article-price">{a.price} €</span>
      {a.description && (
        <p className="article-description">{a.description}</p>
      )}
    </div>
  </div>
</li>

                ))}
            </ul>
          )}
        </section>
      </div>

      {/* Модалка с большим фото */}
      {modalImage && (
        <div className="modal-backdrop" onClick={() => setModalImage(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="modal-close"
              onClick={() => setModalImage(null)}
              aria-label="Fermer"
            >
              &times;
            </button>
            <img src={modalImage} alt="Grande vue" className="modal-image" />
          </div>
        </div>
      )}
    </>
  );
}
