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
    id="testimony"
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-vblue-700 via-navy-900 to-slate-950 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    <div class="max-w-7xl w-full mx-auto text-center">
      <!-- Encabezado -->
      <div class="text-center space-y-4 pb-16">
        <h2
          class="fade-in-up text-4xl font-black text-white tracking-tight"
          style="transition-delay: 0ms"
        >
          {{ titleSection("trust") }}
        </h2>
        <p
          class="fade-in-up text-slate-200 text-2xl"
          style="transition-delay: 100ms"
        >
          {{ descriptionSection("trust") }}
        </p>
      </div>

      <!-- Cuadrícula de Testimonios Dinámicos -->
      <div class="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/15 pt-16 w-full mx-auto px-4">
        <template
          v-for="(item, index) in generalSetting?.contentItemsTrusts"
          :key="item.id || index"
        >
          <div
            v-if="item.isActive"
            class="card-animate bg-white rounded-2xl shadow-md border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 h-[280px]"
            :style="`transition-delay: ${200 + (index * 120)}ms`"
          >
            <div>
              <div class="flex items-center space-x-4 mb-4">
                <div
                  class="h-16 w-16 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200"
                >
                  <img
                    :src="item.image"
                    :alt="item.title"
                    loading="lazy"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="text-left">
                  <h3
                    class="text-base font-bold text-slate-900 leading-tight line-clamp-1"
                  >
                    {{ item.title }}
                  </h3>
                  <span class="text-xs text-slate-500 font-medium">
                    14 de Agosto, 2026
                  </span>
                </div>
              </div>

              <!-- Texto del testimonio -->
              <p
                class="text-sm text-slate-600 leading-relaxed italic text-left line-clamp-4"
              >
                "{{ item.description }}"
              </p>
            </div>

            <!-- Estrellas -->
            <div class="mt-4 flex text-amber-400 text-xs tracking-wider">
              ★★★★★
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
    transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--tw-transition-delay, 0ms),
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}

.card-animate.is-visible,
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>