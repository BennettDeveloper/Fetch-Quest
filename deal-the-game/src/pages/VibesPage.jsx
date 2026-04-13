import { useState } from 'react';
import AppShell from '../components/layout/AppShell';
import PageContainer from '../components/layout/PageContainer';
import MoodSelector from '../components/vibes/MoodSelector';
import VibesResults from '../components/vibes/VibesResults';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { fetchVibesResults } from '../api/gamesApi';
import { fetchStores } from '../api/storesApi';

const VibesPage = () => {
  const [activeMood, setActiveMood] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMoodSelect = async (mood) => {
    if (activeMood?.id === mood.id) return;

    setActiveMood(mood);
    setResults([]);
    setError('');
    setLoading(true);

    try {
      const storesMap = await fetchStores();
      const data = await fetchVibesResults(mood.genres, mood.tags, storesMap);
      setResults(data);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <PageContainer>
        <div className="vibes-page">
          <div className="vibes-header">
            <h1 className="vibes-title">What's Your Vibe?</h1>
            <p className="vibes-subtitle">
              Pick a mood and we'll find game deals that match the feeling.
            </p>
          </div>

          <MoodSelector activeMood={activeMood?.id} onSelect={handleMoodSelect} />

          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && activeMood && results.length >= 0 && (
            <VibesResults results={results} mood={activeMood} />
          )}

          {!activeMood && !loading && (
            <p className="vibes-prompt">Select a mood above to get started.</p>
          )}
        </div>
      </PageContainer>
    </AppShell>
  );
};

export default VibesPage;
