export function seededRandom(seed = 1) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

export function simulateEconomy({
  players = 100,
  days = 30,
  startingBalance = 500,
  dailyReward = 120,
  rewardVariance = 0.35,
  sinkChance = 0.55,
  averageSink = 90,
  taxRate = 0.03,
  seed = 42
} = {}) {
  const random = seededRandom(seed);
  const balances = Array(players).fill(startingBalance);
  const history = [];
  let minted = players * startingBalance;
  let removed = 0;

  for (let day = 1; day <= days; day += 1) {
    for (let i = 0; i < balances.length; i += 1) {
      const variance = 1 + (random() * 2 - 1) * rewardVariance;
      const reward = Math.max(0, Math.round(dailyReward * variance));
      balances[i] += reward;
      minted += reward;

      if (random() < sinkChance) {
        const spend = Math.min(balances[i], Math.round(averageSink * (0.5 + random())));
        balances[i] -= spend;
        removed += spend;
      }

      const tax = Math.floor(balances[i] * taxRate / 30);
      balances[i] -= tax;
      removed += tax;
    }

    const totalSupply = balances.reduce((sum, value) => sum + value, 0);
    const sorted = [...balances].sort((a, b) => a - b);
    history.push({
      day,
      totalSupply,
      averageBalance: Math.round(totalSupply / players),
      medianBalance: sorted[Math.floor(sorted.length / 2)],
      richestBalance: sorted.at(-1),
      poorestBalance: sorted[0],
      minted,
      removed
    });
  }

  return { config: { players, days }, balances, history, minted, removed, final: history.at(-1) };
}

export function inflationPercent(result) {
  const initial = result.config.players * 500;
  return Number((((result.final.totalSupply - initial) / initial) * 100).toFixed(2));
}

export function healthSummary(result) {
  const inflation = inflationPercent(result);
  const ratio = result.final.richestBalance / Math.max(1, result.final.medianBalance);
  return {
    inflation,
    concentrationRatio: Number(ratio.toFixed(2)),
    warning: inflation > 100 ? 'Currency supply is expanding too quickly.' : ratio > 5 ? 'Wealth concentration is high.' : 'Economy is inside the current guardrails.'
  };
}
