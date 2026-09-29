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
    id="how-it-works"
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-vblue-700 via-navy-900 to-slate-950 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    <!-- Contenedor principal -->
    <div class="max-w-7xl w-full mx-auto text-center">
      <!-- Título y descripción -->
      <div class="text-center space-y-5 pb-16">
        <h2
          class="fade-in-up text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
          style="transition-delay: 0ms"
        >
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-300"
          >
            {{ titleSection("how-it-works") }}
          </span>
        </h2>

        <p
          class="fade-in-up text-2xl text-slate-200"
          style="transition-delay: 100ms"
        >
          {{ descriptionSection("how-it-works") }}
        </p>
      </div>

      <!-- Mini metrics grid dinámico de tarjetas -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 border-t border-white/15 w-full mx-auto px-4"
      >
        <div
          v-for="(item, index) in generalSetting?.contentHowItWorks"
          :key="item.id || index"
          class="card-animate bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/15 shadow-sm text-left flex flex-col items-start justify-between min-h-[220px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.15] hover:shadow-2xl"
          :class="index % 2 === 0 ? 'hover:border-amber-400/40 hover:shadow-amber-500/10' : 'hover:border-sky-400/40 hover:shadow-sky-500/10'"
          :style="`transition-delay: ${200 + (index * 100)}ms`"
        >
          <div>
            <span
              class="text-3xl sm:text-4xl font-black tracking-tight"
              :class="index % 2 === 0 ? 'text-amber-400' : 'text-sky-400'"
            >
              0{{ item.id }}
            </span>
            <p
              class="text-base md:text-lg font-black leading-snug w-full break-words uppercase mt-3"
              :class="index % 2 === 0 ? 'text-amber-400' : 'text-sky-400'"
            >
              {{ item.title }}
            </p>
          </div>
          <p class="text-xs sm:text-sm text-slate-300 font-medium mt-4">
            {{ item.description }}
          </p>
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
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card-animate.is-visible,
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>