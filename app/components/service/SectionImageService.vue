<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import type { Service } from "@/types";

defineProps<{
  service?: Service;
}>();

let observer: IntersectionObserver | null = null;

onMounted(() => {
  setTimeout(() => {
    const elements = document.querySelectorAll(".card-animate, .fade-in-up");
    if (elements.length === 0) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((el) => observer?.observe(el));
  }, 50);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <section
    class="relative bg-slate-900 text-white py-72 px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    <!-- [[ service ]] -->
    <!-- Imagen de fondo destacada con overlay -->
    <div class="absolute inset-0 z-0">
      <img
        :src="service?.image"
        :alt="service?.title"
        class="w-full h-full object-cover opacity-50"
      />
    </div>

    <!-- Contenido con la animación fade-in-up -->
    <div class="relative z-10 max-w-5xl mx-auto text-center fade-in-up" style="transition-delay: 0ms;">
      <span
        class="inline-block px-3 py-1 bg-verus-red text-white font-semibold text-xs uppercase tracking-wider rounded-full mb-4"
      >
        Servicio Especializado
      </span>
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
        <!-- Auditoría de Proveedores -->
        {{ service?.title }}
      </h1>
      <p class="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light">
        <!-- Le pagué a un proveedor que resultó ser una fábrica fantasma... -->
        {{ service?.text_short }}
      </p>
    </div>
  </section>
</template>