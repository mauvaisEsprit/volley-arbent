// src/pages/admin/CreneauxAdmin.jsx
import { useEffect, useState } from "react";
import "../../styles/componentStyles/CreneauxAdmin.css";

/* ────────── вспомогательные константы ────────── */
const WEEKDAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

/* ────────── основной компонент ────────── */
export default function CreneauxAdmin() {
  const [creneaux, setCreneaux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // объект, если редактируем

  /* ---------- загрузка расписания ---------- */
  const fetchCreneaux = async () => {
    try {
      const res = await fetch("https://volleyback.onrender.com/api/creneaux");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCreneaux(data);
    } catch {
      setError("Impossible de charger les créneaux");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreneaux();
  }, []);

  /* ---------- удаление ---------- */
  const deleteCreneau = async (id) => {
    if (!window.confirm("Supprimer ce créneau ?")) return;
    try {
      await fetch(`https://volleyback.onrender.com/api/creneaux/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCreneaux((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  /* ---------- сохранение (добавление или редактирование) ---------- */
  const handleSave = (saved) => {
    setCreneaux((prev) => {
      const exists = prev.some((c) => c._id === saved._id);
      return exists
        ? prev.map((c) => (c._id === saved._id ? saved : c))
        : [...prev, saved];
    });
    setShowForm(false);
    setEditing(null);
  };

  /** Приводит время "HH:mm" или Date‑строку к виду  "HH:mm" */
  function formatHeure(value) {
    if (!value) return "";
    // если пришла строка "18:00" — возвращаем как есть
    if (/^\d{1,2}:\d{2}$/.test(value)) return value;
    // иначе пробуем создать дату
    const date = new Date(value);
    if (isNaN(date)) return value;
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const handleEdit = (item) => {
    setEditing(item);
    setShowForm(true);
  };

  /* ---------- рендер ---------- */
  if (loading) return <p>Chargement…</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="creneaux-admin container">
      <h2>Gestion des créneaux d'entraînement</h2>

      <button className="btn-add" onClick={() => setShowForm(true)}>
        + Ajouter un créneau
      </button>

      <table className="creneaux-table">
        <thead>
          <tr>
            <th>Jour</th>
            <th>Heure début</th>
            <th>Heure fin</th>
            <th>Concerné</th>
            <th>Coach</th>
            <th>Lieu</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {creneaux.map((item) => (
            <tr key={item._id}>
              <td data-label="Jour">{item.weekday}</td>
              <td data-label="Heure début">
                {formatHeure(item.startTime || item.start)}
              </td>
              <td data-label="Heure fin">
                {formatHeure(item.endTime || item.end)}
              </td>
              <td data-label="Concerné">{item.concerned}</td>
              <td data-label="Coach">{item.coachName}</td>
              <td data-label="Lieu">{item.location}</td>
              <td data-label="Actions" className="actions-cell">
                <button onClick={() => handleEdit(item)}>✏️</button>
                <button onClick={() => deleteCreneau(item._id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <CreneauForm
          initial={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </section>
  );
}

/* ────────── модальная форма ────────── */
function CreneauForm({ initial, onClose, onSave }) {
  const [form, setForm] = useState(
    initial || {
      weekday: "Lundi",
      startTime: "",
      endTime: "",
      concerned: "",
      coachName: "",
      location: "",
    }
  );
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const method = initial ? "PUT" : "POST";
    const url = initial
      ? `https://volleyback.onrender.com/api/creneaux/${initial._id}`
      : "https://volleyback.onrender.com/api/creneaux";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      const saved = await res.json();
      onSave(saved);
    } catch {
      alert("Erreur lors de l’enregistrement");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form
        className="creneau-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h3>{initial ? "Modifier" : "Ajouter"} un créneau</h3>

        <label>
          Jour
          <select name="weekday" value={form.weekday} onChange={handleChange}>
            {WEEKDAYS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>

        <label>
          Heure début
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="start-time"
            required
          />
        </label>

        <label>
          Heure fin
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="end-time"
            required
          />
        </label>

        <label>
          Concerné
          <input
            type="text"
            name="concerned"
            value={form.concerned}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Coach
          <input
            type="text"
            name="coachName"
            value={form.coachName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Lieu
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </label>

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
