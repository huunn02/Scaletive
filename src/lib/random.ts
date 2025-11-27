export function createRng(seed: number) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296
    return value / 4294967296
  }
}

export function pick<T>(list: T[], rand: () => number) {
  return list[Math.floor(rand() * list.length)]
}

export function jitter(base: number, spread: number, rand: () => number) {
  const delta = (rand() - 0.5) * 2 * spread
  return base + delta
}

export function nextSeed() {
  return Math.floor(Math.random() * 1_000_000_000)
}
