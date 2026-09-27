import test from 'node:test';
import assert from 'node:assert/strict';
import { simulateEconomy, healthSummary } from '../src/index.js';

test('simulation is deterministic with the same seed', () => {
  const a = simulateEconomy({ players: 20, days: 5, seed: 7 });
  const b = simulateEconomy({ players: 20, days: 5, seed: 7 });
  assert.deepEqual(a.history, b.history);
});

test('supply accounting remains non-negative', () => {
  const result = simulateEconomy({ players: 10, days: 10 });
  assert.ok(result.final.totalSupply >= 0);
  assert.ok(result.minted >= result.final.totalSupply);
});

test('health summary returns usable metrics', () => {
  const summary = healthSummary(simulateEconomy({ players: 25, days: 7 }));
  assert.equal(typeof summary.inflation, 'number');
  assert.equal(typeof summary.warning, 'string');
});
