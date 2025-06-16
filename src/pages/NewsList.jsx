import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/pageStyles/NewsList.css";
import Images from "../components/Images";
import Hero from '../assets/photo.avif'; // Assuming you have a photo.avif in the assets folder

const NEWS_PER_PAGE = 6;

const NewsList = () => {
  const location = useLocation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("https://volleyback.onrender.com/api/news");
        if (!res.ok) throw new Error("Erreur de chargement des actualités");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les actualités.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleLinkClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isNew = (dateStr) => {
    const daysSince = (Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24);
    return daysSince <= 3;
  };

  const totalPages = Math.ceil(news.length / NEWS_PER_PAGE);
  const paginatedNews = news.slice(
    (currentPage - 1) * NEWS_PER_PAGE,
    currentPage * NEWS_PER_PAGE
  );

  return (
    <>
      <Images images={Hero} text="Actualités" buttonText="Découvrir" />
      <section className="news-list">
        <div className="news-list__container">
          <h1 className="news-list__title">Actualités du club</h1>

          {loading && <p>Chargement...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && news.length === 0 && (
            <p>Aucune actualité trouvée.</p>
          )}

          <div className="news-list__items">
            {paginatedNews.map((item) => (
              <div className="news-card" key={item.slug}>
                <Link
                  to={`/news/${item.slug}`}
                  onClick={(e) => handleLinkClick(e, `/news/${item.slug}`)}
                  className="news-card__link"
                >
                  {item.image && (
                    <div className="news-card__image-wrapper">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="news-card__image"
                      />
                      {isNew(item.createdAt) && (
                        <span className="news-card__badge">NOUVEAU</span>
                      )}
                    </div>
                  )}
                  <div className="news-card__content">
                    <h2 className="news-card__title">{item.title}</h2>
                    <p className="news-card__date">
                      {new Date(item.createdAt).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </p>
                    <p className="news-card__excerpt">
                      {item.excerpt || item.content?.slice(0, 100) + "..."}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`pagination__button ${
                    i + 1 === currentPage ? "active" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default NewsList;
