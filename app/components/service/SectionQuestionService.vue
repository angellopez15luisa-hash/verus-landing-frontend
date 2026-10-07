<script setup lang="ts">
import type { Service } from "~/types";

const props = defineProps<{
  service?: Service;
}>();
const { generalSetting } = await useGeneralSettings();

const questionList = computed(() => {
  return generalSetting.value?.contentFrequentlyQuestions?.filter(
    (item) => item.service_id === props.service?.id,
  );
});
</script>

<template>
  <section class="space-y-6 max-w-7xl py-10 mx-auto">
    <h3 class="text-2xl font-bold text-verus-primary text-center">
      Preguntas Frecuentes
    </h3>

    <div class="space-y-4">
      <details
        class="group bg-white p-6 rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden"
        v-for="item in questionList"
        :key="item.id"
      >
        <summary
          class="flex items-center justify-between font-bold text-verus-primary cursor-pointer"
        >
          <span>
            <!-- ¿Qué pasa si el proveedor se niega a la visita? -->
             {{ item.question }}
        </span>
          <span
            class="ml-1.5 shrink-0 transition duration-300 group-open:-rotate-180"
          >
            <svg
              class="w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </summary>
        <p class="mt-4 text-slate-600 leading-relaxed">
          <!-- Es una señal de alerta en sí misma; lo documentamos en tu reporte como
          hallazgo de riesgo. -->
          {{ item.answer }}
        </p>
      </details>

      <!-- Pregunta 1 -->
      <!-- <details
        class="group bg-white p-6 rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          class="flex items-center justify-between font-bold text-verus-primary cursor-pointer"
        >
          <span>¿Qué pasa si el proveedor se niega a la visita?</span>
          <span
            class="ml-1.5 shrink-0 transition duration-300 group-open:-rotate-180"
          >
            <svg
              class="w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </summary>
        <p class="mt-4 text-slate-600 leading-relaxed">
          Es una señal de alerta en sí misma; lo documentamos en tu reporte como
          hallazgo de riesgo.
        </p>
      </details> -->

      <!-- Pregunta 2 -->
      <!-- <details
        class="group bg-white p-6 rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          class="flex items-center justify-between font-bold text-verus-primary cursor-pointer"
        >
          <span
            >¿La auditoría revisa también temas de cumplimiento social y
            laboral?</span
          >
          <span
            class="ml-1.5 shrink-0 transition duration-300 group-open:-rotate-180"
          >
            <svg
              class="w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </summary>
        <p class="mt-4 text-slate-600 leading-relaxed">
          Sí, incluye una evaluación básica de condiciones laborales; si
          necesitas una auditoría social más profunda (tipo SMETA), la ofrecemos
          como servicio adicional.
        </p>
      </details> -->

      <!-- Pregunta 3 -->
      <!-- <details
        class="group bg-white p-6 rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          class="flex items-center justify-between font-bold text-verus-primary cursor-pointer"
        >
          <span>¿En qué países pueden auditar proveedores? </span>
          <span
            class="ml-1.5 shrink-0 transition duration-300 group-open:-rotate-180"
          >
            <svg
              class="w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </summary>
        <p class="mt-4 text-slate-600 leading-relaxed">
          Cubrimos Perú y estamos ampliando cobertura en Latinoamérica y Asia;
          consulta disponibilidad para tu país de origen al reservar.
        </p>
      </details> -->

      <!-- Pregunta 4 -->
      <!-- <details
        class="group bg-white p-6 rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          class="flex items-center justify-between font-bold text-verus-primary cursor-pointer"
        >
          <span>¿Cuánto tiempo toma tener el reporte listo? </span>
          <span
            class="ml-1.5 shrink-0 transition duration-300 group-open:-rotate-180"
          >
            <svg
              class="w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </summary>
        <p class="mt-4 text-slate-600 leading-relaxed">
          Entre 3 y 5 días hábiles desde la visita.
        </p>
      </details> -->

      <!-- Pregunta 5 -->
      <!-- <details
        class="group bg-white p-6 rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          class="flex items-center justify-between font-bold text-verus-primary cursor-pointer"
        >
          <span>¿Puedo pedir una auditoría de seguimiento más adelante?</span>
          <span
            class="ml-1.5 shrink-0 transition duration-300 group-open:-rotate-180"
          >
            <svg
              class="w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </summary>
        <p class="mt-4 text-slate-600 leading-relaxed">
          Sí, muchos clientes la repiten cada 6-12 meses con proveedores
          recurrentes.
        </p>
      </details> -->
    </div>
  </section>
</template>
