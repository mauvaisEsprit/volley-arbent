import React from "react";
import '../../styles/componentStyles/NewsList.css';

export default function NewsList({ news }) {
  if (!news || news.length === 0) {
    return <p>Aucune actualité disponible.</p>;
  }

  return (
    <div className="news-list">
      {news.map(({ slug, title, date, image, content }) => (
        <div key={slug} className="news-item">
          {image && <img src={image} alt={title} className="news-image" />}
          <div className="news-info">
            <h3 className="news-title">{title}</h3>
            <p className="news-date">{new Date(date).toLocaleDateString("fr-FR")}</p>
            <p className="news-content">{content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
