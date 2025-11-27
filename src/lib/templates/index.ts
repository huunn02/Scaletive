import { jitter, pick, createRng } from '../random'

export type TemplateKey = 'wave' | 'blob' | 'gradient' | 'mesh' | 'pattern' | 'noise'

export interface TemplateOptions {
  seed: number
  palette: string[]
  angle: number
  blobCount: number
  density: number
  grain: boolean
}

const WIDTH = 1920
const HEIGHT = 1080

export const defaultTemplateOptions: TemplateOptions = {
  seed: 1,
  palette: ['#5ef0c1', '#6eb3ff', '#ef67f0'],
  angle: 35,
  blobCount: 6,
  density: 0.55,
  grain: false,
}

export function buildSvg(template: TemplateKey, palette: string[], overrides: Partial<TemplateOptions> = {}) {
  const opts: TemplateOptions = { ...defaultTemplateOptions, ...overrides, palette }
  const rng = createRng(opts.seed)

  switch (template) {
    case 'wave':
      return wrapSvg(buildWave(opts, rng))
    case 'blob':
      return wrapSvg(buildBlobs(opts, rng))
    case 'gradient':
      return wrapSvg(buildGradient(opts))
    case 'mesh':
      return wrapSvg(buildMesh(opts, rng))
    case 'pattern':
      return wrapSvg(buildPattern(opts, rng))
    case 'noise':
      return wrapSvg(buildNoise(opts))
    default:
      return wrapSvg(buildGradient(opts))
  }
}

function wrapSvg(content: string, defs = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Generated background">
    <defs>${defs}</defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#0f1115" />
    ${content}
  </svg>`
}

function buildGradient(opts: TemplateOptions) {
  const stops = opts.palette
    .map((color, idx) => `<stop offset="${(idx / (opts.palette.length - 1 || 1)) * 100}%" stop-color="${color}" />`)
    .join('')
  const angle = opts.angle % 360
  return `
    <linearGradient id="grad" gradientTransform="rotate(${angle})">${stops}</linearGradient>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grad)" />
  `
}

function buildWave(opts: TemplateOptions, rng: () => number) {
  const layers = Math.min(opts.palette.length, 4)
  let markup = ''
  for (let i = 0; i < layers; i += 1) {
    const color = opts.palette[i]
    const amplitude = 80 + rng() * 120
    const offsetY = HEIGHT * (0.25 + i * 0.15) + jitter(0, 40, rng)
    const path = `
      M 0 ${offsetY}
      C ${WIDTH * 0.25} ${offsetY - amplitude}, ${WIDTH * 0.45} ${offsetY + amplitude}, ${WIDTH * 0.6} ${offsetY + jitter(amplitude, amplitude * 0.5, rng)}
      S ${WIDTH * 0.95} ${offsetY - amplitude}, ${WIDTH} ${offsetY + jitter(amplitude, amplitude * 0.5, rng)}
      L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z
    `
    markup += `<path d="${path}" fill="${color}" fill-opacity="${0.4 + i * 0.2}" />`
  }
  return markup
}

function buildBlobs(opts: TemplateOptions, rng: () => number) {
  let markup = `<rect width="${WIDTH}" height="${HEIGHT}" fill="${pick(opts.palette, rng)}" />`
  for (let i = 0; i < opts.blobCount; i += 1) {
    const cx = WIDTH * rng()
    const cy = HEIGHT * rng()
    const r = 200 + rng() * 260
    const color = pick(opts.palette, rng)
    markup += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" fill-opacity="${0.25 + rng() * 0.35}" filter="url(#soften)" />`
  }

  const defs = `<filter id="soften"><feGaussianBlur stdDeviation="80" /></filter>`
  return `${defs}${markup}`
}

function buildMesh(opts: TemplateOptions, rng: () => number) {
  const ids = ['meshA', 'meshB', 'meshC']
  let defs = ''
  let content = ''

  ids.forEach((id) => {
    const color = pick(opts.palette, rng)
    const cx = WIDTH * rng()
    const cy = HEIGHT * rng()
    const r = 600 + rng() * 520
    defs += `<radialGradient id="${id}" cx="${(cx / WIDTH).toFixed(2)}" cy="${(cy / HEIGHT).toFixed(2)}" r="0.6">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>`
    content += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})" />`
  })

  return content + defs
}

function buildPattern(opts: TemplateOptions, rng: () => number) {
  const density = Math.max(0.2, Math.min(1, opts.density))
  const spacing = 60 - density * 30
  const dotSize = 6 + rng() * 6
  const stroke = pick(opts.palette, rng)
  const patternId = 'dots'
  const defs = `<pattern id="${patternId}" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse" patternTransform="rotate(${opts.angle})">
    <circle cx="${spacing / 2}" cy="${spacing / 2}" r="${dotSize / 2}" fill="${stroke}" fill-opacity="0.4"/>
  </pattern>`
  const overlay = `<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#${patternId})" />`
  const base = `<rect width="${WIDTH}" height="${HEIGHT}" fill="${pick(opts.palette, rng)}" />`
  return `${defs}${base}${overlay}`
}

function buildNoise(opts: TemplateOptions) {
  const defs = `
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.25" />
      </feComponentTransfer>
    </filter>
  `
  const gradient = buildGradient(opts)
  const overlay = `<rect width="${WIDTH}" height="${HEIGHT}" filter="url(#noise)" />`
  return `${defs}${gradient}${overlay}`
}
