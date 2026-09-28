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
          // Cuando el elemento entra en pantalla
          entry.target.classList.add("is-visible");
        } else {
          // Cuando sale de la pantalla (permite que se vuelva a animar al subir/bajar)
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.2, // Requiere que al menos el 20% sea visible
      rootMargin: "0px 0px -100px 0px", // Margen para disparar la animación de forma más fluida al hacer scroll
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
        <!-- Título con animación (delay 0ms) -->
       <h2
          class="fade-in-up text-4xl  font-black tracking-tight leading-tight"
          style="transition-delay: 0ms"
        >
        <span
            class="bg-clip-text text-slate-800"
          >
          {{ titleSection('risk') }}
          </span>
        </h2>

        <!-- Párrafo con animación (delay 100ms) -->
        <p
          class="fade-in-up text-slate-600 text-2xl"
          style="transition-delay: 100ms"
        >
          <!-- We verify product quality at every single stage of production to
          minimize defective rates and trade risks. -->
          {{ descriptionSection("risk") }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-16 gap-8 border-t border-black/15 w-full mx-auto px-4">
        <!-- Service 1 (Delay 200ms) -->
        <div
          class="card-animate bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          style="transition-delay: 200ms"
          v-for="item in generalSetting?.services"
        >
          <div>
            <div
              class="w-14 h-14 bg-sky-50 text-vblue-600 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-vblue-600 group-hover:text-white transition-all shadow-inner"
            >
              <!-- <i class="fa-solid fa-truck"></i> -->
              <i :class="item.icon_risk"></i>
            </div>

            <h3 class="text-xl font-bold text-slate-900 mb-3">
              <!-- Auditoría de proveedores -->
              {{ item.title_risk }}
            </h3>

            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              <!-- Le pagué a un proveedor que resultó ser una fábrica fantasma o
              sin capacidad real de producción. -->
              {{ item.description_risk }}
            </p>
          </div>

          <a
            href="#contact"
            class="text-vblue-600 font-semibold text-sm inline-flex items-center space-x-2 group-hover:translate-x-1 transition-transform"
          >
            <span>Ver más</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div>

        <!-- Service 2 (Delay 320ms) -->
        <!-- <div
          class="card-animate bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          style="transition-delay: 320ms;"
        >
          <div>
            <div
              class="w-14 h-14 bg-sky-50 text-vblue-600 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-vblue-600 group-hover:text-white transition-all shadow-inner"
            >
              <i class="fa-solid fa-industry"></i>
            </div>

            <h3 class="text-xl font-bold text-slate-900 mb-3">
              Inspección pre-embarque
            </h3>

            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              El producto que recibí no era el mismo que aprobé en las fotos o
              muestras.
            </p>
          </div>

          <a
            href="#contact"
            class="text-vblue-600 font-semibold text-sm inline-flex items-center space-x-2 group-hover:translate-x-1 transition-transform"
          >
            <span>Ver más</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div> -->

        <!-- Service 3 (Delay 440ms) -->
        <!-- <div
          class="card-animate bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          style="transition-delay: 440ms;"
        >
          <div>
            <div
              class="w-14 h-14 bg-sky-50 text-vblue-600 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-vblue-600 group-hover:text-white transition-all shadow-inner"
            >
              <i class="fa-solid fa-flask"></i>
            </div>

            <h3 class="text-xl font-bold text-slate-900 mb-3">
              Supervisión de carga de contenedores
            </h3>

            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              El contenedor llegó con menos cajas de las pactadas, o la carga
              se dañó en el camino.
            </p>
          </div>

          <a
            href="#contact"
            class="text-vblue-600 font-semibold text-sm inline-flex items-center space-x-2 group-hover:translate-x-1 transition-transform"
          >
            <span>Ver más</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div> -->

        <!-- Service 4 (Delay 560ms) -->
        <!-- <div
          class="card-animate bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          style="transition-delay: 560ms;"
        >
          <div>
            <div
              class="w-14 h-14 bg-sky-50 text-vblue-600 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-vblue-600 group-hover:text-white transition-all shadow-inner"
            >
              <i class="fa-solid fa-truck-ramp-box"></i>
            </div>

            <h3 class="text-xl font-bold text-slate-900 mb-3">
              Asesoría para importadores
            </h3>

            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              Es mi primera importación y no sé qué documentos, aranceles o
              permisos necesito.
            </p>
          </div>

          <a
            href="#contact"
            class="text-vblue-600 font-semibold text-sm inline-flex items-center space-x-2 group-hover:translate-x-1 transition-transform"
          >
            <span>Ver más</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div> -->
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
