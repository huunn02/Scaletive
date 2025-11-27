<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main class="app-shell">
    <RouterView />
    <AppFooter />
  </main>
</template>
