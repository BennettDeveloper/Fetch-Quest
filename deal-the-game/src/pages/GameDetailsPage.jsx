import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import PageContainer from '../components/layout/PageContainer';
import GameHero from '../components/game/GameHero';
import StoreOffersList from '../components/game/StoreOffersList';
import GameStatsCard from '../components/game/GameStatsCard';
import GameDescriptionCard from '../components/game/GameDescriptionCard';
import SectionTabs from '../components/game/SectionTabs';
import DealScoreCard from '../components/game/DealScoreCard';
import DealContextCard from '../components/game/DealContextCard';
import PricePredictionCard from '../components/game/PricePredictionCard';
import AlternativesSection from '../components/game/AlternativesSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { fetchGameById, fetchGameAlternatives } from '../api/gamesApi';
import { fetchStores } from '../api/storesApi';

const GameDetailsPage = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [alternatives, setAlternatives] = useState([]);
  const [altLoading, setAltLoading] = useState(false);

  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        setError('');
        setAlternatives([]);

        const storesMap = await fetchStores();
        const gameData = await fetchGameById(id, storesMap);
        setGame(gameData);

        if (gameData.rawgId && gameData.genreSlugs?.length) {
          setAltLoading(true);
          fetchGameAlternatives(
            gameData.rawgId,
            gameData.genreSlugs,
            gameData.normalPrice,
            storesMap
          )
            .then((alts) => setAlternatives(alts))
            .finally(() => setAltLoading(false));
        }
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
            <GameHero game={game} />
            <SectionTabs />

            <div className="game-content-layout">
              <div className="game-main-column">
                <StoreOffersList offers={game.offers} />
                <GameDescriptionCard description={game.description} />
                <AlternativesSection
                  gameTitle={game.title}
                  alternatives={alternatives}
                  loading={altLoading}
                />
              </div>

              <div className="game-side-column">
                <DealScoreCard game={game} />
                <DealContextCard game={game} />
                <PricePredictionCard game={game} />
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
