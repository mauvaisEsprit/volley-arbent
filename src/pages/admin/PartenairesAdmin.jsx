import { useEffect, useState } from "react";
import PartenairesForm from "./PartenairesForm";
import "../../styles/componentStyles/PartenairesAdmin.css";
import { toast } from "react-toastify";

export default function PartenairesAdmin() {
  // ─────────────────────────────── State
  const [partners, setPartners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null); // null = create, object = edit

  // ─────────────────────────────── Helpers
  const normalizeUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : "https://" + url;
  };

  // ─────────────────────────────── CRUD
  const fetchPartners = async () => {
    try {
      const res = await fetch("https://volleyback.onrender.com/api/partners");
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error("Erreur lors du chargement des partenaires", err);
    }
  };

  const deletePartner = async (id) => {
    if (!window.confirm("Supprimer ce partenaire ?")) return;
    try {
      const res = await fetch(
        `https://volleyback.onrender.com/api/partners/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) throw new Error();
      setPartners((prev) => prev.filter((p) => p._id !== id));
      toast.success("Partenaire supprimé avec succès");
    } catch {
      alert("Erreur lors de la suppression");
      toast.error("Erreur lors de la suppression du partenaire");
    }
  };

  // ─────────────────────────────── Modal controls
  const openFormForCreate = () => {
    setEditingPartner(null);
    setShowForm(true);
  };

  const openFormForEdit = (partner) => {
    setEditingPartner(partner);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingPartner(null);
    setShowForm(false);
  };

  // ─────────────────────────────── Init
  useEffect(() => {
    fetchPartners();
  }, []);

  // ─────────────────────────────── Render
  return (
    <section className="partners-admin container">
      <h2 className="section-title">Gestion des partenaires</h2>

      <button onClick={openFormForCreate} className="btn-primary">
        + Ajouter un partenaire
      </button>

      {showForm && (
        <PartenairesForm
          partner={editingPartner}
          onSave={() => {
            fetchPartners();
            closeForm();
          }}
          onClose={closeForm}
        />
      )}

      <div className="partners-list">
        {partners.map((partner) => (
          <div key={partner._id} className="partner-card">
            <img src={partner.logo} alt={partner.name} />

            <div className="partner-info">
              <strong>{partner.name}</strong>
              <p>Type: {partner.type}</p>
              {partner.site && (
                <a
                  href={normalizeUrl(partner.site)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {partner.site}
                </a>
              )}
            </div>

            <div className="partner-actions">
              <button className="edit-buttonPartners" onClick={() => openFormForEdit(partner)}>✏️ Modifier</button>
              <button className="delete-buttonPartners" onClick={() => deletePartner(partner._id)}>🗑️ Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
