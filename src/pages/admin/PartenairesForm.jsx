import { useState, useEffect } from "react";
import "../../styles/componentStyles/PartenairesForm.css";
import { toast } from "react-toastify";

/**
 * Formulaire (dans une modale) pour créer OU modifier un partenaire.
 * - Si `partner` est undefined/null → mode création (POST)
 * - Si `partner` est défini         → mode édition   (PUT)
 */
export default function PartenairesForm({ partner = null, onSave, onClose }) {
  /* ─────────────────────────────── State */
  const buildInitial = (p) =>
    p
      ? {
          name: p.name || "",
          logo: p.logo || "",
          site: p.site || "",
          type: p.type || "sponsor",
        }
      : { name: "", logo: "", site: "", type: "sponsor" };

  const [data, setData] = useState(buildInitial(partner));
  const [saving, setSaving] = useState(false);

  /* ─────────────────────────────── Sync prop → state */
  useEffect(() => {
    setData(buildInitial(partner));
  }, [partner]);

  /* ─────────────────────────────── Handlers */
  const handleChange = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const method = partner ? "PUT" : "POST";
    const url = partner
      ? `https://volleyback.onrender.com/api/partners/${partner._id}`
      : "https://volleyback.onrender.com/api/partners";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      await res.json();

      onSave?.();
      toast.success(`Partenaire ${partner ? "modifié" : "ajouté"} avec succès`);
    } catch {
      alert("Erreur lors de l'enregistrement");
      toast.error("Erreur lors de l'enregistrement du partenaire");
    } finally {
      setSaving(false);
    }
  };

  /* ─────────────────────────────── Overlay */
  const handleOverlayClick = () => onClose?.();
  const stopPropagation = (e) => e.stopPropagation();

  /* ─────────────────────────────── Render */
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <form className="partner-form" onClick={stopPropagation} onSubmit={handleSubmit}>
        <h3>{partner ? "Modifier le partenaire" : "+ Ajouter un partenaire"}</h3>

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
          <button type="button" onClick={onClose}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
