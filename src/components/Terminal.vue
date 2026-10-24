<script setup>
defineProps({
  title:   { type: String, default: 'terminal@dev:~$' },
  color:   { type: String, default: '#00F5A0' },
  noPad:   { type: Boolean, default: false },
})
</script>

<template>
  <div class="glass-card rounded-sm overflow-hidden" :class="noPad ? '' : ''">
    <!-- Title bar -->
    <div class="flex items-center gap-3 px-4 py-2 border-b border-primary/10 bg-black/30">
      <!-- Traffic dots -->
      <span class="w-2.5 h-2.5 rounded-full bg-red-500/70" />
      <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
      <span class="w-2.5 h-2.5 rounded-full bg-green-500/70" />
      <span class="ml-2 font-pixel text-[9px] text-muted tracking-wider">{{ title }}</span>
      <span class="ml-auto blink font-pixel text-[9px]" :style="{ color }">_</span>
    </div>
    <!-- Content -->
    <div :class="noPad ? '' : 'p-5'">
      <slot />
    </div>
  </div>
</template>
