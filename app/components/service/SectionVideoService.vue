<script setup lang="ts">
import type { Service } from "~/types";

defineProps<{
  service?: Service;
}>();
</script>

<template>
  <section class="space-y-6">
    <h3 class="text-2xl font-bold text-verus-primary">
      Conoce más sobre nuestro proceso
    </h3>
    <!-- Contenedor que da el estilo, el tamaño y la proporción -->
    <div
      class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200"
    >
      <!-- v-html inyecta el iframe del admin y la clase interior fuerza que llene todo el div -->
      <div
        v-html="service?.video"
        class="[&>iframe]:w-full [&>iframe]:h-full [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:border-0"
      ></div>
    </div>
  </section>
</template>
