import { API } from '../constants/api';
import { cleanGameTitle } from '../utils/cleanGameTitle';

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const buildRawgUrl = (path, params = {}) => {
  const url = new URL(`${API.RAWG_BASE}${path}`, window.location.origin);
  url.searchParams.set('key', RAWG_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

export const searchRawgGameByTitle = async (title) => {
  if (!RAWG_API_KEY) {
    throw new Error('Missing RAWG API key.');
  }

  const cleanedTitle = cleanGameTitle(title);

  const response = await fetch(
    buildRawgUrl(API.ENDPOINTS.RAWG_GAMES, {
      search: cleanedTitle,
      search_precise: true,
      page_size: 5,
    })
  );

  if (!response.ok) {
    throw new Error('Failed to search RAWG.');
  }

  const data = await response.json();
  return data.results?.[0] || null;
};

export const fetchRawgGameDetails = async (rawgGameId) => {
  if (!RAWG_API_KEY) {
    throw new Error('Missing RAWG API key.');
  }

  const response = await fetch(
    buildRawgUrl(`${API.ENDPOINTS.RAWG_GAMES}/${rawgGameId}`)
  );

  if (!response.ok) {
    throw new Error('Failed to fetch RAWG game details.');
  }

  return response.json();
};

const parsePcRequirements = (raw) => {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((line) => {
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) return null;
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      if (!value || key.toLowerCase() === 'minimum' || key.toLowerCase() === 'recommended') return null;
      return { key, value };
    })
    .filter(Boolean);
};

export const fetchRawgSimilarGames = async (genreSlugs, excludeRawgId) => {
  if (!RAWG_API_KEY || !genreSlugs?.length) return [];

  const response = await fetch(
    buildRawgUrl(API.ENDPOINTS.RAWG_GAMES, {
      genres: genreSlugs.slice(0, 2).join(','),
      ordering: '-metacritic',
      page_size: 8,
    })
  );

  if (!response.ok) return [];

  const data = await response.json();
  return (data.results || []).filter((g) => g.id !== excludeRawgId);
};

export const fetchRawgMetadataByTitle = async (title) => {
  const match = await searchRawgGameByTitle(title);

  if (!match) {
    return null;
  }

  const details = await fetchRawgGameDetails(match.id);

  const pcPlatform = details.platforms?.find(
    (p) => p.platform?.slug === 'pc' || p.platform?.name === 'PC'
  );

  return {
    rawgId: details.id,
    title: details.name || title,
    description: details.description_raw || '',
    backgroundImage: details.background_image || details.background_image_additional || '',
    released: details.released || 'Unknown',
    metacritic: details.metacritic ?? 'N/A',
    genres: details.genres?.map((genre) => genre.name) || [],
    genreSlugs: details.genres?.map((genre) => genre.slug) || [],
    publishers: details.publishers?.map((publisher) => publisher.name) || [],
    developers: details.developers?.map((developer) => developer.name) || [],
    platforms: details.platforms?.map((item) => item.platform?.name).filter(Boolean) || [],
    ratingsCount: details.ratings_count || 0,
    minRequirements: parsePcRequirements(pcPlatform?.requirements?.minimum),
    recommendedRequirements: parsePcRequirements(pcPlatform?.requirements?.recommended),
    screenshots: [],
  };
};