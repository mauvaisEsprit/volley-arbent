import { useState } from "react";
import '../../styles/componentStyles/NewsForm.css';

export default function NewsForm({  initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    content: initialData.content || "",
    date: initialData.date
      ? new Date(initialData.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    image: initialData.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Преобразуем дату обратно в формат Date для backend
    const dataToSave = {
      ...formData,
      date: new Date(formData.date),
    };

     const token = localStorage.getItem("token");

  fetch('http://localhost:3001/api/news', { // URL твоего backend API
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
      date: new Date().toISOString().split("T")[0],
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
    <form className="news-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Titre de l'actualité"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="URL de l'image"
        value={formData.image}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="Contenu de l'actualité"
        value={formData.content}
        onChange={handleChange}
        required
      />
      <button type="submit">Publier</button>
    </form>
  );
}
