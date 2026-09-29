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
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
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
    class="min-h-screen flex items-center justify-center py-24 bg-slate-50"
  >
    <div class="max-w-7xl w-full mx-auto text-center">
      <div class="text-center space-y-5 pb-16">
        <!-- Título dinámico -->
        <h2
          class="fade-in-up text-4xl font-black tracking-tight leading-tight text-slate-800"
          style="transition-delay: 0ms"
        >
          {{ titleSection('risk') }}
        </h2>

        <!-- Párrafo dinámico -->
        <p
          class="fade-in-up text-slate-600 text-2xl"
          style="transition-delay: 100ms"
        >
          {{ descriptionSection("risk") }}
        </p>
      </div>

      <!-- Grid de servicios dinámicos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-16 gap-8 border-t border-black/15 w-full mx-auto px-4">
        <div
          v-for="(item, index) in generalSetting?.services"
          :key="index"
          class="card-animate bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          :style="`transition-delay: ${200 + (index * 120)}ms`"
        >
          <div>
            <div
              class="w-14 h-14 bg-sky-50 text-vblue-600 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-vblue-600 group-hover:text-white transition-all shadow-inner"
            >
              <i :class="item.icon_risk"></i>
            </div>

            <h3 class="text-xl font-bold text-slate-900 mb-3">
              {{ item.title_risk }}
            </h3>

            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              {{ item.description_risk }}
            </p>
          </div>

          <a
            href="#contact"
            class="text-vblue-600 font-semibold text-sm inline-flex items-center space-x-2 group-hover:translate-x-1 transition-transform"
            aria-label="Ver más detalles sobre este servicio"
          >
            <span>Ver más</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div>
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
    transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--tw-transition-delay, 0ms),
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.card-animate.is-visible,
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>