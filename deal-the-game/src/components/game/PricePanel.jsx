import React from 'react';

const PricePanel = ({ game }) => {
  return (
    <section className="price-panel">
      <h2>Price Snapshot</h2>
      <p className="current-price">${game.salePrice}</p>
      <p className="retail-price">Current retail: ${game.normalPrice}</p>
      <p className="discount-percent">Historical low date: {game.cheapestPriceDate}</p>
      <p className="discount-percent">Available offers: {game.offers.length}</p>
    </section>
  );
};

export default PricePanel;