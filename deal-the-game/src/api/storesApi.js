import { API } from '../constants/api';

let cachedStoresMap = null;

export const fetchStores = async () => {
  if (cachedStoresMap) {
    return cachedStoresMap;
  }

  const response = await fetch(`${API.CHEAPSHARK_BASE}${API.ENDPOINTS.STORES}`);

  if (!response.ok) {
    throw new Error('Failed to fetch stores.');
  }

  const data = await response.json();

  const storesMap = data.reduce((acc, store) => {
    acc[store.storeID] = {
      id: store.storeID,
      name: store.storeName,
      isActive: store.isActive,
      images: store.images,
    };
    return acc;
  }, {});

  cachedStoresMap = storesMap;
  return storesMap;
};