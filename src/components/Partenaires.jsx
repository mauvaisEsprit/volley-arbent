import { useEffect, useState } from 'react';
import '../styles/componentStyles/Partenaires.css';

export default function Partenaires() {
  const [partenaires, setPartenaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : "https://" + url;
};

  useEffect(() => {
    async function fetchPartenaires() {
      try {
        const res = await fetch('https://volleyback.onrender.com/api/partners');
        if (!res.ok) throw new Error('Ошибка при загрузке партнеров');
        const data = await res.json();
        setPartenaires(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPartenaires();
  }, []);

  if (loading) return <p>Загрузка партнеров...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="partenaires-grid">
      {partenaires.map((p) => (
        <a
          key={p._id}
          href={normalizeUrl(p.site) || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="partenaire-item"
        >
          <img src={p.logo || '/default-logo.png'} alt={p.name} className="partenaire-logo" />
          <div className="partenaire-name">{p.name}</div>
        </a>
      ))}
    </div>
  );
}
