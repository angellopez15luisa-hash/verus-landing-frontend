<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const { generalSetting, pending, error } = await useGeneralSettings();

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
    class="text-center from-navy-900 to-vblue-700 text-dark p-8 mb-20 sm:p-12 rounded-0 relative overflow-hidden"
  >
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
      <div
        class="fade-in-up text-dark p-8 sm:p-12 relative overflow-hidden"
        style="transition-delay: 0ms"
      >
        <div
          class="absolute -bottom-10 -right-10 w-auto h-64 rounded-full blur-3xl"
        ></div>

        <h3
          class="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight whitespace-pre-line"
        >
          <!-- ¿Vas a pagar por un contenedor <br /> que nunca has visto? -->
          {{ generalSetting?.informationAditional?.text_verify }}
        </h3>

        <a
          href="#contact"
          class="inline-block bg-verus-red text-white font-medium px-8 py-3.5 rounded-xl shadow-lg hover:bg-verus-gold transition-all relative z-10"
        >
          <!-- Reserva una verificación -->
          {{ generalSetting?.informationAditional?.text_button_verify }}
          <i
            class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
          ></i>
        </a>
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
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.card-animate.is-visible,
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
