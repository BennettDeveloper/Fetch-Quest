import { API } from '../constants/api';
import { STORE_MAP } from '../constants/stores';

export const fetchFeaturedDeals = async () => {
  const response = await fetch(
    `${API.CHEAPSHARK_BASE}${API.ENDPOINTS.DEALS}?pageSize=12`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch featured deals.');
  }

  const data = await response.json();

  return data.map((deal) => {
    const store = STORE_MAP[deal.storeID];

    return {
      id: deal.gameID,
      title: deal.title,
      image: deal.thumb,
      salePrice: deal.salePrice,
      normalPrice: deal.normalPrice,
      savings: Number(deal.savings).toFixed(0),
      store: store?.name || "Unknown Store",
      storeLogo: store?.logo || null
    };
  });
};