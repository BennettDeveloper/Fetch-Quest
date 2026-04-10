import React from 'react';

const StoreOffersList = ({ offers = [] }) => {
  return (
    <section className="store-offers-list">
      <h2>Store Offers</h2>

      <div className="offers-list">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <div>
              <h4>{offer.store}</h4>
              <p>${offer.price}</p>
              <small>Retail: ${offer.retailPrice} • Save {offer.savings}%</small>
            </div>

            <a
              href={`https://www.cheapshark.com/redirect?dealID=${offer.dealID}`}
              target="_blank"
              rel="noreferrer"
              className="offer-link-button"
            >
              View Deal
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoreOffersList;