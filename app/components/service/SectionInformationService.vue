<script setup lang="ts">
import type { Service } from "~/types";

const props = defineProps<{
  service?: Service;
}>();

const descripcionLimpia = computed(() => {
  if (!props.service?.description_long) return "";

  return props.service.description_long
    .replace(/<\/p><p>/g, " ") // Une los párrafos contiguos con un espacio en lugar de un salto
    .replace(/<\/?p>/g, ""); // Elimina las etiquetas <p> restantes
});
</script>

<template>
  <section class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
    <!-- Columna Izquierda: Descripciones -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Descripción corta -->
      <div
        class="p-6 bg-white shadow-lg shadow-gray-600/30 border-l-4 border-verus-primary rounded-r-lg"
      >
        <h2
          class="text-xs font-extrabold uppercase text-verus-primary tracking-wider mb-1"
        >
          En resumen
        </h2>
        <p class="text-lg text-slate-700 font-normal leading-relaxed">
          <!-- Verificamos que tu proveedor exista, tenga capacidad real de
          producción y cumpla estándares antes de que firmes un contrato o
          pagues un adelanto -->
          {{ service?.description_short }}
        </p>
      </div>

      <!-- Descripción larga -->
      <div class="prose max-w-none text-slate-600 space-y-4 leading-relaxed">
        <h3 class="text-2xl text-verus-primary font-bold">
          ¿Por qué necesitas este servicio?
        </h3>
        <div v-html="service?.description_long"></div>
      </div>
    </div>

    <!-- Columna Derecha: Tarjeta de Reserva y Pago -->
    <div
      class="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 space-y-6 lg:sticky lg:top-8"
    >
      <div>
        <span class="text-sm text-verus-primary font-medium"
          >Inversión del servicio</span
        >
        <div class="flex items-baseline space-x-1 mt-1">
          <span class="text-3xl font-extrabold text-verus-gold">$299</span>
          <span class="text-verus-gold text-sm">USD</span>
        </div>
      </div>

      <hr class="border-slate-100" />

      <!-- Botones de Acción -->
      <div class="space-y-3">
        <!-- Botón Reservar -->
        <a
          href="#reservar"
          class="w-full inline-flex justify-center items-center px-6 py-3.5 bg-verus-primary hover:bg-verus-red text-white font-bold rounded-xl shadow-lg shadow-verus-primary-600/30 transition-all duration-200"
        >
          Reservar Asesoría
        </a>

        <!-- Botón PayPal -->
        <button
          type="button"
          class="w-full inline-flex justify-center items-center px-6 py-3.5 bg-[#FFC439] hover:bg-[#f2b830] text-[#003087] font-bold rounded-xl transition-all duration-200 shadow-sm"
        >
          <svg class="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
            <path
              d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.762.762 0 0 1 .752-.642h6.582c2.25 0 4.02.502 5.097 1.442 1.018.89 1.437 2.185 1.25 3.85-.028.258-.073.52-.134.786-.68 2.97-2.738 4.793-5.835 4.793H9.76a.762.762 0 0 0-.752.643l-1.932 9.745z"
            />
          </svg>
          Pagar con PayPal
        </button>
      </div>

      <p class="text-xs text-center text-slate-400">
        Pago seguro y garantizado. Soporte personalizado 24/7.
      </p>
    </div>
  </section>
</template>
