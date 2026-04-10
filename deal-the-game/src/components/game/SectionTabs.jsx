import React from 'react';

const SectionTabs = () => {
  return (
    <div className="section-tabs">
      <button className="section-tab active">Offers</button>
      <button className="section-tab">About</button>
      <button className="section-tab">Price History</button>
      <button className="section-tab">Similar Games</button>
    </div>
  );
};

export default SectionTabs;