<script setup lang="ts">
import { computed } from 'vue'
import SectionShell from '@/components/layout/SectionShell.vue'
import ControlPanel from '@/components/generator/ControlPanel.vue'
import DownloadBar from '@/components/generator/DownloadBar.vue'
import PackCarousel from '@/components/generator/PackCarousel.vue'
import PreviewCanvas from '@/components/generator/PreviewCanvas.vue'
import { useGeneratorStore } from '@/store/useGeneratorStore'
import { useI18n } from '@/i18n/useI18n'

const gen = useGeneratorStore()
const svgMarkup = computed(() => gen.currentSvg)
const packItems = computed(() => gen.packResults)
const { t } = useI18n()
</script>

<template>
  <SectionShell
    id="templates"
    :title="t('generatorTitle')"
    :subtitle="t('generatorSubtitle')"
  >
    <div :class="$style.generatorGrid">
      <ControlPanel />
      <PreviewCanvas :svgMarkup="svgMarkup" />
    </div>
    <DownloadBar :svgMarkup="svgMarkup" />
    <PackCarousel :items="packItems" />
  </SectionShell>
</template>

<style module src="@/views/GeneratorPage.module.scss" lang="scss"></style>
