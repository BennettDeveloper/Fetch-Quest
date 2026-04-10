import { useEffect, useState } from 'react';
import AppShell from '../components/layout/AppShell';
import PageContainer from '../components/layout/PageContainer';
import DealPresets from '../components/discover/DealPresets';
import GamesGrid from '../components/discover/GamesGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { fetchFeaturedDeals } from '../api/dealsApi';
import { fetchStores } from '../api/storesApi';

const PLATFORMS = [
  { id: 'pc', label: 'PC', active: true },
  { id: 'xbox', label: 'Xbox', active: false },
  { id: 'playstation', label: 'PlayStation', active: false },
  { id: 'switch', label: 'Switch', active: false },
];

const DiscoverPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activePreset, setActivePreset] = useState('best');
  const [presetParams, setPresetParams] = useState({ sortBy: 'DealRating' });

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        setError('');
        const storesMap = await fetchStores();
        const deals = await fetchFeaturedDeals(storesMap, presetParams);
        setGames(deals);
      } catch (err) {
        setError('Failed to load deals.');
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, [presetParams]);

  const handlePresetSelect = (id, params) => {
    setActivePreset(id);
    setPresetParams(params);
  };

  return (
    <AppShell>
      <PageContainer>
        <div className="discover-page">
          <div className="platform-tabs-bar">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                className={`platform-tab-btn${p.active ? ' active' : ' inactive'}`}
                disabled={!p.active}
              >
                {p.label}
              </button>
            ))}
          </div>

          <DealPresets activePreset={activePreset} onSelect={handlePresetSelect} />

          <div className="discover-main">
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && <GamesGrid games={games} />}
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
};

export default DiscoverPage;
