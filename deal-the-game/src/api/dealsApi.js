export const fetchFeaturedDeals = async () => {
  const response = await fetch('https://www.cheapshark.com/api/1.0/deals?pageSize=12');

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
    store: deal.storeID,
  }));
};