import { ref, computed } from 'vue'
import { translations } from '../data/translations.js'

const currentLang = ref(localStorage.getItem('portfolio_lang') || 'en')
if (typeof document !== 'undefined') {
  document.documentElement.lang = currentLang.value
}

export function useI18n() {
  function setLang(lang) {
    if (lang === 'en' || lang === 'th') {
      currentLang.value = lang
      localStorage.setItem('portfolio_lang', lang)
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang
      }
    }
  }

  function toggleLang() {
    setLang(currentLang.value === 'en' ? 'th' : 'en')
  }

  const isEn = computed(() => currentLang.value === 'en')
  const isTh = computed(() => currentLang.value === 'th')
  const t = computed(() => translations[currentLang.value] || translations.en)

  return {
    lang: currentLang,
    isEn,
    isTh,
    setLang,
    toggleLang,
    t,
  }
}
