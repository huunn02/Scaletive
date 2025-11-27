import { computed } from 'vue'
import { messages, type Locale, type MessageKey } from './messages'
import { useLocaleStore } from '@/store/useLocaleStore'

export function useI18n() {
  const localeStore = useLocaleStore()
  const locale = computed(() => localeStore.locale)

  const t = (key: MessageKey) => messages[localeStore.locale][key]
  const setLocale = (value: Locale) => localeStore.setLocale(value)
  const toggleLocale = () => setLocale(localeStore.locale === 'en' ? 'ko' : 'en')

  return {
    t,
    locale,
    setLocale,
    toggleLocale,
  }
}
