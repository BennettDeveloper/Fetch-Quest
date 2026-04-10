import { Link } from 'react-router-dom';

const AlternativesSection = ({ gameTitle, alternatives = [], loading }) => {
  if (!loading && alternatives.length === 0) return null;

  return (
    <section className="alternatives-section">
      <h2 className="alternatives-title">
        If you like <em>{gameTitle}</em>, try these cheaper alternatives on sale now
      </h2>

      {loading ? (
        <p className="alternatives-loading">Finding similar games on deal…</p>
      ) : (
        <div className="alternatives-grid">
          {alternatives.map((alt) => (
            <Link to={`/game/${alt.id}`} key={alt.id} className="alt-card">
              <img src={alt.image} alt={alt.title} className="alt-card-image" />
              <div className="alt-card-info">
                <h3 className="alt-card-title">{alt.title}</h3>
                <span className="alt-card-store">{alt.store}</span>
                {alt.metacritic && (
                  <span className="alt-card-meta">Metacritic: {alt.metacritic}</span>
                )}
              </div>
              <div className="alt-card-prices">
                <span className="alt-card-normal">${alt.normalPrice}</span>
                <span className="alt-card-sale">${alt.salePrice}</span>
                <span className="alt-card-badge">-{alt.savings}%</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default AlternativesSection;
