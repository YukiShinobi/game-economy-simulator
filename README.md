# Game Economy Simulator

A deterministic simulator for testing whether a game/server economy is actually balanced before putting it in front of players.

I built this around a problem I have run into with Minecraft economies: rewards are easy to add, but if you do not model the sinks, taxes and player distribution, the currency can become meaningless fast.

## It simulates

- starting player balances
- daily reward generation
- reward variance
- probability-based spending sinks
- average sink size
- passive tax/removal
- total currency supply
- median / richest / poorest balances
- inflation and concentration warnings

The simulation is seeded, so the same inputs produce the same output. That makes balancing changes testable instead of depending on random luck.

```js
import { simulateEconomy, healthSummary } from './src/index.js';

const result = simulateEconomy({ players: 250, days: 60, dailyReward: 140 });
console.log(result.final);
console.log(healthSummary(result));
```

Requires Node 20+. No runtime dependencies.

This is a modelling project, not an economy plugin. The idea is to tune the numbers here first, then feed the decisions into the real server/plugin layer.
