<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  id?: string
}>()
</script>

<template>
  <section :id="id" :class="$style.section">
    <div :class="$style.header">
      <h2>{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div :class="$style.content">
      <slot />
    </div>
  </section>
</template>

<style module lang="scss">
@use '@/styles/_tokens.scss' as *;
@use '@/styles/_mixins.scss' as mixins;

.section {
  margin-top: $space-7;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: $space-3;
  margin-bottom: $space-4;

  h2 {
    margin: 0;
    font-size: 26px;
  }

  p {
    margin: 0;
    color: $color-muted;
    max-width: 520px;
  }

  @include mixins.mq(sm) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.content {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: $radius-lg;
  padding: $space-5;
  box-shadow: $shadow-soft;
}
</style>
