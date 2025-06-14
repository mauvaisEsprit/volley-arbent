import { useEffect, useState } from "react";
import PartenairesForm from "./PartenairesForm";
import "../../styles/componentStyles/PartenairesAdmin.css";

export default function PartenairesAdmin() {
  const [partners, setPartners] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchPartners = async () => {
    try {
      const res = await fetch("https://volleyback.onrender.com/api/partners");
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error("Erreur lors du chargement des partenaires", err);
    }
  };

  const normalizeUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : "https://" + url;
  };

  useEffect(() => {
    fetchPartners();
  }, []);

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
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  // Открыть форму
  const openForm = () => setShowForm(true);
  // Закрыть форму
  const closeForm = () => setShowForm(false);

  return (
    <section className="partners-admin container">
      <h2 className="section-title">Gestion des partenaires</h2>
      <button onClick={openForm}> + Ajouter un partenaire</button>

      {/* Показываем форму, если showForm = true */}
      {showForm && (
        <PartenairesForm
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
            <div>
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
            <button onClick={() => deletePartner(partner._id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
