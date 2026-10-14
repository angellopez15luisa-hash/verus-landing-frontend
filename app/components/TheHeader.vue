<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const router = useRouter();
const route = useRoute();
const activeSection = ref("inicio");

// --- TRADUCCIÓN E IDIOMAS ---
const currentLang = ref("es");

const langLabels: Record<string, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
};

const currentLangLabel = computed(() => langLabels[currentLang.value] || "ES");

// Detectar idioma desde la cookie de Google al cargar
onMounted(() => {
  const match = document.cookie.match(/googtrans=\/es\/([a-z]{2})/);
  if (match && match[1]) {
    currentLang.value = match[1];
  } else {
    currentLang.value = "es";
  }
});

// Función infalible para cambiar idioma con cookie + reload limpio
const setLanguage = (lang: string) => {
  if (currentLang.value === lang) return;

  currentLang.value = lang;

  if (lang === "es") {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
  } else {
    document.cookie = `googtrans=/es/${lang}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/es/${lang}; path=/`;
  }

  location.reload();
};

const { generalSetting, pending, error, getSocialUrl } = await useGeneralSettings();

const isMobileMenuOpen = ref(false);
let observer: IntersectionObserver | null = null;

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

// --- SCROLLSPY Y NAVEGACIÓN ---
const sectionMapping: Record<string, string> = {
  start: "inicio",
  "how-it-works": "como-funciona",
  services: "servicios",
  testimony: "testimonios",
  contact: "contacto",
};

const handleScrollSpy = () => {
  if (route.path !== "/") {
    activeSection.value = "";
    return;
  }

  const scrollPosition = window.scrollY + window.innerHeight / 3;

  for (const [id, slug] of Object.entries(sectionMapping)) {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        if (activeSection.value !== slug) {
          activeSection.value = slug;
          window.history.replaceState(history.state, "", `#${slug}`);
        }
        break;
      }
    }
  }
};

onMounted(() => {
  const elements = document.querySelectorAll(".card-animate, .fade-in-up");
  if (elements.length > 0) {
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
      }
    );

    elements.forEach((el) => observer?.observe(el));
  }

  window.addEventListener("scroll", handleScrollSpy, { passive: true });
  syncActiveFromUrl();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  window.removeEventListener("scroll", handleScrollSpy);
});

watch(
  () => route.hash,
  () => {
    syncActiveFromUrl();
  }
);

const scrollToSection = async (targetId: string, spanishSlug: string) => {
  activeSection.value = spanishSlug;
  closeMenu();

  if (route.path !== "/") {
    await router.push("/");

    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(history.state, "", `#${spanishSlug}`);
      }
    }, 100);
    return;
  }

  const element = document.getElementById(targetId);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(history.state, "", `#${spanishSlug}`);
  }
};

const syncActiveFromUrl = () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    activeSection.value = hash;
  } else if (route.path === "/") {
    activeSection.value = "inicio";
  }
};

const goToHome = async () => {
  activeSection.value = "inicio";
  closeMenu();

  if (window.location.hash) {
    window.history.replaceState(history.state, "", window.location.pathname);
  }

  await router.replace("/");
  window.scrollTo({ top: 0, behavior: "smooth" });
};
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
        <a
          @click.prevent="goToHome"
          class="h-10 sm:h-12 flex items-center cursor-pointer"
          aria-label="Ir al inicio"
        >
          <img
            src="/logo.svg"
            alt="ChinaVerus Logo"
            class="h-full w-auto object-contain max-w-[150px] sm:max-w-[180px]"
          />
        </a>
      </div>

      <!-- Navigation Links (Escritorio) -->
      <nav
        class="hidden lg:flex items-center space-x-6 font-medium text-slate-600 text-sm"
      >
        <a
          href="#start"
          @click.prevent="scrollToSection('start', 'inicio')"
          class="relative py-1 hover:text-vblue-600 transition-colors"
          :class="activeSection === 'inicio' ? 'text-vblue-600 font-semibold' : ''"
        >
          Inicio
          <span
            v-if="activeSection === 'inicio'"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-vblue-600 rounded-full"
          ></span>
        </a>
        <a
          href="#how-it-works"
          @click.prevent="scrollToSection('how-it-works', 'como-funciona')"
          class="relative py-1 hover:text-vblue-600 transition-colors"
          :class="activeSection === 'como-funciona' ? 'text-vblue-600 font-semibold' : ''"
        >
          ¿Cómo funciona?
          <span
            v-if="activeSection === 'como-funciona'"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-vblue-600 rounded-full"
          ></span>
        </a>
        <a
          href="#services"
          @click.prevent="scrollToSection('services', 'servicios')"
          class="relative py-1 hover:text-vblue-600 transition-colors"
          :class="activeSection === 'servicios' ? 'text-vblue-600 font-semibold' : ''"
        >
          Servicios
          <span
            v-if="activeSection === 'servicios'"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-vblue-600 rounded-full"
          ></span>
        </a>
        <a
          href="#testimony"
          @click.prevent="scrollToSection('testimony', 'testimonios')"
          class="relative py-1 hover:text-vblue-600 transition-colors"
          :class="activeSection === 'testimonios' ? 'text-vblue-600 font-semibold' : ''"
        >
          Testimonios
          <span
            v-if="activeSection === 'testimonios'"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-vblue-600 rounded-full"
          ></span>
        </a>
        <a
          href="#contact"
          @click.prevent="scrollToSection('contact', 'contacto')"
          class="relative py-1 hover:text-vblue-600 transition-colors"
          :class="activeSection === 'contacto' ? 'text-vblue-600 font-semibold' : ''"
        >
          Contacto
          <span
            v-if="activeSection === 'contacto'"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-vblue-600 rounded-full"
          ></span>
        </a>
      </nav>

      <!-- Right side: Language, Social & Mobile Button -->
      <div class="flex items-center space-x-3">
        
        <!-- Selector de Idiomas en ESCRITORIO -->
        <div class="relative group hidden sm:block">
          <button
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            type="button"
          >
            <i class="fa-solid fa-globe text-vblue-600"></i>
            <span class="uppercase">{{ currentLangLabel }}</span>
            <i class="fa-solid fa-chevron-down text-[10px] text-slate-500 ml-0.5"></i>
          </button>

          <!-- Menú desplegable -->
          <div class="absolute right-0 mt-1 w-28 bg-white border border-slate-200 rounded-xl shadow-lg py-1 hidden group-hover:block z-50">
            <button 
              @click="setLanguage('es')" 
              class="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Español</span>
              <span v-if="currentLang === 'es'" class="text-vblue-600 font-bold">✓</span>
            </button>
            <button 
              @click="setLanguage('en')" 
              class="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>English</span>
              <span v-if="currentLang === 'en'" class="text-vblue-600 font-bold">✓</span>
            </button>
            <button 
              @click="setLanguage('pt')" 
              class="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Português</span>
              <span v-if="currentLang === 'pt'" class="text-vblue-600 font-bold">✓</span>
            </button>
          </div>
        </div>

        <!-- Social Media Icons -->
        <div class="hidden md:flex items-center space-x-2 pl-2 border-l border-slate-200">
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

        <!-- Mobile Menu Button -->
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
      <div class="w-full max-w-md flex items-center justify-between">
        <div class="h-10 flex items-center">
          <img
            src="/china-verus.jpeg"
            alt="ChinaVerus Logo"
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

      <nav class="flex flex-col items-center space-y-3 text-center w-full max-w-xs my-auto">
        <a
          href="#start"
          @click.prevent="scrollToSection('start', 'inicio')"
          class="mobile-link block w-full py-3 px-4 rounded-2xl text-2xl font-black text-slate-700 hover:text-vblue-600 hover:bg-slate-50 transition-all duration-300 uppercase tracking-tight"
          >Inicio</a
        >
        <div class="w-full h-[2px] bg-slate-200"></div>

        <a
          href="#how-it-works"
          @click.prevent="scrollToSection('how-it-works', 'como-funciona')"
          class="mobile-link block w-full py-3 px-4 rounded-2xl text-2xl font-black text-slate-700 hover:text-vblue-600 hover:bg-slate-50 transition-all duration-300 uppercase tracking-tight"
          >¿Cómo funciona?</a
        >
        <div class="w-full h-[2px] bg-slate-200"></div>

        <a
          href="#services"
          @click.prevent="scrollToSection('services', 'servicios')"
          class="mobile-link block w-full py-3 px-4 rounded-2xl text-2xl font-black text-slate-700 hover:text-vblue-600 hover:bg-slate-50 transition-all duration-300 uppercase tracking-tight"
          >Servicios</a
        >
        <div class="w-full h-[2px] bg-slate-200"></div>

        <a
          href="#testimony"
          @click.prevent="scrollToSection('testimony', 'testimonios')"
          class="mobile-link block w-full py-3 px-4 rounded-2xl text-2xl font-black text-slate-700 hover:text-vblue-600 hover:bg-slate-50 transition-all duration-300 uppercase tracking-tight"
          >Testimonios</a
        >
        <div class="w-full h-[2px] bg-slate-200"></div>

        <a
          href="#contact"
          @click.prevent="scrollToSection('contact', 'contacto')"
          class="mobile-link block w-full py-3 px-4 rounded-2xl text-2xl font-black text-slate-700 hover:text-vblue-600 hover:bg-slate-50 transition-all duration-300 uppercase tracking-tight"
          >Contacto</a
        >
      </nav>

      <!-- Elementos inferiores en MOBILE (Idioma y Redes) -->
      <div class="w-full max-w-md pt-4 flex items-center justify-between border-t border-slate-200">
        
        <!-- Selector de Idiomas en MOBILE -->
        <div class="relative group">
          <button
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            type="button"
          >
            <i class="fa-solid fa-globe text-vblue-600"></i>
            <span class="uppercase">{{ currentLangLabel }}</span>
            <i class="fa-solid fa-chevron-down text-[10px] text-slate-500 ml-0.5"></i>
          </button>

          <div class="absolute left-0 bottom-full mb-1 w-28 bg-white border border-slate-200 rounded-xl shadow-lg py-1 hidden group-hover:block z-50">
            <button 
              @click="setLanguage('es')" 
              class="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-between"
            >
              <span>Español</span>
              <span v-if="currentLang === 'es'" class="text-vblue-600 font-bold">✓</span>
            </button>
            <button 
              @click="setLanguage('en')" 
              class="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-between"
            >
              <span>English</span>
              <span v-if="currentLang === 'en'" class="text-vblue-600 font-bold">✓</span>
            </button>
            <button 
              @click="setLanguage('pt')" 
              class="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-between"
            >
              <span>Português</span>
              <span v-if="currentLang === 'pt'" class="text-vblue-600 font-bold">✓</span>
            </button>
          </div>
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

    <!-- Contenedor único e invisible de Google Translate en la raíz -->
    <div id="google_translate_element" style="width: 0; height: 0; overflow: hidden; opacity: 0; position: absolute;"></div>
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