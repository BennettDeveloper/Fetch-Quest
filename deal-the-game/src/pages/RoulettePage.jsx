import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import PageContainer from '../components/layout/PageContainer';
import { fetchFeaturedDeals } from '../api/dealsApi';
import { fetchStores } from '../api/storesApi';
import { pickRandomDeal } from '../utils/rouletteUtils';

const ROLL_DURATION = 2000;
const PHRASE_INTERVAL = 380;

const PHRASES = [
  'Consulting the deal gods...',
  'Shuffling 40,000 deals...',
  'Bribing the algorithm...',
  'Scanning the bargain bin...',
  'Rolling the dice of destiny...',
  'Searching for your fate...',
  'Checking couch cushions for change...',
  'Negotiating with store managers...',
  'Summoning the spirit of savings...',
  'Calculating your luck...',
  'Your wallet won\'t know what hit it...',
  'Picking something worth your time...',
  'One sec, asking a wise wizard...',
  'Cross-referencing 12 spreadsheets...',
];

const RoulettePage = () => {
  const navigate = useNavigate();

  const [pick, setPick] = useState(null);
  const [phase, setPhase] = useState('rolling'); // 'rolling' | 'revealed'
  const [error, setError] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);

  const rollTimerRef = useRef(null);
  const phraseTimerRef = useRef(null);

  const fetchRandomPage = async () => {
    const storesMap = await fetchStores();
    const params = { sortBy: 'DealRating' };
    const { deals: firstPage, totalPages } = await fetchFeaturedDeals(storesMap, params, 0);
    const randomPage = Math.floor(Math.random() * totalPages);
    const { deals: fetched } =
      randomPage === 0
        ? { deals: firstPage }
        : await fetchFeaturedDeals(storesMap, params, randomPage);
    return fetched;
  };

  const roll = () => {
    setPhase('rolling');
    setError('');
    setPhraseIndex(Math.floor(Math.random() * PHRASES.length));
    clearTimeout(rollTimerRef.current);

    const minWait = new Promise((resolve) => {
      rollTimerRef.current = setTimeout(resolve, ROLL_DURATION);
    });

    Promise.all([minWait, fetchRandomPage()])
      .then(([, fetched]) => {
        setPick(pickRandomDeal(fetched));
        setPhase('revealed');
      })
      .catch(() => {
        setError('Failed to load deals. Please try again.');
        setPhase('revealed');
      });
  };

  useEffect(() => {
    roll();
    return () => {
      clearTimeout(rollTimerRef.current);
      clearInterval(phraseTimerRef.current);
    };
  }, []);

  // Cycle phrases while rolling
  useEffect(() => {
    clearInterval(phraseTimerRef.current);
    if (phase === 'rolling') {
      phraseTimerRef.current = setInterval(() => {
        setPhraseIndex((i) => (i + 1) % PHRASES.length);
      }, PHRASE_INTERVAL);
    }
    return () => clearInterval(phraseTimerRef.current);
  }, [phase]);

  const isRolling = phase === 'rolling';
  const isRevealed = phase === 'revealed';

  return (
    <AppShell>
      <PageContainer>
        <div className="roulette-page">
          <div className="roulette-header">
            <h1 className="roulette-title">Deal Roulette</h1>
            <p className="roulette-subtitle">Spin the wheel — land on a deal worth grabbing.</p>
          </div>

          {isRolling && (
            <div className="roulette-rolling-stage">
              <div className="roulette-dice roulette-dice--spinning">🎲</div>
              <p className="roulette-phrase">{PHRASES[phraseIndex]}</p>
            </div>
          )}

          {isRevealed && error && (
            <div className="roulette-error">
              <p>{error}</p>
            </div>
          )}

          {isRevealed && !error && pick && (
            <div className="roulette-reveal">
              <div className="roulette-card">
                <div className="roulette-card-image-wrap">
                  <img
                    className="roulette-card-image"
                    src={pick.image}
                    alt={pick.title}
                  />
                  <span className="roulette-card-badge">-{pick.savings}%</span>
                </div>

                <div className="roulette-card-body">
                  <span className="roulette-card-store">{pick.store}</span>
                  <h2 className="roulette-card-title">{pick.title}</h2>

                  <div className="roulette-card-prices">
                    <span className="roulette-card-normal">${pick.normalPrice}</span>
                    <span className="roulette-card-sale">${pick.salePrice}</span>
                  </div>

                  <div className="roulette-card-rating">
                    Deal Rating <strong>{pick.dealRating}</strong><span className="roulette-rating-max">&thinsp;/ 10</span>
                  </div>

                  <div className="roulette-card-actions">
                    <button className="roulette-btn-reroll" onClick={roll}>
                      🎲 Roll Again
                    </button>
                    <button
                      className="roulette-btn-view"
                      onClick={() => navigate(`/game/${pick.id}`)}
                    >
                      View Deal →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </PageContainer>
    </AppShell>
  );
};

export default RoulettePage;
