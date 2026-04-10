import React from 'react';
import { useParams } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import PageContainer from '../components/layout/PageContainer';
import GameHero from '../components/game/GameHero';
import PricePanel from '../components/game/PricePanel';
import StoreOffersList from '../components/game/StoreOffersList';
import GameStatsCard from '../components/game/GameStatsCard';

const GameDetailsPage = () => {
  const { id } = useParams();

  const mockGame = {
    id,
    title: 'Cyberpunk 2077',
    image: 'https://placehold.co/600x400',
    description: 'A futuristic open-world RPG with action and neon chaos.',
    salePrice: '29.99',
    normalPrice: '59.99',
    savings: '50',
    genre: 'Action RPG',
    publisher: 'CD Projekt Red',
    reviewScore: '86',
    releaseDate: '2020-12-10',
  };

  const mockOffers = [
    { id: 1, store: 'Steam', price: '29.99' },
    { id: 2, store: 'Green Man Gaming', price: '27.49' },
    { id: 3, store: 'Humble Store', price: '28.99' },
  ];

  return (
    <AppShell>
      <PageContainer>
        <div className="game-details-page">
          <GameHero game={mockGame} />

          <div className="game-details-grid">
            <PricePanel game={mockGame} />
            <GameStatsCard game={mockGame} />
          </div>

          <StoreOffersList offers={mockOffers} />
        </div>
      </PageContainer>
    </AppShell>
  );
};

export default GameDetailsPage;