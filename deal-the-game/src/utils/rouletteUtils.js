const LAST_PICK_KEY = 'roulette_last_pick';

/**
 * Picks a mostly-random game.
 * - Dedupes duplicate store listings for the same game
 * - Avoids the last picked game when possible
 * - Gives only a very small preference to stronger deals
 */
export const pickRandomDeal = (deals) => {
  if (!deals?.length) return null;

  const lastPickId = sessionStorage.getItem(LAST_PICK_KEY);

  // Step 1: dedupe by game identity
  // Prefer gameID if available, otherwise fall back to title
  const uniqueGamesMap = new Map();

  for (const deal of deals) {
    const key = String(deal.gameID ?? deal.id ?? deal.title).toLowerCase();

    const existing = uniqueGamesMap.get(key);

    // Keep the "better" version of the same game
    if (!existing) {
      uniqueGamesMap.set(key, deal);
      continue;
    }

    const existingSavings = parseFloat(existing.savings) || 0;
    const currentSavings = parseFloat(deal.savings) || 0;

    if (currentSavings > existingSavings) {
      uniqueGamesMap.set(key, deal);
    }
  }

  const uniqueGames = Array.from(uniqueGamesMap.values());

  // Step 2: repeat protection
  const candidates =
    uniqueGames.length > 1
      ? uniqueGames.filter((d) => String(d.gameID ?? d.id) !== lastPickId)
      : uniqueGames;

  // Step 3: build a lightly biased bag
  // Every game gets 1 entry.
  // Games with decent savings get only 1 extra entry.
  const bag = [];

  for (const deal of candidates) {
    bag.push(deal);

    const savings = parseFloat(deal.savings) || 0;
    const salePrice = parseFloat(deal.salePrice) || Infinity;
    const normalPrice = parseFloat(deal.normalPrice) || Infinity;

    const hasRealDeal =
      savings >= 25 || (isFinite(salePrice) && isFinite(normalPrice) && salePrice < normalPrice);

    if (hasRealDeal) {
      bag.push(deal);
    }
  }

  // Step 4: random pick from bag
  const pick = bag[Math.floor(Math.random() * bag.length)];

  sessionStorage.setItem(LAST_PICK_KEY, String(pick.gameID ?? pick.id));
  return pick;
};