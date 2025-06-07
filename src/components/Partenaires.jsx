import partenaires from '../data/partenaires';
import '../styles/componentStyles/Partenaires.css';

export default function Partenaires() {
  return (
    <div className="partenaires-grid">
      {partenaires.map((p, index) => (
        <div key={index} className="partenaire-item">
          <img src={p.logo} alt={p.nom} className="partenaire-logo" />
          <div className="partenaire-name">{p.nom}</div>
        </div>
      ))}
    </div>
  );
}
