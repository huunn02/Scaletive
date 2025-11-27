<script setup lang="ts">
defineProps<{
  used: number
  limit: number
  resetAt?: number
}>()
</script>

<template>
  <div :class="$style.badge">
    <span :class="$style.dot" />
    <span>{{ used }}/{{ limit }} today</span>
    <small v-if="resetAt">resets {{ new Date(resetAt).toLocaleTimeString() }}</small>
  </div>
</template>

<style module lang="scss">
@use '@/styles/_tokens.scss' as *;

.badge {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  padding: $space-2 $space-3;
  border-radius: $radius-pill;
  background: rgba(255, 255, 255, 0.06);
  color: $color-text;
  border: 1px solid rgba(255, 255, 255, 0.08);

  small {
    color: $color-muted;
  }
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, $color-primary, $color-accent-magenta);
}
</style>
