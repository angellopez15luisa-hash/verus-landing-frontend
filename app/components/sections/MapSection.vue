<script setup lang="ts">
const { generalSetting } = await useGeneralSettings();
</script>

<template>
  <section class="py-6">
    <!-- Usamos exactamente el mismo contenedor y padding que la tarjeta de arriba -->
    <div class="max-w-[84rem] mx-auto px-6 lg:px-8">
      
      <!-- Quitamos restricciones de ancho extra y dejamos que ocupe el 100% del contenedor superior -->
      <div class="w-full h-[450px] rounded-2xl overflow-hidden shadow-lg">
        <div 
          v-html="generalSetting?.informationAditional?.iframe_map_contact"
          class="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
        ></div>
      </div>
    </div>
  </section>
</template>