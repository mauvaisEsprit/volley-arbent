import { useParams, useNavigate } from "react-router-dom";
import newsData from "../data/newsData";
import "../styles/pageStyles/NewsDetail.css";

const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = newsData.find((item) => item.slug === slug);

  if (!article) {
    return <div className="news-detail__not-found">Article introuvable</div>;
  }

  return (
    <>
      <section className="news-detail">
          <button
            className="news-detail__back-button"
            onClick={() => navigate(-1)} // возвращаемся на предыдущую страницу
          >
            ← Retour
          </button>
        <div className="news-detail__container">
          <h1 className="news-detail__title">{article.title}</h1>
          <p className="news-detail__date">{article.date}</p>
          <img src={article.image} alt={article.title} className="news-detail__image" />
          <div className="news-detail__content">
            {article.content.split("\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
          <button
            className="news-detail__back-button"
            onClick={() => navigate(-1)} // возвращаемся на предыдущую страницу
          >
            ← Retour
          </button>
      </section>
    </>
  );
};

export default NewsDetail;
