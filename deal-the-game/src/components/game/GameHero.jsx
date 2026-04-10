import React from 'react';

const GameHero = ({ game }) => {
  const shortDescription =
    game.description && game.description.length > 160
      ? `${game.description.slice(0, 160)}...`
      : game.description;

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
          <span className="meta-pill">{game.genre}</span>
          <span className="meta-pill">Metacritic: {game.reviewScore}</span>
        </div>

        <p className="game-hero-summary">
          {shortDescription || 'Track live pricing, compare store offers, and find the best current deal.'}
        </p>
      </div>

      <aside className="game-hero-side">
        <div className="hero-price-box">
          <div className="hero-price-section">
            <h3>Current Price</h3>
            <p className="hero-retail-price">${game.normalPrice}</p>
          </div>

          <div className="hero-price-divider" />

          <div className="hero-price-section">
            <h3>Historical Low</h3>
            <p className="hero-sale-price">${game.salePrice}</p>
            <p className="hero-price-date">Lowest recorded on {game.cheapestPriceDate}</p>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default GameHero;