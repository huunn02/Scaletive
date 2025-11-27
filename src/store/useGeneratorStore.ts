import { defineStore } from 'pinia'
import { defaultPalette, getPresetPalette, randomPresetKey, type ColorPresetKey } from '@/lib/colorPresets'
import { consumeQuota, endOfDay, loadQuota, type QuotaState } from '@/lib/quota'
import { nextSeed } from '@/lib/random'
import { buildSvg, defaultTemplateOptions, type TemplateKey, type TemplateOptions } from '@/lib/templates'

type GeneratorOptions = Omit<TemplateOptions, 'palette'>

interface GeneratedItem {
  id: number
  svg: string
  seed: number
  template: TemplateKey
}

const DEFAULT_LIMIT = 20

export const useGeneratorStore = defineStore('generator', {
  state: () => ({
    template: 'wave' as TemplateKey,
    palette: defaultPalette.slice(),
    preset: 'vibrant' as ColorPresetKey,
    options: {
      seed: nextSeed(),
      angle: defaultTemplateOptions.angle,
      blobCount: defaultTemplateOptions.blobCount,
      density: defaultTemplateOptions.density,
      grain: defaultTemplateOptions.grain,
    } as GeneratorOptions,
    packSize: 5,
    packResults: [] as GeneratedItem[],
    quota: loadQuota(DEFAULT_LIMIT),
  }),
  getters: {
    currentSvg(state) {
      return buildSvg(state.template, state.palette, { ...state.options })
    },
    quotaLeft(state) {
      return Math.max(state.quota.limit - state.quota.used, 0)
    },
  },
  actions: {
    setTemplate(template: TemplateKey) {
      this.template = template
    },
    setPreset(preset: ColorPresetKey) {
      this.preset = preset
      this.palette = getPresetPalette(preset).slice()
    },
    setPalette(palette: string[]) {
      this.palette = palette
    },
    updateOption(partial: Partial<GeneratorOptions>) {
      this.options = { ...this.options, ...partial }
    },
    randomizeAll() {
      const randomTemplate = pickTemplate()
      const preset = randomPresetKey()
      this.template = randomTemplate
      this.setPreset(preset)
      this.bumpSeed()
    },
    bumpSeed() {
      this.options.seed = nextSeed()
    },
    generatePack() {
      const items: GeneratedItem[] = []
      for (let i = 0; i < this.packSize; i += 1) {
        const seed = nextSeed()
        const svg = buildSvg(this.template, this.palette, { ...this.options, seed })
        items.push({
          id: seed,
          svg,
          seed,
          template: this.template,
        })
      }
      this.packResults = items
      this.consumeQuota(Math.max(1, Math.ceil(this.packSize / 2)))
      return items
    },
    refreshQuota() {
      const fresh = loadQuota(DEFAULT_LIMIT)
      this.quota = fresh
    },
    consumeQuota(count = 1) {
      this.quota = consumeQuota(this.quota, count)
    },
    resetQuota(limit = DEFAULT_LIMIT) {
      const reset: QuotaState = { used: 0, limit, resetAt: endOfDay() }
      this.quota = reset
    },
  },
})

function pickTemplate(): TemplateKey {
  const list: TemplateKey[] = ['wave', 'blob', 'gradient', 'mesh', 'pattern', 'noise']
  return list[Math.floor(Math.random() * list.length)] ?? 'wave'
}
