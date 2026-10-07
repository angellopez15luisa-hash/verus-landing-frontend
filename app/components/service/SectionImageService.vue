<script setup lang="ts">
import type { GeneralSetting, Service } from "~/types";

defineProps<{
  service?: Service;
}>();
</script>
<template>
  <section
    class="relative bg-slate-900 text-white py-72 px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    <!-- {{ service }} -->
    <!-- Imagen de fondo destacada con overlay -->
    <div class="absolute inset-0 z-0">
      <!-- src="https://readdy.ai/api/search-image?query=professional%20business%20meeting%20in%20modern%20chinese%20office%20with%20floor%20to%20ceiling%20windows%20showing%20city%20skyline%20diverse%20team%20discussing%20strategy%20around%20sleek%20conference%20table%20with%20laptops%20and%20documents%20natural%20daylight%20creating%20bright%20atmosphere%20minimalist%20interior%20design%20with%20white%20walls%20and%20blue%20accents%20high%20quality%20corporate%20photography&width=800&height=600&seq=content001&orientation=landscape" -->
      <img
        :src="service?.image"
        :alt="service?.title"
        class="w-full h-full object-cover opacity-30"
      />
    </div>

    <div class="relative z-10 max-w-5xl mx-auto text-center">
      <span
        class="inline-block px-3 py-1 bg-verus-red text-white font-semibold text-xs uppercase tracking-wider rounded-full mb-4"
      >
        Servicio Especializado
      </span>
      <h1
        class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
      >
        <!-- Auditoría de Proveedores -->
        {{ service?.title }}
      </h1>
      <p class="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light">
        <!-- Le pagué a un proveedor que resultó ser una fábrica fantasma o sin
        capacidad real de producción -->
        {{ service?.text_short }}
      </p>
    </div>
  </section>
</template>
m
