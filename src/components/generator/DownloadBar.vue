<script setup lang="ts">
import { ref } from 'vue'
import { copySvg, downloadPng, downloadSvg } from '@/lib/exporter'

const props = defineProps<{
  svgMarkup: string
}>()

const status = ref('')

async function handleSvg() {
  downloadSvg(props.svgMarkup)
  status.value = 'SVG saved'
  clearStatus()
}

async function handlePng() {
  await downloadPng(props.svgMarkup)
  status.value = 'PNG saved'
  clearStatus()
}

async function handleCopy() {
  await copySvg(props.svgMarkup)
  status.value = 'SVG copied'
  clearStatus()
}

function clearStatus() {
  window.setTimeout(() => (status.value = ''), 1600)
}
</script>

<template>
  <div :class="$style.bar" id="export">
    <div :class="$style.actions">
      <button :class="$style.primary" @click="handleSvg">Download SVG</button>
      <button :class="$style.secondary" @click="handlePng">Download PNG</button>
      <button :class="$style.ghost" @click="handleCopy">Copy SVG code</button>
    </div>
    <div :class="$style.note">
      <span>Local only · nothing leaves the browser</span>
      <span v-if="status" :class="$style.status">{{ status }}</span>
    </div>
  </div>
</template>

<style module lang="scss">
@use '@/styles/_tokens.scss' as *;
@use '@/styles/_mixins.scss' as mixins;

.bar {
  margin-top: $space-4;
  padding: $space-4;
  border-radius: $radius-lg;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  box-shadow: $shadow-soft;
  display: flex;
  flex-direction: column;
  gap: $space-3;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
}

.primary,
.secondary,
.ghost {
  padding: $space-2 $space-4;
  border-radius: $radius-pill;
  border: none;
  cursor: pointer;
  font-weight: 700;
}

.primary {
  background: linear-gradient(135deg, $color-primary, $color-accent-blue);
  color: #0c0f14;
}

.secondary {
  background: rgba(255, 255, 255, 0.06);
  color: $color-text;
}

.ghost {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: $color-text;
}

.note {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $color-muted;
  gap: $space-2;

  @include mixins.mq(sm) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.status {
  color: $color-primary;
  font-weight: 700;
}
</style>
