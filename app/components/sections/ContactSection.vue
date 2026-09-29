<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const { generalSetting, pending, error, titleSection, descriptionSection, getSocialUrl } =
  await useGeneralSettings();

let observer: IntersectionObserver | null = null

onMounted(() => {
  const elements = document.querySelectorAll('.card-animate, .fade-in-up')
  if (elements.length === 0) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        } else {
          entry.target.classList.remove('is-visible')
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  elements.forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <section
    id="contact"
    class="min-h-screen flex items-center justify-center bg-bg bg-gradient-to-b via-navy-900 to-slate-950 text-white pt-24 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden"
  >
    <div class="max-w-7xl w-full mx-auto text-center">
      <!-- Encabezado de la Sección (SEO: Estructura de títulos limpia) -->
      <header class="text-center space-y-5 pb-16">
        <h2
          class="fade-in-up text-4xl font-black tracking-tight leading-tight"
          style="transition-delay: 0ms"
        >
          <span class="bg-clip-text text-slate-800">
            {{ titleSection('contact') }}
          </span>
        </h2>
        <p
          class="fade-in-up text-slate-600 text-2xl mt-2"
          style="transition-delay: 100ms"
        >
          {{ descriptionSection('contact') }}
        </p>
      </header>

      <!-- Contenedor Principal de Dos Columnas -->
      <div class="fade-in-up grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-16 border-t border-slate-900/15" style="transition-delay: 200ms;">
        <!-- COLUMNA IZQUIERDA: FORMULARIO DE CONTACTO -->
        <div
          class="card-animate lg:col-span-7 bg-white rounded-2xl shadow-md border border-verus-dark/10 p-8 text-left"
          style="transition-delay: 300ms;"
        >
          <form action="#" method="POST" class="space-y-6">
            <!-- Fila 1: Nombre y Empresa -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="nombre" class="block text-sm font-medium text-verus-dark mb-2">Nombre completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  autocomplete="name"
                  class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark placeholder-verus-primary/50 focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              <div>
                <label for="empresa" class="block text-sm font-medium text-verus-dark mb-2">Empresa</label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  autocomplete="organization"
                  class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark placeholder-verus-primary/50 focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200"
                  placeholder="Ej. Importaciones S.A."
                />
              </div>
            </div>

            <!-- Fila 2: Correo y Teléfono -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="email" class="block text-sm font-medium text-verus-dark mb-2">Correo electrónico *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autocomplete="email"
                  class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark placeholder-verus-primary/50 focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200"
                  placeholder="juan@empresa.com"
                />
              </div>
              <div>
                <label for="telefono" class="block text-sm font-medium text-verus-dark mb-2">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  autocomplete="tel"
                  class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark placeholder-verus-primary/50 focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200"
                  placeholder="+51 999 999 999"
                />
              </div>
            </div>

            <!-- Fila 3: Asunto -->
            <div>
              <label for="asunto" class="block text-sm font-medium text-verus-dark mb-2">Asunto *</label>
              <div class="relative">
                <select
                  id="asunto"
                  name="asunto"
                  required
                  class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200 appearance-none"
                >
                  <option value="" disabled selected>Selecciona una opción</option>
                  <option value="consulta">Consulta general</option>
                  <option value="cotizacion">Cotización</option>
                  <option value="soporte">Soporte a un servicio en curso</option>
                  <option value="alianza">Alianza comercial</option>
                  <option value="otro">Otro</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-verus-primary">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Fila 4: Mensaje -->
            <div>
              <label for="mensaje" class="block text-sm font-medium text-verus-dark mb-2">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                required
                class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark placeholder-verus-primary/50 focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200 resize-none"
                placeholder="Cuéntanos más sobre tu proyecto..."
              ></textarea>
            </div>

            <!-- Fila 5: Checkbox de Privacidad -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="privacidad"
                  name="privacidad"
                  type="checkbox"
                  required
                  class="h-4 w-4 text-verus-gold focus:ring-verus-gold border-verus-dark/10 rounded bg-verus-bg"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="privacidad" class="font-normal text-verus-primary/90">
                  Acepto la
                  <a href="https://imaynadigital.com" target="_blank" rel="noopener noreferrer" class="text-verus-red hover:text-verus-gold underline transition-colors duration-200">política de privacidad</a> *
                </label>
              </div>
            </div>

            <!-- Fila 6: Google reCAPTCHA y Botón -->
            <div class="pt-2 grid md:grid-cols-2 gap-6 items-center">
              <div class="bg-gray-50 items-start border border-gray-200 rounded-xl p-2 inline-block shadow-inner">
                <div class="flex items-center space-x-3">
                  <input type="checkbox" id="recaptcha-mock" disabled class="h-5 w-5 text-blue-600 rounded border-gray-300" />
                  <label for="recaptcha-mock" class="text-xs text-gray-600 font-medium select-none">No soy un robot</label>
                  <div class="flex flex-col items-center pl-6">
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" loading="lazy" class="w-6 h-6" />
                    <span class="text-[8px] text-gray-400 mt-0.5">reCAPTCHA</span>
                  </div>
                </div>
              </div>
              <div class="items-center">
                <button
                  type="submit"
                  class="inline-flex items-center justify-center bg-verus-red hover:bg-verus-gold text-white font-normal py-4 px-12 rounded-xl text-sm transition-colors duration-300 shadow-md hover:shadow-lg tracking-wide w-full sm:w-auto"
                >
                  Enviar Mensaje
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- COLUMNA DERECHA: DATOS DE CONTACTO Y REDES -->
        <div
          class="card-animate lg:col-span-5 space-y-8 text-left"
          style="transition-delay: 350ms;"
        >
          <!-- Bloque de Información de Contacto -->
          <div class="bg-white rounded-2xl shadow-md border border-verus-dark/10 pt-8 pl-8 pb-20 pr-8 space-y-6 text-verus-dark">
            <h3 class="text-xl font-bold text-verus-dark border-b border-verus-dark/5 pb-3">Información de Contacto</h3>

            <div class="space-y-8">
              <!-- Dirección -->
              <div class="flex items-start space-x-4">
                <div class="text-verus-gold mt-1 flex-shrink-0">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-verus-primary/60">Dirección</h4>
                  <p class="text-sm text-verus-dark font-medium mt-0.5">{{ generalSetting?.informationContact?.address }}</p>
                </div>
              </div>

              <!-- Teléfono -->
              <div class="flex items-start space-x-4">
                <div class="text-verus-gold mt-1 flex-shrink-0">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-verus-primary/60">Teléfono</h4>
                  <p class="text-sm text-verus-dark font-medium mt-0.5">{{ generalSetting?.informationContact?.phone }}</p>
                </div>
              </div>

              <!-- WhatsApp -->
              <div class="flex items-start space-x-4">
                <div class="text-verus-gold mt-1 flex-shrink-0">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-verus-primary/60">WhatsApp</h4>
                  <a :href="`https://wa.me/${generalSetting?.informationContact?.whatsapp}`" target="_blank" rel="noopener noreferrer" class="text-sm text-verus-dark font-medium mt-0.5 hover:text-verus-gold transition-colors duration-200 block">
                    {{ generalSetting?.informationContact?.whatsapp }}
                  </a>
                </div>
              </div>

              <!-- Correo -->
              <div class="flex items-start space-x-4">
                <div class="text-verus-gold mt-1 flex-shrink-0">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-verus-primary/60">Correo Electrónico</h4>
                  <p class="text-sm text-verus-dark font-medium mt-0.5">{{ generalSetting?.informationContact?.email }}</p>
                </div>
              </div>

              <!-- Horario de Atención -->
              <div class="flex items-start space-x-4">
                <div class="text-verus-gold mt-1 flex-shrink-0">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-verus-primary/60">Horario de Atención</h4>
                  <p class="text-sm text-verus-dark font-medium mt-0.5">{{ generalSetting?.informationContact?.businessHours }}</p>
                </div>
              </div>

              <!-- Redes Sociales -->
              <div class="flex items-start space-x-4">
                <div class="text-verus-gold mt-1 flex-shrink-0">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-verus-primary/60">Síguenos en Redes Sociales</h4>
                  <div class="flex items-center gap-4 py-6">
                    <a
                      :href="getSocialUrl('linkedin')"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                    >
                      <i class="fa-brands fa-linkedin-in text-sm"></i>
                    </a>
                    <a
                      :href="getSocialUrl('facebook')"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                    >
                      <i class="fa-brands fa-facebook-f text-sm"></i>
                    </a>
                    <a
                      :href="getSocialUrl('instagram')"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-vblue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                    >
                      <i class="fa-brands fa-instagram text-sm"></i>
                    </a>
                  </div>
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
  transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--tw-transition-delay, 0ms), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--tw-transition-delay, 0ms);
  will-change: opacity, transform;
}

.card-animate {
  transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--tw-transition-delay, 0ms), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--tw-transition-delay, 0ms), box-shadow 0.3s ease, background-color 0.3s ease;
  will-change: opacity, transform, box-shadow;
}

.card-animate.is-visible,
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>