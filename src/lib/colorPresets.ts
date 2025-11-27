export type ColorPresetKey = 'neon' | 'pastel' | 'mono' | 'retro' | 'duotone' | 'vibrant'

export const colorPresets: Record<ColorPresetKey, string[]> = {
  neon: ['#6ffff0', '#2ecbf1', '#7a5bff', '#ff5dc8'],
  pastel: ['#9cd7f8', '#ffd4e3', '#d6f3b8', '#f8f0c4'],
  mono: ['#11151f', '#1d2433', '#2b3446', '#5ef0c1'],
  retro: ['#ff9f1c', '#e71d36', '#011627', '#2ec4b6'],
  duotone: ['#0b132b', '#1c2541', '#5bc0be', '#f0f3bd'],
  vibrant: ['#ff5a5f', '#fca311', '#2a9d8f', '#4cc9f0'],
}

export const defaultPalette = colorPresets.vibrant

export function getPresetPalette(key: ColorPresetKey) {
  return colorPresets[key] ?? defaultPalette
}

export function randomPresetKey(): ColorPresetKey {
  const keys = Object.keys(colorPresets) as ColorPresetKey[]
  return keys[Math.floor(Math.random() * keys.length)] ?? 'vibrant'
}
