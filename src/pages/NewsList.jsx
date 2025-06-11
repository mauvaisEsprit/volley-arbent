import { Link, useLocation } from "react-router-dom";
import newsData from "../data/newsData";
import "../styles/pageStyles/NewsList.css";
import Images from "../components/Images";
import Hero from "../assets/4R5KFUBYIRD23OJOG4NCZ6FWEA.avif";

const NewsList = () => {
  const location = useLocation();

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
          <div className="news-list__items">
            {newsData.map((item) => (
              <div className="news-card" key={item.slug}>
                <Link
                  to={`/news/${item.slug}`}
                  onClick={(e) => handleLinkClick(e, `/news/${item.slug}`)}
                  className="news-card__link"
                >
                  <img src={item.image} alt={item.title} className="news-card__image" />
                  <div className="news-card__content">
                    <h2 className="news-card__title">{item.title}</h2>
                    <p className="news-card__date">{item.date + " - " + item.time}</p>
                    <p className="news-card__excerpt">{item.excerpt}</p>
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
