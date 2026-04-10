import React from 'react';
import SectionHeader from '../common/SectionHeader';
import GamesGrid from './GamesGrid';

const FeaturedDealsSection = ({ games }) => {
  return (
    <section className="featured-deals-section">
      <SectionHeader
        title="Featured Deals"
        subtitle="Find the hottest game discounts across the web."
      />
      <GamesGrid games={games} />
    </section>
  );
};

export default FeaturedDealsSection;