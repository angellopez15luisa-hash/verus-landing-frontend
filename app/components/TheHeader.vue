<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { generalSetting, pending, error,getSocialUrl } = await useGeneralSettings();

const isMobileMenuOpen = ref(false);
let observer: IntersectionObserver | null = null;

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

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
  <header
    class="fade-in-up fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all"
    style="transition-delay: 0ms"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative"
    >
      <!-- Logo -->
      <div class="flex items-center">
        <a href="#" class="h-10 sm:h-12 flex items-center">
          <img
            src="/logo.svg"
            alt="V-Trust Logo"
            class="h-full w-auto object-contain max-w-[150px] sm:max-w-[180px]"
          />
        </a>
      </div>

      <!-- Navigation Links (Escritorio) -->
      <nav
        class="hidden lg:flex items-center space-x-6 font-medium text-slate-600 text-sm"
      >
        <a href="#start" class="hover:text-vblue-600 transition-colors"
          >Inicio</a
        >
        <a href="#how-it-works" class="hover:text-vblue-600 transition-colors"
          >¿Cómo funciona?</a
        >
        <a href="#services" class="hover:text-vblue-600 transition-colors"
          >Servicios</a
        >
        <a href="#testimony" class="hover:text-vblue-600 transition-colors"
          >Testimonios</a
        >
        <a href="#contact" class="hover:text-vblue-600 transition-colors"
          >Contacto</a
        >
      </nav>

      <!-- Right side: Language, Social & Mobile Button -->
      <div class="flex items-center space-x-3">
        <!-- Language Selector -->
        <div
          class="hidden sm:flex items-center space-x-1 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-200 transition-colors"
        >
          <i class="fa-solid fa-globe text-vblue-600"></i>
          <span>EN</span>
        </div>

        <!-- Social Media Icons (Escritorio/Tablet) -->
        <div
          class="hidden md:flex items-center space-x-2 pl-2 border-l border-slate-200"
        >
          <a
            :href="getSocialUrl('linkedin')"
            target="_blank"
            rel="noopener noreferrer"
            class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <i class="fa-brands fa-linkedin-in text-sm"></i>
          </a>
          <a
            :href="getSocialUrl('facebook')"
            target="_blank"
            rel="noopener noreferrer"
            class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <i class="fa-brands fa-facebook-f text-sm"></i>
          </a>
          <a
            :href="getSocialUrl('instagram')"
            target="_blank"
            rel="noopener noreferrer"
            class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <i class="fa-brands fa-instagram text-sm"></i>
          </a>
        </div>

        <!-- Mobile Menu Button (Hamburguesa) -->
        <button
          @click="toggleMenu"
          class="lg:hidden w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center focus:outline-none hover:bg-slate-200 transition-colors z-50"
          aria-label="Abrir menú"
        >
          <i class="fa-solid fa-bars text-lg"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Fullscreen Overlay Menu -->
    <div
      v-show="isMobileMenuOpen"
      class="fixed inset-0 w-full min-h-screen bg-white/95 backdrop-blur-xl z-[9999] flex flex-col justify-between items-center px-6 py-8"
    >
      <!-- Cabecera interna del menú (Logo a la izquierda y Botón 'X' a la derecha) -->
      <div class="w-full max-w-md flex items-center justify-between">
        <div class="h-10 flex items-center">
          <img
            src="/china-verus.jpeg"
            alt="V-Trust Logo"
            class="h-full w-auto object-contain max-w-[150px]"
          />
        </div>

        <button
          @click="closeMenu"
          class="w-12 h-12 rounded-2xl bg-slate-100 font-black text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors shadow-sm"
        >
          <i class="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>

      <!-- Links del menú -->
      <nav
        class="flex flex-col items-center space-y-3 text-center w-full max-w-xs my-auto"
      >
        <a
          href="#start"
          @click="closeMenu"
          class="mobile-link block w-full py-3 px-4 rounded-2xl text-2xl font-black text-slate-700 hover:text-vblue-600 hover:bg-slate-50 hover:translate-x-3 transition-all duration-300 uppercase tracking-tight"
          >Inicio</a
        >
        <div class="w-full h-[2px] bg-slate-200"></div>

        <a
          href="#how-it-works"
          @click="closeMenu"
          class="mobile-link block w-full py-3 px-4 rounded-2xl text-2xl font-black text-slate-700 hover:text-vblue-600 hover:bg-slate-50 hover:translate-x-3 transition-all duration-300 uppercase tracking-tight"
          >¿Cómo funciona?</a
        >
        <div class="w-full h-[2px] bg-slate-200"></div>

        <a
          href="#services"
          @click="closeMenu"
          class="mobile-link block w-full py-3 px-4 rounded-2xl text-2xl font-black text-slate-700 hover:text-vblue-600 hover:bg-slate-50 hover:translate-x-3 transition-all duration-300 uppercase tracking-tight"
          >Servicios</a
        >
        <div class="w-full h-[2px] bg-slate-200"></div>

        <a
          href="#testimony"
          @click="closeMenu"
          class="mobile-link block w-full py-3 px-4 rounded-2xl text-2xl font-black text-slate-700 hover:text-vblue-600 hover:bg-slate-50 hover:translate-x-3 transition-all duration-300 uppercase tracking-tight"
          >Testimonios</a
        >
        <div class="w-full h-[2px] bg-slate-200"></div>

        <a
          href="#contact"
          @click="closeMenu"
          class="mobile-link block w-full py-3 px-4 rounded-2xl text-2xl font-black text-slate-700 hover:text-vblue-600 hover:bg-slate-50 hover:translate-x-3 transition-all duration-300 uppercase tracking-tight"
          >Contacto</a
        >
      </nav>

      <!-- Elementos inferiores (Idioma y Redes) -->
      <div
        class="w-full max-w-md pt-4 flex items-center justify-between border-t border-slate-200"
      >
        <div
          class="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-100 px-4 py-2.5 rounded-xl"
        >
          <i class="fa-solid fa-globe text-vblue-600"></i>
          <span>English (EN)</span>
        </div>

        <div class="flex items-center space-x-3">
          <a
            :href="getSocialUrl('linkedin')"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <i class="fa-brands fa-linkedin-in text-sm"></i>
          </a>
          <a
            :href="getSocialUrl('facebook')"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <i class="fa-brands fa-facebook-f text-sm"></i>
          </a>
          <a
            :href="getSocialUrl('instagram')"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <i class="fa-brands fa-instagram text-sm"></i>
          </a>
        </div>
      </div>
    </div>
  </header>
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
