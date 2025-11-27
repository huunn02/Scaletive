<script setup lang="ts">
import { computed } from 'vue'
import { useGeneratorStore } from '@/store/useGeneratorStore'
import type { ColorPresetKey } from '@/lib/colorPresets'
import type { TemplateKey } from '@/lib/templates'

const gen = useGeneratorStore()

const templates: { label: string; value: TemplateKey }[] = [
  { label: 'Wave', value: 'wave' },
  { label: 'Blob', value: 'blob' },
  { label: 'Gradient', value: 'gradient' },
  { label: 'Mesh', value: 'mesh' },
  { label: 'Pattern', value: 'pattern' },
  { label: 'Noise', value: 'noise' },
]

const presets: { label: string; value: ColorPresetKey }[] = [
  { label: 'Vibrant', value: 'vibrant' },
  { label: 'Neon', value: 'neon' },
  { label: 'Pastel', value: 'pastel' },
  { label: 'Mono', value: 'mono' },
  { label: 'Retro', value: 'retro' },
  { label: 'Duotone', value: 'duotone' },
]

const quotaLeft = computed(() => gen.quotaLeft)

function handleGenerate() {
  gen.bumpSeed()
  gen.consumeQuota()
}

function handleRandomize() {
  gen.randomizeAll()
  gen.consumeQuota()
}

function handlePack() {
  gen.generatePack()
}
</script>

<template>
  <div :class="$style.panel" id="generator">
    <div :class="$style.row">
      <div>
        <p :class="$style.label">Template</p>
        <div :class="$style.buttonGrid">
          <button
            v-for="tpl in templates"
            :key="tpl.value"
            :class="[$style.chip, gen.template === tpl.value && $style.active]"
            @click="gen.setTemplate(tpl.value)"
          >
            {{ tpl.label }}
          </button>
        </div>
      </div>
      <div>
        <p :class="$style.label">Color mood</p>
        <div :class="$style.buttonGrid">
          <button
            v-for="preset in presets"
            :key="preset.value"
            :class="[$style.chip, gen.preset === preset.value && $style.active]"
            @click="gen.setPreset(preset.value)"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
    </div>

    <div :class="$style.controls">
      <div>
        <p :class="$style.label">Gradient angle</p>
        <input
          type="range"
          min="0"
          max="360"
          :value="gen.options.angle"
          @input="gen.updateOption({ angle: Number(($event.target as HTMLInputElement).value) })"
        />
      </div>
      <div>
        <p :class="$style.label">Blob count</p>
        <input
          type="range"
          min="3"
          max="12"
          :value="gen.options.blobCount"
          @input="gen.updateOption({ blobCount: Number(($event.target as HTMLInputElement).value) })"
        />
      </div>
      <div>
        <p :class="$style.label">Pattern density</p>
        <input
          type="range"
          min="0.2"
          max="1"
          step="0.05"
          :value="gen.options.density"
          @input="gen.updateOption({ density: Number(($event.target as HTMLInputElement).value) })"
        />
      </div>
      <label :class="$style.toggle">
        <input type="checkbox" :checked="gen.options.grain" @change="gen.updateOption({ grain: ($event.target as HTMLInputElement).checked })" />
        <span>Add grain</span>
      </label>
    </div>

    <div :class="$style.actions">
      <div :class="$style.quota">Daily quota: {{ quotaLeft }} left</div>
      <div :class="$style.actionButtons">
        <button :class="$style.secondary" @click="handleRandomize">Surprise me</button>
        <button :class="$style.primary" @click="handleGenerate">Generate</button>
        <button :class="$style.secondary" @click="handlePack">Create 5-pack</button>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@use '@/styles/_tokens.scss' as *;
@use '@/styles/_mixins.scss' as mixins;

.panel {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: $radius-lg;
  padding: $space-5;
  box-shadow: $shadow-soft;
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $space-4;

  @include mixins.mq(md) {
    grid-template-columns: 1fr;
  }
}

.label {
  margin: 0 0 $space-2;
  color: $color-muted;
  font-size: 14px;
}

.buttonGrid {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
}

.chip {
  padding: $space-2 $space-3;
  border-radius: $radius-pill;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: $color-text;
  cursor: pointer;
  transition: all 120ms ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.18);
  }
}

.active {
  background: linear-gradient(135deg, rgba(94, 240, 193, 0.14), rgba(110, 179, 255, 0.12));
  border-color: rgba(94, 240, 193, 0.65);
}

.controls {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: $space-4;
  align-items: center;

  @include mixins.mq(md) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include mixins.mq(sm) {
    grid-template-columns: 1fr;
  }

  input[type='range'] {
    width: 100%;
  }
}

.toggle {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  color: $color-text;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $space-3;

  @include mixins.mq(sm) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.quota {
  color: $color-muted;
}

.actionButtons {
  display: flex;
  gap: $space-2;
  flex-wrap: wrap;
}

.primary {
  padding: $space-2 $space-4;
  border-radius: $radius-pill;
  border: none;
  background: linear-gradient(135deg, $color-primary, $color-accent-blue);
  color: #0c0f14;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(94, 240, 193, 0.35);
}

.secondary {
  padding: $space-2 $space-3;
  border-radius: $radius-pill;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: $color-text;
  cursor: pointer;
}
</style>
