<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { contactSchema } from "~/schemas";
import { contactFormValue } from "~/values";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const config = useRuntimeConfig();
const siteKey = ref("");
const recaptchaToken = ref<string | null>(null);
const nameInput = ref<HTMLInputElement | null>(null);
const route = useRoute();

const { generalSetting } = await useGeneralSettings();

const { handleSubmit, resetForm, defineField, errors, isSubmitting, meta } =
  useForm({
    validationSchema: toTypedSchema(contactSchema),
    initialValues: contactFormValue,
  });

const [name] = defineField("name");
const [company] = defineField("company");
const [email] = defineField("email");
const [phone] = defineField("phone");
const [service] = defineField("service");
const [message] = defineField("message");
const [privacy] = defineField("privacy");

const onSubmit = handleSubmit(async (values) => {
  try {
    // Unimos los valores del formulario con el token del captcha
    const payload = {
      ...values,
      recaptchaToken: recaptchaToken.value,
    };

    console.log("Enviando payload al backend:", payload);

    const response = await $fetch<{ success: boolean; message: string }>(
      `${config.public.apiBase}/api/contacts/send-email`,
      {
        method: "POST",
        body: payload,
      },
    );

    resetForm();
    recaptchaToken.value = null;

    // 3. Reiniciar el reCAPTCHA visualmente en la interfaz
    const win = window as any;
    if (win.grecaptcha && typeof win.grecaptcha.reset === "function") {
      win.grecaptcha.reset();
    }

    toast.success(response.message);
  } catch (error: any) {
    console.error("Error al enviar formulario:", error);
    // Muestra el mensaje exacto que responde el backend en lugar de caerse silenciosamente
    const errorMessage =
      error?.data?.message || "Ocurrió un error al enviar el correo.";
    toast.error(errorMessage);
  }
});

const scrollToSectionAndFocus = () => {
  setTimeout(() => {
    // 1. Ubicar la sección de contacto
    const section = document.getElementById('contact') || document.getElementById('contacto')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }

    // 2. Colocar el foco en el input sin romper el scroll
    setTimeout(() => {
      if (nameInput.value) {
        nameInput.value.focus({ preventScroll: true })
      }
    }, 150)
  }, 200) // Retardo para asegurar que el DOM de Nuxt terminó de hidratar
}

const handleGlobalClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const link = target.closest('a')
  
  if (link) {
    const href = link.getAttribute('href') || ''
    if (href === '#contact' || href === '#contacto') {
      scrollToSectionAndFocus()
    }
  }
}

onMounted(() => {
  // Forzamos a que tome la variable pública directamente en el cliente
  siteKey.value = config.public.recaptchaSiteKey;
  console.log("Site Key en onMounted:", siteKey.value);

  if (!siteKey.value) {
    console.error("La clave de reCAPTCHA no está definida.");
    return;
  }

  // Definimos las funciones globales que pide Google
  (window as any).onRecaptchaSuccess = (token: string) => {
    console.log("Token capturado con éxito:", token);
    recaptchaToken.value = token;
  };

  (window as any).onRecaptchaExpired = () => {
    console.log("El token de reCAPTCHA expiró");
    recaptchaToken.value = null;
  };

  // Función para renderizar de forma segura
  const renderCaptcha = () => {
    const win = window as any;
    if (win.grecaptcha && typeof win.grecaptcha.render === "function") {
      try {
        const container = document.getElementById(
          "recaptcha-booking-container",
        );
        if (container && !container.hasChildNodes()) {
          win.grecaptcha.render(container, {
            sitekey: siteKey.value,
            callback: "onRecaptchaSuccess",
            "expired-callback": "onRecaptchaExpired",
          });
        }
      } catch (e) {
        console.log("Error al renderizar reCAPTCHA:", e);
      }
    }
  };

  // Verificamos si el script ya existe en el DOM
  let scriptTag = document.querySelector('script[src*="recaptcha/api.js"]');

  if (!scriptTag) {
    const newScript = document.createElement("script") as HTMLScriptElement;
    newScript.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    newScript.async = true;
    newScript.defer = true;
    newScript.onload = () => {
      // Damos un pequeño respiro para que grecaptcha esté 100% disponible
      setTimeout(renderCaptcha, 150);
    };
    document.head.appendChild(newScript);
  } else {
    // Si ya estaba cargado de antes, solo intentamos renderizar con un timeout
    setTimeout(renderCaptcha, 200);
  }
// Si la URL trae #contacto o #contact al presionar F5 o entrar directo
  const isContact = route.hash === '#contact' || route.hash === '#contacto' || window.location.hash.includes('contacto')
  
  if (isContact) {
    scrollToSectionAndFocus()
  }

  window.addEventListener('click', handleGlobalClick)

  
});

onUnmounted(() => {
  // Limpiar el listener cuando el componente se desmonte
  window.removeEventListener('click', handleGlobalClick)
})

 

// Función para forzar el foco de forma limpia
const focusNameInput = () => {
  // Le damos 300ms para permitir que termine la animación del scroll y la transferencia de foco del clic
  setTimeout(() => {
    if (nameInput.value) {
      nameInput.value.focus({ preventScroll: true })
    }
  }, 300)
}

 

const services = computed(() => generalSetting.value?.services);

const disabled = computed(
  () => !meta.value.valid || isSubmitting.value || !recaptchaToken.value,
);
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <!-- Fila 1: Nombre y Empresa -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label
          for="nombre"
          class="block text-sm font-medium text-verus-dark mb-2"
          >Nombre completo <span class="text-red-500">*</span></label
        >
        <input
          ref="nameInput"
          type="text"
          v-model="name"
          class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark placeholder-verus-primary/50 focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200"
          placeholder="Ej. Juan Pérez"
        />
        <span v-if="errors.name" class="custom-alert">{{ errors.name }}</span>
      </div>
      <div>
        <label
          for="empresa"
          class="block text-sm font-medium text-verus-dark mb-2"
          >Empresa <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          v-model="company"
          class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark placeholder-verus-primary/50 focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200"
          placeholder="Ej. Importaciones S.A."
        />
        <span v-if="errors.company" class="custom-alert">{{
          errors.company
        }}</span>
      </div>
    </div>

    <!-- Fila 2: Correo y Teléfono -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-verus-dark mb-2"
          >Correo electrónico <span class="text-red-500">*</span></label
        >
        <input
          type="email"
          v-model="email"
          class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark placeholder-verus-primary/50 focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200"
          placeholder="juan@empresa.com"
        />
        <span v-if="errors.email" class="custom-alert">{{ errors.email }}</span>
      </div>
      <div>
        <label
          for="telefono"
          class="block text-sm font-medium text-verus-dark mb-2"
          >Teléfono <span class="text-red-500">*</span></label
        >
        <input
          type="text"
          v-model="phone"
          class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark placeholder-verus-primary/50 focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200"
          placeholder="+51 999 999 999"
        />
        <span v-if="errors.phone" class="custom-alert">{{ errors.phone }}</span>
      </div>
    </div>

    <!-- Fila 3: Asunto -->
    <div>
      <label for="asunto" class="block text-sm font-medium text-verus-dark mb-2"
        >Asunto <span class="text-red-500">*</span></label
      >
      <div class="relative">
        <select
          v-model="service"
          class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200 appearance-none"
        >
          <option value="" disabled selected>Selecciona una opción</option>
          <option
            v-for="service in services"
            :key="service.id"
            :value="service.title"
          >
            {{ service.title }}
          </option>
          <option value="otro">Otro</option>
        </select>
        <span v-if="errors.service" class="custom-alert">{{
          errors.service
        }}</span>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-verus-primary"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Fila 4: Mensaje -->
    <div>
      <label
        for="mensaje"
        class="block text-sm font-medium text-verus-dark mb-2"
        >Mensaje <span class="text-red-500">*</span></label
      >
      <textarea
        id="mensaje"
        rows="3"
        v-model="message"
        class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark placeholder-verus-primary/50 focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200 resize-none"
        placeholder="Cuéntanos más sobre tu proyecto..."
      ></textarea>
      <span class="custom-alert">{{ errors.message }}</span>
    </div>

    <!-- Fila 5: Checkbox de Privacidad -->
    <div class="flex items-start">
      <div class="flex items-center h-5">
        <input
          id="privacidad"
          name="privacidad"
          type="checkbox"
          v-model="privacy"
          class="h-4 w-4 text-verus-gold focus:ring-verus-gold border-verus-dark/10 rounded bg-verus-bg"
        />
      </div>
      <div class="ml-3 text-sm">
        <label for="privacidad" class="font-normal text-verus-primary/90">
          Acepto la
          <a
            href="https://imaynadigital.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-verus-red hover:text-verus-gold underline transition-colors duration-200"
            >política de privacidad</a
          >
          <span class="text-red-500"> *</span>
        </label>
      </div>
    </div>

    <!-- Fila 6: Google reCAPTCHA y Botón -->
    <div class="pt-2 grid md:grid-cols-2 gap-6 items-center">
      <div class="flex justify-center md:justify-start">
        <!-- Sin v-if para que el div renderice de inmediato al cargar la página -->
        <!-- <div
          class="g-recaptcha"
          :data-sitekey="config.public.recaptchaSiteKey"
          data-callback="onContactRecaptchaSuccess"
          data-expired-callback="onContactRecaptchaExpired"
        ></div> -->

        <div v-if="siteKey" id="recaptcha-booking-container"></div>
      </div>

      <div class="flex items-center">
        <button
          :disabled="disabled"
          type="submit"
          class="inline-flex items-center justify-center bg-verus-red hover:bg-verus-gold text-white font-normal py-4 px-12 rounded-xl text-sm transition-colors duration-300 shadow-md hover:shadow-lg tracking-wide w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Enviar Mensaje
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
@reference "tailwindcss";
.custom-alert {
  @apply text-red-500 text-xs block mt-1;
}
</style>
