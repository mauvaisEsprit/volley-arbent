import { useState } from "react";
import '../../styles/componentStyles/EventForm.css';

export default function EventForm({  initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    content: initialData.content || "",
    dateStart: initialData.dateStart
      ? new Date(initialData.dateStart).toISOString().slice(0, 16)
      : "",
    dateEnd: initialData.dateEnd
      ? new Date(initialData.dateEnd).toISOString().slice(0, 16)
      : "",
    image: initialData.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSave = {
      ...formData,
      dateStart: new Date(formData.dateStart),
      dateEnd: new Date(formData.dateEnd),
    };

    const token = localStorage.getItem("token");

   fetch('https://volleyback.onrender.com/api/events', { // URL твоего backend API
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` ,
    },
    body: JSON.stringify(dataToSave), // преобразуем объект с формой в JSON
  })
  .then(res => {
    if (!res.ok) throw new Error('Ошибка при сохранении');
    return res.json();
  })
  .then(savedEvent => {
    console.log('Событие сохранено', savedEvent);
    // Очистка формы после успешной отправки
    setFormData({
    title: "",
    content: "",
    dateStart: "",
    dateEnd: "",
    image: "",
  });
    // Здесь можно обновить состояние, очистить форму, показать сообщение и т.п.
  })
  .catch(err => {
    console.error(err);
    alert('Ошибка при отправке данных на сервер');
  });
}

  return (
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
      <input
        className="event-form-input"
        type="datetime-local"
        name="dateStart"
        value={formData.dateStart}
        onChange={handleChange}
        required
      />
      <input
        className="event-form-input"
        type="datetime-local"
        name="dateEnd"
        value={formData.dateEnd}
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
        name="content"
        placeholder="Description / Détails"
        value={formData.content}
        onChange={handleChange}
        required
      />
      <button className="event-form-button" type="submit">Enregistrer</button>
    </form>
  );
}
