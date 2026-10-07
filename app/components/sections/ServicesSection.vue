<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const { generalSetting, pending, error, titleSection, descriptionSection } =
  await useGeneralSettings();

let observer: IntersectionObserver | null = null;

onMounted(() => {
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
    },
  );

  elements.forEach((el) => observer?.observe(el));
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <section
    id="services"
    class="min-h-screen flex items-center justify-center bg-white text-slate-900 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    <!-- Contenedor principal -->
    <div class="max-w-7xl w-full mx-auto text-center">
      <!-- Encabezado de la Sección con Animación -->
      <div class="text-center space-y-5 pb-16">
        <h2
          class="fade-in-up text-4xl font-black tracking-tight leading-tight"
          style="transition-delay: 0ms"
        >
          <span class="bg-clip-text text-slate-800">
            {{ titleSection("services") }}
          </span>
        </h2>
        <p
          class="fade-in-up text-slate-600 text-2xl mt-2"
          style="transition-delay: 100ms"
        >
          {{ descriptionSection("services") }}
        </p>
      </div>

      <!-- Cuadrícula de servicios -->
      <div
        class="grid grid-cols-1 gap-20 pt-16 border-t border-black/15 w-full mx-auto px-4"
      >
        <template
          v-for="(item, index) in generalSetting?.services"
          :key="item.id || index"
        >
          <div
            v-if="item.isActive"
            class="card-animate grid lg:grid-cols-2 gap-12 lg:gap-16 items-center text-left"
            :style="`transition-delay: ${200 + index * 150}ms`"
          >
            <!-- Contenedor de la Imagen (Alterna el orden en pantallas grandes si es impar) -->
            <div :class="index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'">
              <div
                class="relative overflow-hidden rounded-2xl shadow-xl aspect-video lg:aspect-[4/3] bg-slate-100"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  loading="lazy"
                  class="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <!-- Contenedor de Texto -->
            <div
              :class="index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'"
              class="space-y-6"
            >
              <h3 class="text-secondary text-3xl font-bold">
                {{ item.title }}
              </h3>
              <p class="text-gray-700 text-lg leading-relaxed">
                {{ item.text_short }}
              </p>
              <p class="text-gray-700 text-lg leading-relaxed">
                {{ item.description_short }}
              </p>
              <!-- class="inline-block border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold text-base hover:bg-primary hover:text-white transition-all shadow-sm" -->
              <NuxtLink
                :to="`/servicios/${item.slug}`"
                class="inline-block border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold text-base hover:bg-primary hover:text-white transition-all shadow-sm"
                aria-label="Ver más detalles sobre este servicio"
              >
                <span>Conocer más</span>
                <i class="fa-solid fa-arrow-right text-xs ml-1"></i>
              </NuxtLink>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-animate,
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--tw-transition-delay, 0ms),
    transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--tw-transition-delay, 0ms);
  will-change: opacity, transform;
}

.card-animate {
  transition:
    opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--tw-transition-delay, 0ms),
    transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--tw-transition-delay, 0ms);
}

.card-animate.is-visible,
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
