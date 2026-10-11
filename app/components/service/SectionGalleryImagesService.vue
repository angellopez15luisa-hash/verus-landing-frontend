<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import type { Service } from "~/types";

const props = defineProps<{
  service?: Service;
}>();

const { generalSetting } = await useGeneralSettings();

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

const imageList = computed(() => {
  return generalSetting.value?.imagesService.filter(
    (item) => item.service_id === props.service?.id,
  );
});
</script>

<template>
  <section class="space-y-6">
    <h3 class="text-2xl font-bold text-verus-primary fade-in-up">
      Galería de inspecciones reales
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in imageList"
        :key="index"
        class="overflow-hidden rounded-2xl h-64 shadow-sm bg-slate-100 fade-in-up"
        :style="`transition-delay: ${(index + 1) * 150}ms;`"
      >
        <img
          :src="item.image"
          alt="Imagen del servicio"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  </section>
</template>