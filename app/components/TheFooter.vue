<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let observer: IntersectionObserver | null = null

onMounted(() => {
  const elements = document.querySelectorAll('.card-animate, .fade-in-up')
  if (elements.length === 0) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        } else {
          entry.target.classList.remove('is-visible')
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  elements.forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <footer class="bg-verus-dark text-slate-400 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Grid de las 4 columnas con animación estándar escalonada -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Columna 1 -->
        <div class="fade-in-up space-y-4" style="transition-delay: 0ms;">
          <div class="flex items-center space-x-2">
            <img style="margin-top:-20px" src="/wordmark-dark.svg" alt="" />
          </div>
          <p class="text-sm text-slate-400">
            Leading provider of supplier audits, product inspections, and
            laboratory testing in Asia.
          </p>
        </div>

        <!-- Columna 2 -->
        <div class="fade-in-up" style="transition-delay: 100ms;">
          <h3 class="text-white font-bold text-sm mb-4 uppercase tracking-wider">
            Servicios
          </h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#services" class="hover:text-verus-gold transition-colors">Auditoría de Proveedores</a>
            </li>
            <li>
              <a href="#services" class="hover:text-verus-gold transition-colors">Inspección Pre-Embarque</a>
            </li>
            <li>
              <a href="#services" class="hover:text-verus-gold transition-colors">Supervisión de Carga</a>
            </li>
            <li>
              <a href="#services" class="hover:text-verus-gold transition-colors">Asesoría Integral</a>
            </li>
          </ul>
        </div>

        <!-- Columna 3 -->
        <div class="fade-in-up" style="transition-delay: 200ms;">
          <h3 class="text-white font-bold text-sm mb-4 uppercase tracking-wider">
            Coverage Hubs
          </h3>
          <ul class="space-y-2 text-sm">
            <li>
              <span class="hover:text-white transition-colors cursor-pointer">China Inspection</span>
            </li>
            <li>
              <span class="hover:text-white transition-colors cursor-pointer">Vietnam Inspection</span>
            </li>
            <li>
              <span class="hover:text-white transition-colors cursor-pointer">India Inspection</span>
            </li>
            <li>
              <span class="hover:text-white transition-colors cursor-pointer">Bangladesh Inspection</span>
            </li>
          </ul>
        </div>

        <!-- Columna 4 -->
        <div class="fade-in-up" style="transition-delay: 300ms;">
          <h3 class="text-white font-bold text-sm mb-4 uppercase tracking-wider">
            Contact Us
          </h3>
          <p class="text-sm mb-3">
            Get in touch with our global support team:
          </p>
          <a
            href="mailto:info@v-trust.com"
            class="text-sky-400 hover:text-white font-medium text-sm block"
          >info@v-trust.com</a>
        </div>
      </div>

      <!-- Barra inferior con animación independiente -->
      <div
        class="fade-in-up border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs"
        style="transition-delay: 400ms;"
      >
        <p>
          &copy; 2026 China Verus. All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 sm:mt-0">
          <a href="#" class="hover:text-white">Politica de privacidad</a>
          <a href="#" class="hover:text-white">Terminos de serviciose</a>
          <a href="#" class="hover:text-white">Declaraci&oacute;n de privacidad</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.card-animate,
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.card-animate.is-visible,
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>