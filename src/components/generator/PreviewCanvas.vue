<script setup lang="ts">
defineProps<{
  svgMarkup: string
}>()
</script>

<template>
  <div :class="$style.preview">
    <div :class="$style.surface">
      <div :class="$style.frame" v-html="svgMarkup" />
    </div>
    <p :class="$style.meta">Preview · SVG 1920 × 1080</p>
  </div>
</template>

<style module lang="scss">
@use '@/styles/_tokens.scss' as *;
@use '@/styles/_mixins.scss' as mixins;

.preview {
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

.surface {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: $radius-lg;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(94, 240, 193, 0.08), rgba(110, 179, 255, 0.08));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: $shadow-card;
}

.frame {
  width: 100%;
  height: 100%;
  transform: scale(1);
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.meta {
  margin: 0;
  color: $color-muted;
}
</style>
