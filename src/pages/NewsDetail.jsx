import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/pageStyles/NewsDetail.css";

const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`https://volleyback.onrender.com/api/news/${slug}`);
        if (!res.ok) throw new Error("Article introuvable");
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger l’article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <div className="news-detail__not-found">{error}</div>;
  if (!article)
    return <div className="news-detail__not-found">Article introuvable</div>;

  return (
    <section className="news-detail">
      <button className="news-detail__back-button" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="news-detail__container">
        <h1 className="news-detail__title">{article.title}</h1>
        <p className="news-detail__date">
          {new Date(article.date).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="news-detail__image"
          />
        )}
        <div className="news-detail__content">
          {article.content?.split("\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      <button className="news-detail__back-button" onClick={() => navigate(-1)}>
        ← Retour
      </button>
    </section>
  );
};

export default NewsDetail;
