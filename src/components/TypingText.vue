<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  strings:  { type: Array,  default: () => ['Hello World'] },
  speed:    { type: Number, default: 80 },
  deleteSpeed: { type: Number, default: 40 },
  pause:    { type: Number, default: 1800 },
  loop:     { type: Boolean, default: true },
  color:    { type: String, default: '#00F5A0' },
})

const displayed = ref('')
const showCursor = ref(true)
let timeout, si = 0, ci = 0, deleting = false

function tick() {
  const str = props.strings[si]
  if (!deleting) {
    displayed.value = str.slice(0, ++ci)
    if (ci === str.length) {
      deleting = true
      timeout = setTimeout(tick, props.pause)
      return
    }
    timeout = setTimeout(tick, props.speed)
  } else {
    displayed.value = str.slice(0, --ci)
    if (ci === 0) {
      deleting = false
      si = props.loop ? (si + 1) % props.strings.length : Math.min(si + 1, props.strings.length - 1)
      timeout = setTimeout(tick, props.speed)
      return
    }
    timeout = setTimeout(tick, props.deleteSpeed)
  }
}

onMounted(() => { timeout = setTimeout(tick, 500) })
onUnmounted(() => clearTimeout(timeout))
</script>

<template>
  <span class="font-mono" :style="{ color }">
    {{ displayed }}<span class="blink" :style="{ color }">█</span>
  </span>
</template>
