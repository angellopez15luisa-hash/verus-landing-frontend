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
    id="testimony"
    class="min-h-screen flex items-center justify-center bg-verus-primary from-vblue-700 via-navy-900 to-slate-950 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    <div class="max-w-7xl w-full mx-auto text-center">
      <div class="text-center space-y-4 pb-16">
        <h2
          class="fade-in-up text-4xl font-black text-white tracking-tight"
          style="transition-delay: 0ms"
        >
          <!-- Nuestra Trayectoria y Confianza -->
          {{ titleSection("trust") }}
        </h2>
        <p
          class="fade-in-up text-slate-200 text-2xl"
          style="transition-delay: 100ms"
        >
          <!-- Empresas que respaldan nuestras operaciones e importadores que protegen sus inversiones con nosotros. -->
          {{ descriptionSection("trust") }}
        </p>
      </div>

      <div class="fade-in-up grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/15 pt-16 w-full mx-auto px-4">
        <template
          v-for="item in generalSetting?.contentItemsTrusts"
          :key="item.id"
        >
          <div
            v-if="item.isActive"
            class="card-animate bg-white rounded-2xl shadow-md border border-verus-dark/10 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 h-[280px]"
            style="transition-delay: 200ms"
          >
            <div>
              <div class="flex items-center space-x-4 mb-4">
                <div
                  class="h-20 w-20 rounded-full bg-verus-dark/5 overflow-hidden flex-shrink-0 border border-primary"
                >
                  <img :src="item.image" class="w-full h-full object-cover" />
                </div>
                <div class="text-left">
                  <h3
                    class="text-base font-medium text-verus-dark leading-tight"
                  >
                    {{ item.title }}
                  </h3>
                  <span class="text-xs text-verus-primary/60"
                    >14 de Agosto, 2026</span
                  >
                </div>
              </div>

              <!-- 👇 AQUÍ APLICAMOS EL CORTE DE LÍNEAS CON PUNTOS SUSPENSIVOS 👇 -->
              <p
                class="text-sm text-verus-primary/90 leading-relaxed italic text-left line-clamp-4"
              >
                {{ item.description }}
              </p>
            </div>

            <div class="mt-4 flex text-verus-gold text-xs tracking-wider">
              ★★★★★
            </div>
          </div>
        </template>

        <!-- <div
          class="card-animate bg-white rounded-2xl shadow-md border border-verus-dark/10 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
          style="transition-delay: 300ms;"
        >
          <div>
            <div class="flex items-center space-x-4 mb-4">
              <div class="h-20 w-20 rounded-full bg-verus-dark/5 overflow-hidden flex-shrink-0 border border-verus-dark/10">
                <img src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0019/9617/brand.gif?itok=y7kz32Nk" alt="Logo Cliente" class="w-full h-full object-cover">
              </div>
              <div class="text-left">
                <h3 class="text-base font-medium text-verus-dark leading-tight">Logística Textil del Sur</h3>
                <span class="text-xs text-verus-primary/60">02 de Julio, 2026</span>
              </div>
            </div>
            <p class="text-sm text-verus-primary/90 leading-relaxed italic text-left">
              "Excelente servicio de inspección pre-embarque. Encontraron defectos en el etiquetado antes de que el contenedor fuera sellado, ahorrándonos multas aduaneras."
            </p>
          </div>
          <div class="mt-4 flex text-verus-gold text-xs tracking-wider">
            ★★★★★
          </div>
        </div> -->

        <!-- <div
          class="card-animate bg-white rounded-2xl shadow-md border border-verus-dark/10 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1"
          style="transition-delay: 400ms;"
        >
          <div>
            <div class="flex items-center space-x-4 mb-4">
              <div class="h-20 w-20 rounded-full bg-verus-dark/5 overflow-hidden flex-shrink-0 border border-verus-dark/10">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80" alt="Logo Cliente" class="w-full h-full object-cover">
              </div>
              <div class="text-left">
                <h3 class="text-base font-medium text-verus-dark leading-tight">Andrés Mendoza (Emprendedor)</h3>
                <span class="text-xs text-verus-primary/60">18 de Mayo, 2026</span>
              </div>
            </div>
            <p class="text-sm text-verus-primary/90 leading-relaxed italic text-left">
              "Como primerizo en importaciones de China, su asesoría integral me dio la claridad legal y de aranceles que necesitaba. Altamente recomendados."
            </p>
          </div>
          <div class="mt-4 flex text-verus-gold text-xs tracking-wider">
            ★★★★★
          </div>
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
    background-color 0.3s ease;
}

.card-animate.is-visible,
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
