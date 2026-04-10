import { API } from '../constants/api';
import { fetchRawgMetadataByTitle } from './rawgApi';

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

  return {
    id: gameId,
    title: rawgMetadata?.title || info.title || 'Unknown Game',
    image:
      rawgMetadata?.backgroundImage ||
      info.thumb ||
      'https://placehold.co/600x400?text=No+Image',
    salePrice: cheapestPriceEver.price || 'N/A',
    normalPrice: deals[0]?.retailPrice || 'N/A',
    description:
      rawgMetadata?.description ||
      'Track live pricing, compare store offers, and find the best current deal.',
    genre: rawgMetadata?.genres?.join(', ') || 'Unknown',
    publisher: rawgMetadata?.publishers?.join(', ') || 'Unknown',
    developer: rawgMetadata?.developers?.join(', ') || 'Unknown',
    platforms: rawgMetadata?.platforms?.join(', ') || 'Unknown',
    reviewScore: rawgMetadata?.metacritic || 'N/A',
    releaseDate: rawgMetadata?.released || 'Unknown',
    cheapestPriceDate: cheapestPriceEver.date
      ? new Date(cheapestPriceEver.date * 1000).toLocaleDateString()
      : 'Unknown',
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