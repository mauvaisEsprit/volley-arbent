import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/pageStyles/EventDetail.css";

export default function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://volleyback.onrender.com/api/events/${slug}`);
        if (!res.ok) throw new Error("Erreur réseau");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setError("Impossible de charger l’événement", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <p>Chargement…</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>Événement introuvable.</p>;

  return (
    <section className="event-detail container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <h1>{event.title}</h1>
      <p>
        {new Date(event.start).toLocaleString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        —{" "}
        {new Date(event.end).toLocaleString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      {event.image && <img src={event.image} alt={event.title} />}
      <p>{event.description}</p>
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Retour
      </button>
    </section>
  );
}
