export const fetchGameById = async (gameId) => {
  const response = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch game details.');
  }

  return response.json();
};