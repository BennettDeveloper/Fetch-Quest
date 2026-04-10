import React from 'react';

const PricePanel = ({ game }) => {
  return (
    <section className="price-panel">
      <h2>Best Current Price</h2>
      <p className="current-price">${game.salePrice}</p>
      <p className="retail-price">Retail: ${game.normalPrice}</p>
      <p className="discount-percent">Save {game.savings}%</p>
    </section>
  );
};

export default PricePanel;