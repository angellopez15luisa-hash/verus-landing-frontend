<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const {
  generalSetting,
  pending,
  error,
  titleSection,
  descriptionSection,
  getSocialUrl,
} = await useGeneralSettings();

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
    id="contact"
    class="min-h-screen flex items-center justify-center bg-bg bg-gradient-to-b via-navy-900 to-slate-950 text-white pt-24 pb-5 px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    <div class="max-w-7xl w-full mx-auto text-center">
      <!-- Encabezado de la Sección (SEO: Estructura de títulos limpia) -->
      <header class="text-center space-y-5 pb-16">
        <h2
          class="fade-in-up text-4xl font-black tracking-tight leading-tight"
          style="transition-delay: 0ms"
        >
          <span class="bg-clip-text text-slate-800">
            {{ titleSection("contact") }}
          </span>
        </h2>
        <p
          class="fade-in-up text-slate-600 text-2xl mt-2"
          style="transition-delay: 100ms"
        >
          {{ descriptionSection("contact") }}
        </p>
      </header>

      <!-- Contenedor Principal de Dos Columnas -->
     <!-- Contenedor Principal de Dos Columnas -->
      <div
        class="fade-in-up grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-16 border-t border-slate-900/15"
        style="transition-delay: 200ms"
      >
        <!-- COLUMNA IZQUIERDA: FORMULARIO DE CONTACTO -->
        <div
          class="card-animate lg:col-span-7 bg-white rounded-2xl shadow-md border border-verus-dark/10 p-8 text-left flex flex-col"
          style="transition-delay: 300ms"
        >
          <FormContact />
        </div>

        <!-- COLUMNA DERECHA: DATOS DE CONTACTO Y REDES -->
        <div
          class="card-animate lg:col-span-5 text-left flex flex-col"
          style="transition-delay: 350ms"
        >
          <!-- Bloque de Información de Contacto con h-full para igualar altura -->
          <div
            class="bg-white rounded-2xl shadow-md border border-verus-dark/10 p-8 space-y-6 text-verus-dark flex flex-col justify-between h-full"
          >
            <div>
              <h3
                class="text-xl font-bold text-verus-dark border-b border-verus-dark/5 pb-3"
              >
                Información de Contacto
              </h3>

              <div class="space-y-6 mt-6">
                <!-- Dirección -->
                <div class="flex items-start space-x-4">
                  <div class="text-verus-gold mt-1 flex-shrink-0" aria-hidden="true">
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      class="text-xs font-bold uppercase tracking-wider text-verus-primary/60"
                    >
                      Dirección
                    </h4>
                    <p class="text-sm text-verus-dark font-medium mt-0.5">
                      {{ generalSetting?.informationContact?.address }}
                    </p>
                  </div>
                </div>

                <!-- Teléfono -->
                <div class="flex items-start space-x-4">
                  <div class="text-verus-gold mt-1 flex-shrink-0" aria-hidden="true">
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      class="text-xs font-bold uppercase tracking-wider text-verus-primary/60"
                    >
                      Teléfono
                    </h4>
                    <p class="text-sm text-verus-dark font-medium mt-0.5">
                      {{ generalSetting?.informationContact?.phone }}
                    </p>
                  </div>
                </div>

                <!-- WhatsApp -->
                <div class="flex items-start space-x-4">
                  <div class="text-verus-gold mt-1 flex-shrink-0" aria-hidden="true">
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      class="text-xs font-bold uppercase tracking-wider text-verus-primary/60"
                    >
                      WhatsApp
                    </h4>
                    <a
                      :href="`https://wa.me/${generalSetting?.informationContact?.whatsapp}`"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sm text-verus-dark font-medium mt-0.5 hover:text-verus-gold transition-colors duration-200 block"
                      aria-label="Escribir al WhatsApp de contacto"
                    >
                      {{ generalSetting?.informationContact?.whatsapp }}
                    </a>
                  </div>
                </div>

                <!-- Correo -->
                <div class="flex items-start space-x-4">
                  <div class="text-verus-gold mt-1 flex-shrink-0" aria-hidden="true">
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      class="text-xs font-bold uppercase tracking-wider text-verus-primary/60"
                    >
                      Correo Electrónico
                    </h4>
                    <p class="text-sm text-verus-dark font-medium mt-0.5">
                      {{ generalSetting?.informationContact?.email }}
                    </p>
                  </div>
                </div>

                <!-- Horario de Atención -->
                <div class="flex items-start space-x-4">
                  <div class="text-verus-gold mt-1 flex-shrink-0" aria-hidden="true">
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      class="text-xs font-bold uppercase tracking-wider text-verus-primary/60"
                    >
                      Horario de Atención
                    </h4>
                    <p class="text-sm text-verus-dark font-medium mt-0.5">
                      {{ generalSetting?.informationContact?.businessHours }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Redes Sociales al fondo de la tarjeta -->
            <div class="flex items-start space-x-4 pt-4 border-t border-verus-dark/5">
              <div class="text-verus-gold mt-1 flex-shrink-0" aria-hidden="true">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <div>
                <h4
                  class="text-xs font-bold uppercase tracking-wider text-verus-primary/60"
                >
                  Síguenos en Redes Sociales
                </h4>
                <div class="flex items-center gap-4 pt-2">
                  <a
                    :href="getSocialUrl('linkedin')"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                  >
                    <i class="fa-brands fa-linkedin-in text-sm" aria-hidden="true"></i>
                  </a>
                  <a
                    :href="getSocialUrl('facebook')"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                  >
                    <i class="fa-brands fa-facebook-f text-sm" aria-hidden="true"></i>
                  </a>
                  <a
                    :href="getSocialUrl('instagram')"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                  >
                    <i class="fa-brands fa-instagram text-sm" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>

          </div>
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
  will-change: opacity, transform, box-shadow;
}

.card-animate.is-visible,
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
