import { defineStore } from 'pinia'
import type { Locale } from '@/i18n/messages'

const STORAGE_KEY = 'scaletive-locale'

function loadLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === 'ko' ? 'ko' : 'en'
}

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: loadLocale(),
  }),
  actions: {
    setLocale(locale: Locale) {
      this.locale = locale
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, locale)
      }
    },
  },
})
