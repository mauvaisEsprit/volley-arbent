import React, { useEffect, useState } from "react";
import "../styles/componentStyles/Prices.css" // стили для страницы тарифов

const API_URL = "https://volleyback.onrender.com/api/tarifs";

export default function Prices() {
  const [tarifs, setTarifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTarifs();
  }, []);

  const fetchTarifs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Erreur lors du chargement des tarifs");
      const data = await res.json();
      setTarifs(data);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="prices-page">
      <h1 className="prices-page__title">Nos Tarifs</h1>

      {loading && <p className="prices-page__loading">Chargement des tarifs...</p>}
      {error && <p className="prices-page__error">{error}</p>}

      {!loading && !error && tarifs.length === 0 && (
        <p className="prices-page__empty">Aucun tarif disponible pour le moment.</p>
      )}

      {!loading && !error && tarifs.length > 0 && (
        <ul className="prices-list">
          {tarifs.map((tarif) => (
            <li key={tarif._id} className="prices-list__item">
              <h2 className="prices-list__name">{tarif.name}</h2>
              {tarif.description && (
                <p className="prices-list__description">{tarif.description}</p>
              )}
              <ul className="prices-list__items">
                {tarif.items.map((item, index) => (
                  <li key={index} className="prices-list__item-detail">
                    <span className="prices-list__category">{item.category}</span> :{" "}
                    <span className="prices-list__price">{item.price} €</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
