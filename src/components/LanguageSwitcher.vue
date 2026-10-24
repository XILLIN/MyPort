<script setup>
import { useI18n } from '../composables/useI18n'

const { lang, setLang } = useI18n()
</script>

<template>
  <div
    class="inline-flex items-center p-0.5 border border-primary/30 bg-black/60 backdrop-blur-sm rounded-xs"
    role="group"
    aria-label="Language switcher"
  >
    <button
      type="button"
      @click="setLang('en')"
      :class="[
        'px-2.5 py-1 font-pixel text-[8px] tracking-wider transition-all duration-200 cursor-pointer',
        lang === 'en'
          ? 'bg-primary text-bg font-bold glow-green'
          : 'text-muted hover:text-primary hover:bg-white/5'
      ]"
      :aria-pressed="lang === 'en'"
    >
      EN
    </button>

    <span class="text-primary/30 font-mono text-[10px] select-none px-0.5">/</span>

    <button
      type="button"
      @click="setLang('th')"
      :class="[
        'px-2.5 py-1 font-pixel text-[8px] tracking-wider transition-all duration-200 cursor-pointer',
        lang === 'th'
          ? 'bg-primary text-bg font-bold glow-green'
          : 'text-muted hover:text-primary hover:bg-white/5'
      ]"
      :aria-pressed="lang === 'th'"
    >
      TH
    </button>
  </div>
</template>
