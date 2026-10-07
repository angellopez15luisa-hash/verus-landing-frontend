<script setup lang="ts">
import type { Service } from "~/types";

const props = defineProps<{
  service?: Service;
}>();

const includeList = computed(() => {
  const rawText = String(props.service?.which_includes || "");
  if (!rawText) return [];

  return rawText
    .replace(/<\/p><p>/g, "\n")
    .replace(/<\/?p>/g, "")
    .replace(/<br\s*[\/]?>/gi, "\n")
    .split("\n")
    .map((item: string) => {
      // Esto elimina cualquier etiqueta HTML sobrante (como los <span> con estilos)
      return item.replace(/<\/?[^>]+(>|$)/g, "").trim();
    })
    .filter((item: string) => item.length > 0)
    .map((item: string) => item.replace(/^-\s*/, ""));
});

const processList = computed(() => {
  const rawText = String(props.service?.specific_process || "");
  if (!rawText) return [];

  return rawText
    .replace(/<\/p><p>/g, "\n")
    .replace(/<\/?p>/g, "")
    .replace(/<br\s*[\/]?>/gi, "\n")
    .split("\n")
    .map((item: string) => {
      // Esto elimina cualquier etiqueta HTML sobrante (como los <span> con estilos)
      return item.replace(/<\/?[^>]+(>|$)/g, "").trim();
    })
    .filter((item: string) => item.length > 0)
    .map((item: string) => item.replace(/^-\s*/, ""));
});
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      <h3
        class="text-2xl font-bold text-verus-primary mb-6 flex items-center gap-2"
      >
        <span class="w-2 h-6 bg-verus-gold rounded-full inline-block"></span>
        Qué incluye
      </h3>
      <ul class="space-y-4">
        <li
          v-for="(item, index) in includeList"
          :key="index"
          class="flex items-start space-x-3"
        >
          <!-- Tu SVG del check verde -->
          <svg
            class="w-6 h-6 text-emerald-500 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>

          <!-- El texto dinámico de cada línea -->
          <span class="text-slate-600">{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      <h3
        class="text-2xl font-bold text-verus-primary mb-6 flex items-center gap-2"
      >
        <span class="w-2 h-6 bg-verus-gold rounded-full inline-block"></span>
        Proceso de Especifico
      </h3>
      <ol class="space-y-6 relative border-l border-slate-200 ml-3">
        <li
          v-for="(item, index) in processList"
          :key="index"
          class="ml-6 relative"
        >
          <!-- Círculo numerado con posición absoluta alineada a la izquierda del borde -->
          <span
            class="absolute -left-9 flex items-center justify-center w-6 h-6 bg-verus-gold text-white text-xs font-bold rounded-full shrink-0"
          >
            {{ index + 1 }}
          </span>

          <!-- Texto del paso alineado correctamente para que no lo tape el círculo -->
          <h4 class="font-normal text-slate-900">{{ item }}</h4>
        </li>
      </ol>
    </div>
  </section>
</template>
