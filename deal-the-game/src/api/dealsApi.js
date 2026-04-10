import { API } from '../constants/api';

export const fetchFeaturedDeals = async (storesMap = {}) => {
  const response = await fetch(
    `${API.CHEAPSHARK_BASE}${API.ENDPOINTS.DEALS}?pageSize=12`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch featured deals.');
  }

  const data = await response.json();

  return data.map((deal) => ({
    id: deal.gameID,
    title: deal.title,
    image: deal.thumb,
    salePrice: deal.salePrice,
    normalPrice: deal.normalPrice,
    savings: Number(deal.savings).toFixed(0),
    store: storesMap[deal.storeID]?.name || `Store #${deal.storeID}`,
  }));
};

export const searchDealsByTitle = async (title, storesMap = {}) => {
  const response = await fetch(
    `${API.CHEAPSHARK_BASE}${API.ENDPOINTS.DEALS}?title=${encodeURIComponent(title)}&pageSize=24`
  );

  if (!response.ok) {
    throw new Error('Failed to search for games.');
  }

  const data = await response.json();

  return data.map((deal) => ({
    id: `${deal.gameID}-${deal.storeID}-${deal.dealID}`,
    gameId: deal.gameID,
    title: deal.title,
    image: deal.thumb,
    salePrice: deal.salePrice,
    normalPrice: deal.normalPrice,
    savings: Number(deal.savings).toFixed(0),
    store: storesMap[deal.storeID]?.name || `Store #${deal.storeID}`,
  }));
};