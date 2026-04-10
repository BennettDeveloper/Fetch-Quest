import { API } from '../constants/api';

const dealsCache = new Map();

export const fetchFeaturedDeals = async (storesMap = {}, params = {}, pageNumber = 0) => {
  const searchParams = new URLSearchParams({
    pageSize: 20,
    sortBy: 'DealRating',
    pageNumber,
    ...params,
  });

  const cacheKey = searchParams.toString();
  if (dealsCache.has(cacheKey)) {
    return dealsCache.get(cacheKey);
  }

  const response = await fetch(
    `${API.CHEAPSHARK_BASE}${API.ENDPOINTS.DEALS}?${searchParams}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch featured deals.');
  }

  const totalPages = parseInt(response.headers.get('X-Total-Page-Count') || '1', 10);
  const data = await response.json();

  const deals = data.map((deal) => ({
    id: deal.gameID,
    dealId: deal.dealID,
    title: deal.title,
    image: deal.thumb,
    salePrice: deal.salePrice,
    normalPrice: deal.normalPrice,
    savings: Number(deal.savings).toFixed(0),
    dealRating: parseFloat(deal.dealRating).toFixed(1),
    store: storesMap[deal.storeID]?.name || `Store #${deal.storeID}`,
  }));

  const result = { deals, totalPages };
  dealsCache.set(cacheKey, result);
  return result;
};

export const searchDealsByTitle = async (title, storesMap = {}, pageNumber = 0) => {
  const searchParams = new URLSearchParams({
    title,
    pageSize: 24,
    pageNumber,
  });

  const response = await fetch(
    `${API.CHEAPSHARK_BASE}${API.ENDPOINTS.DEALS}?${searchParams}`
  );

  if (!response.ok) {
    throw new Error('Failed to search for games.');
  }

  const totalPages = parseInt(response.headers.get('X-Total-Page-Count') || '1', 10);
  const data = await response.json();

  const deals = data.map((deal) => ({
    id: `${deal.gameID}-${deal.storeID}-${deal.dealID}`,
    gameId: deal.gameID,
    title: deal.title,
    image: deal.thumb,
    salePrice: deal.salePrice,
    normalPrice: deal.normalPrice,
    savings: Number(deal.savings).toFixed(0),
    store: storesMap[deal.storeID]?.name || `Store #${deal.storeID}`,
  }));

  return { deals, totalPages };
};