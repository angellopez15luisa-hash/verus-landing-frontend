<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import type { Service } from "~/types";

const props = defineProps<{
  service?: Service;
}>();

const { generalSetting } = await useGeneralSettings();

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
            // Remueve la clase al salir para que la animación se repita al subir/bajar
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 0px 0px",
      },
    );

    elements.forEach((el) => observer?.observe(el));
  }, 50);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const questionList = computed(() => {
  return generalSetting.value?.contentFrequentlyQuestions?.filter(
    (item) => item.service_id === props.service?.id,
  );
});
</script>

<template>
  <section class="space-y-6 max-w-7xl py-10 mx-auto">
    <h3 class="text-2xl font-bold text-verus-primary text-center fade-in-up">
      Preguntas Frecuentes
    </h3>

    <div class="space-y-4">
      <details
        class="group bg-white p-6 rounded-xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden fade-in-up"
        v-for="(item, index) in questionList"
        :key="item.id"
        :style="`transition-delay: ${(index + 1) * 100}ms;`"
      >
        <summary
          class="flex items-center justify-between font-bold text-verus-primary cursor-pointer"
        >
          <span>
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
          {{ item.answer }}
        </p>
      </details>
    </div>
  </section>
</template>
