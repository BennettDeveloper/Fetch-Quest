import React from 'react';

const PricePanel = ({ game }) => {
  return (
    <section className="price-panel">
      <h2>Best Historical Price</h2>
      <p className="current-price">${game.salePrice}</p>
      <p className="retail-price">Current Retail: ${game.normalPrice}</p>
      <p className="discount-percent">Historical low date: {game.cheapestPriceDate}</p>
    </section>
  );
};

export default PricePanel;