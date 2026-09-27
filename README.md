<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=200&text=GAME%20ECONOMY%20SIMULATOR&fontAlignY=38&desc=REWARDS%20%E2%80%A2%20SINKS%20%E2%80%A2%20INFLATION&descAlignY=58&color=0:050505,55:202020,100:5a1616&fontColor=f5f5f5&descColor=d4d4d4" width="100%" />

![Simulation](https://img.shields.io/badge/model-seeded%20simulation-111111?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-20%2B-2b2b2b?style=for-the-badge&logo=nodedotjs)
![Tests](https://img.shields.io/badge/tests-node:test-7a1f1f?style=for-the-badge)

**A deterministic model for testing whether a game economy survives its own reward loop.**

</div>

---

## Why I built it

Rewards are easy to add. The harder part is making sure currency still means something after weeks of player activity.

This project lets me test rewards, sinks, taxes and wealth distribution before those numbers reach a live server.

## It simulates

- starting balances
- daily reward generation
- reward variance
- probability-based spending sinks
- average sink size
- passive tax/removal
- total currency supply
- median / richest / poorest balances
- inflation and concentration warnings

The simulation is seeded, so the same inputs produce the same output.

```js
import { simulateEconomy, healthSummary } from './src/index.js';

const result = simulateEconomy({ players: 250, days: 60, dailyReward: 140 });
console.log(result.final);
console.log(healthSummary(result));
```

## Test

```bash
npm test
```

Requires Node 20+. No runtime dependencies.

## Boundary

This is a modelling project, not an economy plugin. The point is to tune decisions here, then feed better numbers into the real server/plugin layer.

---

<div align="center"><sub>YukiShinobi // balance the economy before players break it for you.</sub></div>
