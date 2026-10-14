<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from "vue";
import type { Service } from "~/types";

const props = defineProps<{
  service?: Service;
}>();

const config = useRuntimeConfig();
let observer: IntersectionObserver | null = null;

// Cargar el script SDK de PayPal dinámicamente
const loadPayPalScript = (clientId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ((window as any).paypal) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
};

const renderPayPalButton = async () => {
  await nextTick(); // Asegura que el DOM terminó de renderizarse

  const paypal = (window as any).paypal;
  const container = document.getElementById("paypal-button-container");

  if (!container) {
    console.error(
      "❌ No se encontró el contenedor #paypal-button-container en el DOM",
    );
    return;
  }
  if (!paypal) {
    console.error(
      "❌ El SDK de PayPal no se cargó correctamente en window.paypal",
    );
    return;
  }

  try {
    container.innerHTML = ""; // Limpiar contenedor por seguridad

    paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "pill",
          label: "pay",
        },

        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description:
                  props.service?.title || "Reserva de Asesoría - ChinaVerus",
                amount: {
                  currency_code: "USD",
                  value: "299.00",
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          try {
            const details = await actions.order.capture();
            console.log("Pago completado por:", details.payer.name.given_name);
            alert(
              `¡Pago realizado con éxito por ${details.payer.name.given_name}!`,
            );
          } catch (err) {
            console.error("Error al capturar el pago:", err);
            alert("Hubo un problema al procesar el pago con PayPal.");
          }
        },

        onError: (err: any) => {
          console.error("Error en PayPal SDK Buttons:", err);
          alert("Ocurrió un error con la pasarela de pagos de PayPal.");
        },
      })
      .render("#paypal-button-container");

    console.log("✅ Botón de PayPal renderizado con éxito");
  } catch (error) {
    console.error("❌ Error al renderizar el botón de PayPal:", error);
  }
};

onMounted(() => {
  // 1. Animaciones IntersectionObserver
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

  // 2. Inicializar PayPal
  const clientId = config.public.paypalClientId as string;
  if (!clientId) {
    console.error(
      "❌ No se encontró el Client ID de PayPal en el archivo .env",
    );
    return;
  }

  loadPayPalScript(clientId)
    .then(() => {
      renderPayPalButton();
    })
    .catch((error) => {
      console.error("❌ Error al cargar el script SDK de PayPal:", error);
    });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <section class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
    <!-- Columna Izquierda: Descripciones con animación -->
    <div
      class="lg:col-span-2 space-y-6 fade-in-up"
      style="transition-delay: 100ms"
    >
      <!-- Descripción corta -->
      <div
        class="p-6 bg-white shadow-lg shadow-gray-600/30 border-l-4 border-verus-primary rounded-r-lg"
      >
        <h2
          class="text-xs font-extrabold uppercase text-verus-primary tracking-wider mb-1"
        >
          En resumen
        </h2>
        <p class="text-lg text-slate-700 font-normal leading-relaxed">
          {{ service?.description_short }}
        </p>
      </div>

      <!-- Descripción larga -->
      <div class="prose max-w-none text-slate-600 space-y-4 leading-relaxed">
        <h3 class="text-2xl text-verus-primary font-bold">
          ¿Por qué necesitas este servicio?
        </h3>
        <div v-html="service?.description_long"></div>
      </div>
    </div>

    <!-- Columna Derecha: Tarjeta de Reserva y Pago con animación en cascada -->
    <div
      class="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 space-y-6 lg:sticky lg:top-8 fade-in-up"
      style="transition-delay: 300ms"
    >
      <hr class="border-slate-100" />

      <!-- Botones de Acción -->
      <div class="space-y-3">
        <!-- Botón Reservar -->
        <NuxtLink
          to="/formulario-reserva"
          class="w-full inline-flex justify-center items-center px-6 py-3.5 bg-verus-primary hover:bg-verus-red text-white font-bold rounded-xl shadow-lg shadow-verus-primary-600/30 transition-all duration-200"
        >
          Reservar Asesoría
        </NuxtLink>

        <!-- Botón PayPal Oficial -->
        <div class="w-full mt-4">
          <div id="paypal-button-container" class="w-full min-h-[45px]"></div>
        </div>
      </div>

      <p class="text-xs text-center text-slate-400">
        Pago seguro y garantizado. Soporte personalizado 24/7.
      </p>
    </div>
  </section>
</template>
