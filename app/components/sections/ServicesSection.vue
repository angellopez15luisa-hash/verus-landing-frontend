<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const { generalSetting, pending, error, titleSection, descriptionSection } =
  await useGeneralSettings();

let observer: IntersectionObserver | null = null;

onMounted(() => {
  // Seleccionamos tanto las tarjetas como los elementos con fade-in-up
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
    <!-- Contenedor extra ancho para expandir las 4 columnas perfectamente -->
    <div class="max-w-7xl w-full mx-auto text-center">
      <!-- Encabezado de la Sección con Animación -->
      <div class="text-center space-y-5 pb-16">
        <h2
          class="fade-in-up text-4xl  font-black tracking-tight leading-tight"
          style="transition-delay: 0ms"
        >
        <span
            class="bg-clip-text text-slate-800"
          >
          {{ titleSection('services') }}
          </span>
        </h2>
        <p
          class="fade-in-up text-slate-600 text-2xl mt-2"
          style="transition-delay: 100ms"
        >
          <!-- Verificamos tu proveedor, tu producto y tu carga antes de que el dinero salga de tu cuenta. -->
          {{ descriptionSection("services") }}
        </p>
      </div>

      <!-- Cuadrícula de 1 columnas estilizada, compacta y tipografía sutil -->
      <div
        class="grid grid-cols-1 gap-6 pt-16 border-t border-black/15 w-full mx-auto px-4"
      >
        <!-- Fila 1 -->
        <template v-for="item in generalSetting?.services" :key="item.id">
          <div
            class="card-animate grid lg:grid-cols-2 gap-16 items-center text-left"
            style="transition-delay: 200ms"
            v-if="item.isActive"
          >
            <div>
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover object-top rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h3 class="text-secondary text-3xl font-bold mb-6">
                {{ item.title }}
              </h3>
              <p class="text-gray-700 text-lg leading-relaxed mb-6">
                {{ item.text_short }}
              </p>
              <p class="text-gray-700 text-lg leading-relaxed mb-8">
                {{ item.description_short }}
              </p>
              <button
                class="border-2 border-primary text-primary px-8 py-3 !rounded-button font-semibold text-base whitespace-nowrap hover:bg-primary hover:text-white transition-all"
              >
                Conocer Más
              </button>
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
