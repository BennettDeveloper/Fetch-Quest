import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import PageContainer from '../components/layout/PageContainer';
import GameHero from '../components/game/GameHero';
import PricePanel from '../components/game/PricePanel';
import StoreOffersList from '../components/game/StoreOffersList';
import GameStatsCard from '../components/game/GameStatsCard';
import GameDescriptionCard from '../components/game/GameDescriptionCard';
import PlatformTabs from '../components/game/PlatformTabs';
import SectionTabs from '../components/game/SectionTabs';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { fetchGameById } from '../api/gamesApi';
import { fetchStores } from '../api/storesApi';

const GameDetailsPage = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        setError('');

        const storesMap = await fetchStores();
        const gameData = await fetchGameById(id, storesMap);

        setGame(gameData);
      } catch (err) {
        setError('Failed to load game details.');
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [id]);

  return (
    <AppShell>
      <PageContainer>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && game && (
          <div className="game-details-page">
            <PlatformTabs game={game} />
            <GameHero game={game} />
            <SectionTabs />

            <div className="game-content-layout">
              <div className="game-main-column">
                <StoreOffersList offers={game.offers} />
                <GameDescriptionCard description={game.description} />
              </div>

              <div className="game-side-column">
                <PricePanel game={game} />
                <GameStatsCard game={game} />
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </AppShell>
  );
};

export default GameDetailsPage;