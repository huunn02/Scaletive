<script setup lang="ts">
import { computed, onMounted } from 'vue'
import PreviewCanvas from '@/components/generator/PreviewCanvas.vue'
import QuotaBadge from '@/components/generator/QuotaBadge.vue'
import { useGeneratorStore } from '@/store/useGeneratorStore'
import { useI18n } from '@/i18n/useI18n'

const gen = useGeneratorStore()
const svgMarkup = computed(() => gen.currentSvg)
const { t } = useI18n()

onMounted(() => {
  gen.refreshQuota()
})
</script>

<template>
  <section :class="$style.hero">
    <div :class="$style.heroText">
      <p :class="$style.eyebrow">{{ t('heroEyebrow') }}</p>
      <h1 v-html="t('heroTitle').replace('\n', '<br />')" />
      <p :class="$style.sub">
        {{ t('heroLead') }}
      </p>
      <div :class="$style.heroActions">
        <RouterLink to="/generator" :class="$style.primary">{{ t('ctaGenerate') }}</RouterLink>
        <QuotaBadge :used="gen.quota.used" :limit="gen.quota.limit" :resetAt="gen.quota.resetAt" />
      </div>
      <ul :class="$style.points">
        <li>{{ t('point1') }}</li>
        <li>{{ t('point2') }}</li>
        <li>{{ t('point3') }}</li>
      </ul>
    </div>
    <div :class="$style.heroPreview">
      <PreviewCanvas :svgMarkup="svgMarkup" />
    </div>
  </section>
</template>

<style module src="@/views/LandingPage.module.scss" lang="scss"></style>
