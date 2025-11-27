<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n/useI18n'

const { t, locale, toggleLocale } = useI18n()

const links = computed(() => [
  { label: t('navHome'), href: '/' },
  { label: t('navGenerator'), href: '/generator' },
])
</script>

<template>
  <header :class="$style.header">
    <div :class="$style.brand">
      <span :class="$style.dot" />
      <span :class="$style.name">Scaletive</span>
    </div>
    <nav :class="$style.nav">
      <RouterLink v-for="link in links" :key="link.href" :to="link.href" :class="$style.navLink">
        {{ link.label }}
      </RouterLink>
    </nav>
    <div :class="$style.actions">
      <button :class="$style.lang" @click="toggleLocale">
        {{ locale === 'en' ? 'KO' : 'EN' }}
      </button>
      <RouterLink to="/generator" :class="$style.cta">{{ t('ctaGenerate') }}</RouterLink>
    </div>
  </header>
</template>

<style module lang="scss">
@use '@/styles/_tokens.scss' as *;
@use '@/styles/_mixins.scss' as mixins;

.header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $space-3 $space-4;
  margin: $space-3 auto 0;
  max-width: 1200px;
  background: rgba(15, 17, 21, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: $radius-lg;
  box-shadow: $shadow-soft;
  backdrop-filter: blur(16px);
}

.brand {
  display: flex;
  align-items: center;
  gap: $space-2;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, $color-primary, $color-accent-magenta);
  box-shadow: 0 0 20px rgba(94, 240, 193, 0.55);
}

.name {
  font-size: 18px;
}

.nav {
  display: flex;
  align-items: center;
  gap: $space-3;

  @include mixins.mq(sm) {
    display: none;
  }
}

.navLink {
  color: $color-muted;
  font-size: 14px;
  padding: $space-2;
  border-radius: $radius-sm;
  transition: color 120ms ease, background 120ms ease;

  &:hover {
    color: $color-text;
    background: rgba(255, 255, 255, 0.04);
  }
}

.cta {
  padding: $space-2 $space-4;
  background: linear-gradient(135deg, $color-primary, $color-accent-blue);
  color: #0c0f14;
  font-weight: 700;
  border-radius: $radius-pill;
  box-shadow: 0 12px 30px rgba(94, 240, 193, 0.35);
  transition: transform 120ms ease, box-shadow 120ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 34px rgba(110, 179, 255, 0.35);
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: $space-2;
}

.lang {
  padding: $space-2 $space-3;
  border-radius: $radius-pill;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: $color-text;
  cursor: pointer;
}
</style>
