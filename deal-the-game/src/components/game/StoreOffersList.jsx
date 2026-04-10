import React from 'react';

const StoreOffersList = ({ offers = [] }) => {
  return (
    <section className="store-offers-list">
      <h2>Compare Prices</h2>
      <h3 className="offers-subtitle">
  Compare prices across stores
</h3>

      <div className="offers-list">
        {offers.map((offer) => (
          <div className="offer-card">
  <div className="offer-left">
    <h4>{offer.store}</h4>
    <p className="offer-price">${offer.price}</p>
    <small>Retail: ${offer.retailPrice} • Save {offer.savings}%</small>
  </div>

  <a
    href={`https://www.cheapshark.com/redirect?dealID=${offer.dealID}`}
    target="_blank"
    rel="noreferrer"
    className="offer-button"
  >
    Shop Now
  </a>
</div>
        ))}
      </div>
    </section>
  );
};

export default StoreOffersList;