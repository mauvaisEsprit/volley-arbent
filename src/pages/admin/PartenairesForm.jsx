import { useState } from "react";
import "../../styles/componentStyles/PartenairesForm.css";

export default function PartenairesForm({ onSave, onClose }) {
  const [data, setData] = useState({ name: "", logo: "", site: "", type: "sponsor" });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(
        "https://volleyback.onrender.com/api/partners",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error();
      await res.json();

      if (onSave) onSave();
      setData({ name: "", logo: "", site: "", type: "sponsor" });
    } catch {
      alert("Erreur lors de l’enregistrement");
    } finally {
      setSaving(false);
    }
  };

  // Закрыть по клику на оверлей (если надо)
  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  // Чтобы клик по форме не закрывал модалку
  const handleFormClick = (e) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <form className="partner-form" onClick={handleFormClick} onSubmit={handleSubmit}>
        <h3>Ajouter un partenaire</h3>

        <input
          name="name"
          placeholder="Nom"
          value={data.name}
          onChange={handleChange}
          required
        />
        <input
          name="logo"
          placeholder="URL logo"
          value={data.logo}
          onChange={handleChange}
          required
        />
        <input
          name="site"
          placeholder="Site web"
          value={data.site}
          onChange={handleChange}
        />
        <select name="type" value={data.type} onChange={handleChange}>
          <option value="sponsor">Sponsor</option>
          <option value="pub">Publicité</option>
        </select>

        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
          <button type="button" onClick={onClose}>Annuler</button>
        </div>
      </form>
    </div>
  );
}
