import React, { useEffect, useState } from "react";
import "../../styles/componentStyles/PriceAdmin.css";
import { toast } from "react-toastify";

const API_URL = "https://volleyback.onrender.com/api/tarifs";

export default function PriceAdmin() {
  const [tarifs, setTarifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    items: [{ category: "", price: "" }],
  });

  const [editingId, setEditingId] = useState(null);

  const fetchTarifs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Erreur lors du chargement");
      const data = await res.json();
      setTarifs(data);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTarifs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === "price" ? Number(value) : value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { category: "", price: "" }],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur lors de l'envoi");
      }

      setFormData({
        name: "",
        description: "",
        items: [{ category: "", price: "" }],
      });
      setEditingId(null);
      fetchTarifs();
      setError(null);

      toast.success(editingId ? "Tarif mis à jour avec succès" : "Tarif créé avec succès");
    } catch (e) {
      setError(e.message);
      toast.error(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce tarif ?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");
      fetchTarifs();
    } catch (e) {
      setError(e.message);
    }
  };

  const startEditing = (tarif) => {
    setEditingId(tarif._id);
    setFormData({
      name: tarif.name || "",
      description: tarif.description || "",
      items:
        tarif.items.length > 0 ? tarif.items : [{ category: "", price: "" }],
    });
  };

  return (
    <div className="price-admin">
      <h1 className="price-admin__title">Prix des Pass</h1>

      {error && <p className="price-admin__error">{error}</p>}

      <form onSubmit={handleSubmit}  className="price-admin__form">
        <h2 className="price-admin__form-title">
          {editingId ? "Modifier un tarif" : "Créer un nouveau tarif"}
        </h2>

        <label className="price-admin__label">
          Nom du Pass :
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="price-admin__input"
          />
        </label>

        <label className="price-admin__label">
          Description :
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="price-admin__textarea"
          />
        </label>

        <div className="price-admin__items">
          <h3 className="price-admin__items-title">Catégorie + prix</h3>
          {formData.items.map((item, i) => (
            <div key={i} className="price-admin__item-row">
              <input
                type="text"
                placeholder="Catégorie"
                value={item.category}
                onChange={(e) =>
                  handleItemChange(i, "category", e.target.value)
                }
                required
                className="price-admin__item-input price-admin__item-input--category"
              />
              <input
                type="number"
                placeholder="Prix"
                value={item.price}
                onChange={(e) => handleItemChange(i, "price", e.target.value)}
                required
                min={0}
                step="0.01"
                className="price-admin__item-input price-admin__item-input--price"
              />
              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="price-admin__btn price-admin__btn--remove"
                >
                  Supprimer
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="price-admin__btn price-admin__btn--add"
          >
            Ajouter un item
          </button>
        </div>

        <div className="price-admin__form-actions">
          <button
            type="submit"
            className="price-admin__btn price-admin__btn--submit"
          >
            {editingId ? "Mettre à jour" : "Créer"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  description: "",
                  items: [{ category: "", price: "" }],
                });
                setError(null);
              }}
              className="price-admin__btn price-admin__btn--cancel"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <h2 className="price-admin__list-title">Liste des tarifs</h2>
      {loading ? (
        <p className="price-admin__loading">Chargement...</p>
      ) : tarifs.length === 0 ? (
        <p className="price-admin__empty">Aucun tarif disponible</p>
      ) : (
        <ul className="price-admin__list">
          {tarifs.map((t) => (
            <li key={t._id} className="price-admin__list-item">
              <div className="price-admin__list-item-info">
                <strong className="price-admin__list-item-name">
                  {t.name}
                </strong>{" "}
                —{" "}
                <span className="price-admin__list-item-desc">
                  {t.description}
                </span>
                <ul className="price-admin__list-item-sublist">
                  {t.items.map((item, i) => (
                    <li key={i} className="price-admin__list-item-sublist-item">
                      {item.category} : {item.price} €
                    </li>
                  ))}
                </ul>
              </div>

              <div className="price-admin__list-item-actions">
                <button
                  onClick={() => startEditing(t)}
                  className="price-admin__btn price-admin__btn--edit"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="price-admin__btn price-admin__btn--delete"
                >
                  🗑 Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
