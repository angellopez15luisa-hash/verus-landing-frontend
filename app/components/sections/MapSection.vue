<script setup lang="ts">
const { generalSetting } = await useGeneralSettings();
</script>

<template>
  <section class="py-16 mt-5" aria-label="Ubicación y Mapa de la Empresa">
    <!-- Contenedor con las medidas exactas originales -->
    <div class="max-w-[84rem] mx-auto px-6 lg:px-8">
      
      <!-- Contenedor del mapa optimizado para rendimiento y SEO visual -->
      <div class="w-full h-[450px] rounded-2xl overflow-hidden shadow-lg bg-slate-100">
        <div 
          v-html="generalSetting?.informationAditional?.iframe_map_contact"
          class="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
        ></div>
      </div>
    </div>
  </section>
</template>