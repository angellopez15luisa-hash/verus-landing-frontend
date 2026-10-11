<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import type { Service } from "~/types";

const props = defineProps<{
  service?: Service;
}>();

let observer: IntersectionObserver | null = null;

onMounted(() => {
  setTimeout(() => {
    const elements = document.querySelectorAll(".card-animate, .fade-in-up");
    if (elements.length === 0) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            // Se remueve para que al subir/bajar se vuelva a animar
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    elements.forEach((el) => observer?.observe(el));
  }, 50);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const includeList = computed(() => {
  const rawText = String(props.service?.which_includes || "");
  if (!rawText) return [];

  return rawText
    .replace(/<\/p><p>/g, "\n")
    .replace(/<\/?p>/g, "")
    .replace(/<br\s*[\/]?>/gi, "\n")
    .split("\n")
    .map((item: string) => {
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
      return item.replace(/<\/?[^>]+(>|$)/g, "").trim();
    })
    .filter((item: string) => item.length > 0)
    .map((item: string) => item.replace(/^-\s*/, ""));
});
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-10">
    <!-- Bloque 1: Qué incluye -->
    <div
      class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm fade-in-up"
      style="transition-delay: 100ms;"
    >
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
          <!-- SVG Check verde -->
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

          <span class="text-slate-600">{{ item }}</span>
        </li>
      </ul>
    </div>

    <!-- Bloque 2: Proceso Específico -->
    <div
      class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm fade-in-up"
      style="transition-delay: 300ms;"
    >
      <h3
        class="text-2xl font-bold text-verus-primary mb-6 flex items-center gap-2"
      >
        <span class="w-2 h-6 bg-verus-gold rounded-full inline-block"></span>
        Proceso de Específico
      </h3>
      <ol class="space-y-6 relative border-l border-slate-200 ml-3">
        <li
          v-for="(item, index) in processList"
          :key="index"
          class="ml-6 relative"
        >
          <span
            class="absolute -left-9 flex items-center justify-center w-6 h-6 bg-verus-gold text-white text-xs font-bold rounded-full shrink-0"
          >
            {{ index + 1 }}
          </span>

          <h4 class="font-normal text-slate-900">{{ item }}</h4>
        </li>
      </ol>
    </div>
  </section>
</template>