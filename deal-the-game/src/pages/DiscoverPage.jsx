import React, { useEffect, useState } from 'react';
import AppShell from '../components/layout/AppShell';
import PageContainer from '../components/layout/PageContainer';
import FeaturedDealsSection from '../components/discover/FeaturedDealsSection';
import FiltersPanel from '../components/discover/FiltersPanel';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { fetchFeaturedDeals } from '../api/dealsApi';
import { fetchStores } from '../api/storesApi';

const DiscoverPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        setError('');

        const storesMap = await fetchStores();
        const deals = await fetchFeaturedDeals(storesMap);

        setGames(deals);
      } catch (err) {
        setError('Failed to load featured deals.');
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  return (
    <AppShell>
      <PageContainer>
        <div className="discover-layout">
          <FiltersPanel />

          <div className="discover-content">
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && <FeaturedDealsSection games={games} />}
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
};

export default DiscoverPage;