<script setup lang="ts">
import { downloadSvg } from '@/lib/exporter'

export interface PackItem {
  id: number
  svg: string
}

const { items } = defineProps<{
  items: PackItem[]
}>()

function downloadItem(item: PackItem) {
  downloadSvg(item.svg, `scaletive-pack-${item.id}`)
}
</script>

<template>
  <div v-if="items.length" :class="$style.wrapper">
    <div :class="$style.header">
      <h3>Pack previews</h3>
      <span>{{ items.length }} generated</span>
    </div>
    <div :class="$style.grid">
      <article v-for="item in items" :key="item.id" :class="$style.card">
        <div v-html="item.svg" />
        <button :class="$style.button" @click="downloadItem(item)">Download SVG</button>
      </article>
    </div>
  </div>
</template>

<style module lang="scss">
@use '@/styles/_tokens.scss' as *;
@use '@/styles/_mixins.scss' as mixins;

.wrapper {
  margin-top: $space-4;
  padding: $space-4;
  border-radius: $radius-lg;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $space-3;

  h3 {
    margin: 0;
  }

  span {
    color: $color-muted;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: $space-3;
}

.card {
  border-radius: $radius-md;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: $space-2;

  > div {
    aspect-ratio: 16 / 9;
    width: 100%;
    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}

.button {
  margin: 0 $space-3 $space-3;
  padding: $space-2;
  border-radius: $radius-pill;
  border: none;
  background: rgba(255, 255, 255, 0.06);
  color: $color-text;
  cursor: pointer;
}
</style>
