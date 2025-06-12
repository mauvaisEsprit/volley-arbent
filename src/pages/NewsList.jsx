import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/pageStyles/NewsList.css";
import Images from "../components/Images";
import Hero from "../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif";

const NewsList = () => {
  const location = useLocation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/news");
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
      e.preventDefault(); // Уже на этой странице
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
            {news.map((item) => (
              <div className="news-card" key={item.slug}>
                <Link
                  to={`/news/${item.slug}`}
                  onClick={(e) => handleLinkClick(e, `/news/${item.slug}`)}
                  className="news-card__link"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="news-card__image"
                    />
                  )}
                  <div className="news-card__content">
                    <h2 className="news-card__title">{item.title}</h2>
                    <p className="news-card__date">
                      {new Date(item.date).toLocaleString("fr-FR", {
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
        </div>
      </section>
    </>
  );
};

export default NewsList;
