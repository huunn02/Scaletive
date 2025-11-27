import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import GeneratorPage from '@/views/GeneratorPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: LandingPage },
    { path: '/generator', name: 'generator', component: GeneratorPage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
