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
            </div>
            <button>View Deal</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoreOffersList;