import { API } from '../constants/api';
import { fetchRawgMetadataByTitle, fetchRawgSimilarGames } from './rawgApi';

export const fetchGameById = async (gameId, storesMap = {}) => {
  const response = await fetch(
    `${API.CHEAPSHARK_BASE}${API.ENDPOINTS.GAME}?id=${gameId}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch game details.');
  }

  const data = await response.json();

  const info = data.info || {};
  const cheapestPriceEver = data.cheapestPriceEver || {};
  const deals = data.deals || [];

  let rawgMetadata = null;

  try {
    rawgMetadata = await fetchRawgMetadataByTitle(info.title || '');
  } catch (error) {
    console.error('RAWG metadata fetch failed:', error);
  }

  const currentBestPrice =
    deals.length > 0
      ? Math.min(...deals.map((d) => parseFloat(d.price))).toFixed(2)
      : null;

  return {
    id: gameId,
    title: rawgMetadata?.title || info.title || 'Unknown Game',
    image:
      rawgMetadata?.backgroundImage ||
      info.thumb ||
      'https://placehold.co/600x400?text=No+Image',
    normalPrice: deals[0]?.retailPrice || 'N/A',
    currentBestPrice,
    historicalLow: cheapestPriceEver.price || null,
    historicalLowDate: cheapestPriceEver.date
      ? new Date(cheapestPriceEver.date * 1000).toLocaleDateString()
      : null,
    // kept for backward compat
    salePrice: cheapestPriceEver.price || 'N/A',
    cheapestPriceDate: cheapestPriceEver.date
      ? new Date(cheapestPriceEver.date * 1000).toLocaleDateString()
      : 'Unknown',
    description:
      rawgMetadata?.description ||
      'Track live pricing, compare store offers, and find the best current deal.',
    genre: rawgMetadata?.genres?.join(', ') || 'Unknown',
    genreSlugs: rawgMetadata?.genreSlugs || [],
    publisher: rawgMetadata?.publishers?.join(', ') || 'Unknown',
    developer: rawgMetadata?.developers?.join(', ') || 'Unknown',
    platforms: rawgMetadata?.platforms?.join(', ') || 'Unknown',
    reviewScore: rawgMetadata?.metacritic || 'N/A',
    releaseDate: rawgMetadata?.released || 'Unknown',
    rawgId: rawgMetadata?.rawgId || null,
    ratingsCount: rawgMetadata?.ratingsCount || 0,
    offers: deals.map((deal) => ({
      id: deal.dealID,
      store: storesMap[deal.storeID]?.name || `Store #${deal.storeID}`,
      price: deal.price,
      retailPrice: deal.retailPrice,
      savings: Number(deal.savings).toFixed(0),
      dealID: deal.dealID,
    })),
  };
};

export const fetchGameAlternatives = async (rawgId, genreSlugs, normalPrice, storesMap = {}) => {
  if (!rawgId || !genreSlugs?.length) return [];

  try {
    const similar = await fetchRawgSimilarGames(genreSlugs, rawgId);
    const maxPrice = parseFloat(normalPrice);

    const results = await Promise.allSettled(
      similar.slice(0, 6).map(async (rawgGame) => {
        const response = await fetch(
          `${API.CHEAPSHARK_BASE}/deals?title=${encodeURIComponent(rawgGame.name)}&pageSize=1&sortBy=Price`
        );
        if (!response.ok) return null;
        const deals = await response.json();
        if (!deals.length) return null;

        const deal = deals[0];
        const salePrice = parseFloat(deal.salePrice);
        if (!isNaN(maxPrice) && salePrice >= maxPrice) return null;

        return {
          id: deal.gameID,
          title: deal.title,
          image: rawgGame.background_image || deal.thumb,
          salePrice: deal.salePrice,
          normalPrice: deal.normalPrice,
          savings: Number(deal.savings).toFixed(0),
          store: storesMap[deal.storeID]?.name || `Store #${deal.storeID}`,
          metacritic: rawgGame.metacritic,
        };
      })
    );

    return results
      .filter((r) => r.status === 'fulfilled' && r.value !== null)
      .map((r) => r.value)
      .slice(0, 4);
  } catch (e) {
    return [];
  }
};
