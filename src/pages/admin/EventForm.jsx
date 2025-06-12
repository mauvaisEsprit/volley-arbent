import { useState } from "react";
import "../../styles/componentStyles/EventForm.css";
import { FaCalendarPlus } from "react-icons/fa";

export default function EventForm({ initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    start: initialData.start
      ? new Date(initialData.start).toISOString().slice(0, 16)
      : "",
    end: initialData.end
      ? new Date(initialData.end).toISOString().slice(0, 16)
      : "",
    image: initialData.image || "",
    type: initialData.type || "", // Добавляем поле type
    description: initialData.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSave = {
      ...formData,
      start: new Date(formData.start),
      end: new Date(formData.end),
    };

    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSave),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка при сохранении");
        return res.json();
      })
      .then((savedEvent) => {
        console.log("Событие сохранено", savedEvent);
        setFormData({
          title: "",
          start: "",
          end: "",
          image: "",
          type: "",
          description: "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Ошибка при отправке данных на сервер");
      });
  };

  return (
    <>
      <h2 className="section-title">
        <FaCalendarPlus className="section-icon" />
        Ajouter un événement
      </h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <input
          className="event-form-input"
          type="text"
          name="title"
          placeholder="Titre de l'événement"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <select
          className="event-form-select"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Choisir le type d'événement
          </option>
          <option value="match">Match</option>
          <option value="tournoi">Tournoi</option>
          <option value="soiree">Soirée</option>
          <option value="autre">Autre</option>
        </select>

        <input
          className="event-form-input"
          type="datetime-local"
          name="start"
          value={formData.start}
          onChange={handleChange}
          required
        />
        <input
          className="event-form-input"
          type="datetime-local"
          name="end"
          value={formData.end}
          onChange={handleChange}
          required
        />
        <input
          className="event-form-input"
          type="text"
          name="image"
          placeholder="URL de l'image"
          value={formData.image}
          onChange={handleChange}
        />
        <textarea
          className="event-form-textarea"
          name="description"
          placeholder="Description / Détails"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button className="event-form-button" type="submit">
          Enregistrer
        </button>
      </form>
    </>
  );
}
