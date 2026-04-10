export const computeDealScore = ({ savings, currentBestPrice, historicalLow, reviewScore, ratingsCount }) => {
  const savingsNum = parseFloat(savings) || 0;
  const curr = parseFloat(currentBestPrice);
  const hist = parseFloat(historicalLow);
  const review = parseFloat(reviewScore);
  const ratings = parseInt(ratingsCount, 10) || 0;

  // Discount: 0-35pts, maxes at 80% off
  const discountPts = Math.min(35, Math.round((savingsNum / 80) * 35));

  // Proximity to historical low: 0-30pts
  let proximityPts = 0;
  if (!isNaN(curr) && !isNaN(hist) && hist > 0) {
    proximityPts = curr <= hist ? 30 : Math.min(30, Math.round((hist / curr) * 30));
  }

  // Review score: 0-25pts (default 10 if unknown)
  const reviewPts = !isNaN(review) && review > 0 ? Math.round((review / 100) * 25) : 10;

  // Popularity: 0-10pts (log scale)
  const popularityPts = ratings > 0 ? Math.min(10, Math.round(Math.log10(ratings + 1) * 3)) : 3;

  const total = Math.min(100, discountPts + proximityPts + reviewPts + popularityPts);

  const getLabel = (score) => {
    if (score >= 90) return 'Exceptional Deal';
    if (score >= 75) return 'Great Deal';
    if (score >= 60) return 'Good Deal';
    if (score >= 45) return 'Fair Deal';
    if (score >= 30) return 'Mixed';
    return 'Weak Deal';
  };

  return {
    total,
    label: getLabel(total),
    breakdown: { discount: discountPts, proximity: proximityPts, review: reviewPts, popularity: popularityPts },
  };
};

export const getDealContext = (currentBestPrice, historicalLow) => {
  const curr = parseFloat(currentBestPrice);
  const hist = parseFloat(historicalLow);

  if (isNaN(curr) || isNaN(hist) || hist <= 0 || curr <= 0) return null;

  const pctAbove = ((curr - hist) / hist) * 100;

  if (pctAbove <= 2) return { type: 'excellent', icon: '🔥', message: "At or near historical low — this is the best price it's ever been." };
  if (pctAbove <= 15) return { type: 'good', icon: '✅', message: `Only ${pctAbove.toFixed(0)}% above its all-time low. Near best price.` };
  if (pctAbove <= 35) return { type: 'fair', icon: '🟡', message: `${pctAbove.toFixed(0)}% above its historical low. Decent deal, but better sales have happened.` };
  if (pctAbove <= 70) return { type: 'wait', icon: '⏳', message: `${pctAbove.toFixed(0)}% above its historical low. Consider waiting for a bigger sale.` };
  return { type: 'skip', icon: '⚠️', message: `${pctAbove.toFixed(0)}% above its historical low. Not a great time to buy.` };
};

export const getPricePrediction = (savings, currentBestPrice, historicalLow, historicalLowDate) => {
  const curr = parseFloat(currentBestPrice);
  const hist = parseFloat(historicalLow);
  const savingsNum = parseFloat(savings) || 0;

  const daysSinceLow = historicalLowDate
    ? Math.floor((Date.now() - new Date(historicalLowDate).getTime()) / 86400000)
    : null;

  if (!isNaN(curr) && !isNaN(hist) && curr <= hist * 1.05) {
    return { icon: '📉', label: 'At historical low', detail: "Prices don't get lower than this.", trend: 'low' };
  }
  if (savingsNum > 70) {
    return { icon: '⏳', label: 'Deep sale — act fast', detail: 'Heavy discounts usually end abruptly. Price may rise when the promotion ends.', trend: 'rising' };
  }
  if (daysSinceLow !== null && daysSinceLow < 90) {
    return { icon: '🔥', label: 'Recently hit its lowest price', detail: 'This game reached its all-time low within the last 3 months.', trend: 'stable' };
  }
  if (savingsNum < 20) {
    return { icon: '📈', label: 'Likely to drop further', detail: 'Small discounts often signal a larger sale is coming.', trend: 'dropping' };
  }
  if (daysSinceLow !== null && daysSinceLow > 365) {
    return { icon: '📉', label: 'Trending downward', detail: 'Best price in over a year — and it could keep falling.', trend: 'dropping' };
  }
  return { icon: '➡️', label: 'Price has been stable', detail: 'No strong trend detected. Could go either way.', trend: 'stable' };
};
