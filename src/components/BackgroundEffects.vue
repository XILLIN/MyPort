<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref(null)
let animId, ctx, W, H, drops

// Matrix rain
function initMatrix() {
  const c = canvas.value
  if (!c) return
  ctx = c.getContext('2d')
  W = c.width  = window.innerWidth
  H = c.height = window.innerHeight
  const cols = Math.floor(W / 18)
  drops = Array.from({ length: cols }, () => Math.random() * -100)
}

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01!@#$%<>{}[]|\\'.split('')

function drawMatrix() {
  ctx.fillStyle = 'rgba(9,9,11,0.05)'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(0,245,160,0.15)'
  ctx.font = '13px JetBrains Mono'
  drops.forEach((y, i) => {
    const ch = chars[Math.floor(Math.random() * chars.length)]
    ctx.fillText(ch, i * 18, y)
    drops[i] = y > H + Math.random() * 200 ? -20 : y + 14
  })
  animId = requestAnimationFrame(drawMatrix)
}

const onResize = () => { initMatrix() }

onMounted(() => {
  initMatrix()
  drawMatrix()
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <!-- Matrix rain canvas -->
    <canvas ref="canvas" class="absolute inset-0 opacity-40" />

    <!-- Grid pattern overlay -->
    <div
      class="absolute inset-0"
      style="background-image:
        linear-gradient(rgba(0,245,160,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,245,160,0.03) 1px, transparent 1px);
        background-size: 48px 48px;"
    />

    <!-- Floating glowing orbs -->
    <div class="orb orb-1" />
    <div class="orb orb-2" />
    <div class="orb orb-3" />
  </div>
</template>

<style scoped>
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: drift 12s ease-in-out infinite;
}
.orb-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(0,245,160,0.08), transparent 70%);
  top: 10%; left: 5%;
  animation-delay: 0s;
}
.orb-2 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%);
  top: 50%; right: 10%;
  animation-delay: -4s;
}
.orb-3 {
  width: 250px; height: 250px;
  background: radial-gradient(circle, rgba(255,122,24,0.07), transparent 70%);
  bottom: 15%; left: 40%;
  animation-delay: -8s;
}
@keyframes drift {
  0%,100% { transform: translate(0,0) scale(1); }
  33%      { transform: translate(30px,-40px) scale(1.1); }
  66%      { transform: translate(-20px,30px) scale(0.95); }
}
</style>
