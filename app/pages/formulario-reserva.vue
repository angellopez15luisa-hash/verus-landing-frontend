<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

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
</script>

<template>
  <!-- Sección de Cabecera con Animación -->
  <section
    class="relative bg-slate-900 text-white py-72 px-4 sm:px-6 lg:px-8 overflow-hidden fade-in-up"
  >
    <div class="absolute inset-0 z-0">
      <img
        src="https://readdy.ai/api/search-image?query=professional%20business%20meeting%20in%20modern%20chinese%20office%20with%20floor%20to%20ceiling%20windows%20showing%20city%20skyline%20diverse%20team%20discussing%20strategy%20around%20sleek%20conference%20table%20with%20laptops%20and%20documents%20natural%20daylight%20creating%20bright%20atmosphere%20minimalist%20interior%20design%20with%20white%20walls%20and%20blue%20accents%20high%20quality%20corporate%20photography&width=800&height=600&seq=content001&orientation=landscape"
        alt="Imagen destacada del servicio"
        class="w-full h-full object-cover opacity-30"
      />
    </div>

    <div
      class="relative z-10 max-w-5xl mx-auto text-center fade-in-up"
      style="transition-delay: 0ms"
    >
      <span
        class="inline-block px-3 py-1 bg-verus-red text-white font-semibold text-xs uppercase tracking-wider rounded-full mb-4"
      >
        Servicio Especializado
      </span>
      <h1
        class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
      >
        Auditoría de Proveedores
      </h1>
      <p class="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light">
        Le pagué a un proveedor que resultó ser una fábrica fantasma o sin
        capacidad real de producción
      </p>
    </div>
  </section>

  <!-- Contenido Principal / Formulario -->
  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
    <div
      class="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100 fade-in-up"
      style="transition-delay: 150ms"
    >
      <!-- Encabezado del Formulario -->
      <div
        class="bg-verus-primary from-blue-600 to-indigo-700 py-6 px-8 text-white"
      >
        <h2 class="text-2xl font-bold tracking-tight">
          Formulario de Solicitud y Cotización
        </h2>
        <p class="text-blue-100 text-sm mt-1">
          Por favor, completa los siguientes datos para procesar tu solicitud.
        </p>
      </div>

      <!-- Formulario Completo -->
      <FormBooking />
    </div>
  </main>
</template>
