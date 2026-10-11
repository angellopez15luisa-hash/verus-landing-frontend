<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import type { Service } from "~/types";

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
            // Remueve la clase al salir para que se repita al subir/bajar
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 0px 0px",
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
  <section class="space-y-6">
    <h3 class="text-2xl font-bold text-verus-primary fade-in-up">
      Conoce más sobre nuestro proceso
    </h3>
    <!-- Contenedor que da el estilo, el tamaño y la proporción con animación -->
    <div
      class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 fade-in-up"
      style="transition-delay: 150ms;"
    >
      <!-- v-html inyecta el iframe del admin y la clase interior fuerza que llene todo el div -->
      <div
        v-html="service?.video"
        class="[&>iframe]:w-full [&>iframe]:h-full [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:border-0"
      ></div>
    </div>
  </section>
</template>