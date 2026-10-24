<script setup>
import Hero           from '../components/sections/Hero.vue'
import About          from '../components/sections/About.vue'
import Experience     from '../components/sections/Experience.vue'
import Projects       from '../components/sections/Projects.vue'
import Skills         from '../components/sections/Skills.vue'
import Certifications from '../components/sections/Certifications.vue'
import Contact        from '../components/sections/Contact.vue'
import { useI18n }    from '../composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <div class="relative z-10">
    <Hero />

    <!-- Section divider -->
    <div class="mx-6 lg:mx-16 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

    <About />
    <div class="mx-6 lg:mx-16 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

    <Experience />
    <div class="mx-6 lg:mx-16 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

    <Projects />
    <div class="mx-6 lg:mx-16 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

    <Skills />
    <div class="mx-6 lg:mx-16 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

    <Certifications />
    <div class="mx-6 lg:mx-16 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

    <Contact />

    <!-- Footer -->
    <footer class="border-t border-primary/10 px-6 lg:px-16 py-8 text-center">
      <p class="font-pixel text-[8px] text-muted tracking-widest">
        {{ t.footer.builtWith }}
      </p>
      <p class="font-mono text-xs text-muted/50 mt-2">
        © {{ new Date().getFullYear() }} — {{ t.footer.systemsOnline }} <span class="text-primary blink">_</span>
      </p>
    </footer>
  </div>
</template>
