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
    id="start"
    class="relative min-h-screen flex items-center justify-center pt-20 text-white overflow-hidden bg-slate-900"
  >
    <!-- Background ImageOptimizado para LCP y Cloudinary -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <img
        v-if="generalSetting?.banners"
        :src="generalSetting.banners[0]?.image"
        alt="Supplier warehouse and logistics quality inspection background"
        class="w-full h-full object-cover object-center"
        fetchpriority="high"
        loading="eager"
      />
      <!-- Semi-transparent gradient overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-900/65 to-slate-950/75"
      ></div>
    </div>

    <!-- Background Glow effects -->
    <div
      class="absolute top-1/4 -right-20 w-96 h-96 bg-vblue-500/15 rounded-full blur-3xl pointer-events-none z-0"
    ></div>
    <div
      class="absolute -bottom-20 -left-20 w-96 h-96 bg-vaccent-500/10 rounded-full blur-3xl pointer-events-none z-0"
    ></div>

    <div
      class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full text-center"
    >
      <div class="space-y-6 flex flex-col items-center">
        <!-- Title with Standard Animation -->
        <h1
          class="fade-in-up text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] max-w-3xl drop-shadow-lg"
          style="transition-delay: 0ms"
        >
          {{ generalSetting?.title1Start }}
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-teal-200"
            >{{ generalSetting?.title2Start }}</span
          >
        </h1>

        <!-- Description with Standard Animation -->
        <p
          class="fade-in-up text-base sm:text-lg lg:text-xl text-slate-100 max-w-4xl font-medium leading-relaxed drop-shadow-md"
          style="transition-delay: 150ms"
        >
          {{ generalSetting?.descriptionStart }}
        </p>

        <!-- CTAs with Standard Animation -->
        <div
          class="fade-in-up flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 w-full sm:w-auto"
          style="transition-delay: 300ms"
        >
          <a
            href="#contact"
            class="w-full sm:w-auto bg-verus-red hover:bg-verus-gold text-white font-extralight text-base px-8 py-4 rounded-xl shadow-xl bg-[#0E3A5C] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center space-x-3 group"
          >
            <span>{{ generalSetting?.textButtonLeftStart }}</span>
            <i
              class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
            ></i>
          </a>
          <a
            href="#services"
            class="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white font-extralight text-base px-8 py-4 rounded-xl border border-white/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center space-x-2 shadow-md"
          >
            <i class="fa-solid fa-play text-vaccent-500 text-xs"></i>
            <span>{{ generalSetting?.textButtonRightStart }}</span>
          </a>
        </div>
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