<script setup>
import { onMounted, onUnmounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import BackgroundEffects from './components/BackgroundEffects.vue'

// Custom cursor tracking
let cursorEl, ringEl, rafId
const move = (e) => {
  const x = e.clientX, y = e.clientY
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    if (cursorEl) { cursorEl.style.left = x + 'px'; cursorEl.style.top = y + 'px' }
    if (ringEl)   { ringEl.style.left   = x + 'px'; ringEl.style.top   = y + 'px' }
  })
}

onMounted(() => {
  cursorEl = document.getElementById('cursor')
  ringEl   = document.getElementById('cursor-ring')
  window.addEventListener('mousemove', move)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', move)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <BackgroundEffects />

  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main scrollable content -->
    <main class="flex-1 ml-0 lg:ml-72 min-h-screen overflow-x-hidden">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
/* Page transition */
.page-enter-active,
.page-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.page-enter-from   { opacity: 0; transform: translateY(16px); }
.page-leave-to     { opacity: 0; transform: translateY(-16px); }
</style>
