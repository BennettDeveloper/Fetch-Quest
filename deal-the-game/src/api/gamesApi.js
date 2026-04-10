import { API } from '../constants/api';

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

  return {
    id: gameId,
    title: info.title || 'Unknown Game',
    image: info.thumb || 'https://placehold.co/600x400?text=No+Image',
    salePrice: cheapestPriceEver.price || 'N/A',
    normalPrice: deals[0]?.retailPrice || 'N/A',
    description: 'Game details pulled from CheapShark.',
    genre: 'Unknown',
    publisher: 'Unknown',
    reviewScore: 'N/A',
    releaseDate: 'Unknown',
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