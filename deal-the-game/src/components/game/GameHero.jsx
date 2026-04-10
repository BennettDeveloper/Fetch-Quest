const GameHero = ({ game }) => {
  const shortDescription =
    game.description && game.description.length > 200
      ? `${game.description.slice(0, 200)}...`
      : game.description;

  const savings =
    game.currentBestPrice && game.normalPrice
      ? (
          ((parseFloat(game.normalPrice) - parseFloat(game.currentBestPrice)) /
            parseFloat(game.normalPrice)) *
          100
        ).toFixed(0)
      : null;

  return (
    <section className="game-hero-card">
      <div className="game-hero-media">
        <div className="game-hero-image-wrapper">
          <img src={game.image} alt={game.title} className="game-hero-image" />
        </div>
      </div>

      <div className="game-hero-main">
        <h1>{game.title}</h1>

        <div className="game-meta-row">
          <span className="meta-pill">PC</span>
          {game.genre && game.genre !== 'Unknown' && (
            <span className="meta-pill">{game.genre}</span>
          )}
          {game.reviewScore && game.reviewScore !== 'N/A' && (
            <span className="meta-pill">Metacritic: {game.reviewScore}</span>
          )}
          {game.releaseDate && game.releaseDate !== 'Unknown' && (
            <span className="meta-pill">{game.releaseDate}</span>
          )}
        </div>

        <p className="game-hero-summary">
          {shortDescription ||
            'Track live pricing, compare store offers, and find the best current deal.'}
        </p>
      </div>

      <aside className="game-hero-side">
        <div className="hero-price-box">
          <div className="hero-price-section">
            <h3>Retail Price</h3>
            <p className="hero-retail-price">${game.normalPrice}</p>
          </div>

          <div className="hero-price-divider" />

          <div className="hero-price-section">
            <h3>Best Deal Now</h3>
            <p className="hero-sale-price">
              {game.currentBestPrice ? `$${game.currentBestPrice}` : 'N/A'}
            </p>
            {savings && (
              <p className="hero-savings-badge">-{savings}% off</p>
            )}
          </div>

          <div className="hero-price-divider" />

          <div className="hero-price-section">
            <h3>Historical Low</h3>
            <p className="hero-hist-price">${game.historicalLow ?? game.salePrice}</p>
            {game.historicalLowDate && (
              <p className="hero-price-date">Lowest recorded {game.historicalLowDate}</p>
            )}
          </div>
        </div>
      </aside>
    </section>
  );
};

export default GameHero;
