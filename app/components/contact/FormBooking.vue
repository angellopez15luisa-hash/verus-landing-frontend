<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import { bookingSchema } from "~/schemas";
import { bookingFormValue } from "~/values";

const config = useRuntimeConfig();
const siteKey = ref("");
const recaptchaToken = ref<string | null>(null);
const fileName = ref<string | null>(null);

const countries = [
  { value: "pe", label: "Perú" },
  { value: "br", label: "Brasil" },
  { value: "co", label: "Colombia" },
  { value: "mx", label: "México" },
  { value: "cl", label: "Chile" },
  { value: "ar", label: "Argentina" },
  { value: "es", label: "España" },
  { value: "otro", label: "Otro" },
];

const { generalSetting } = await useGeneralSettings();

const {
  handleSubmit,
  resetForm,
  defineField,
  errors,
  isSubmitting,
  meta,
  setFieldValue,
  setFieldError, // <-- Agrégalo aquí
} = useForm({
  validationSchema: toTypedSchema(bookingSchema),
  initialValues: bookingFormValue,
});

const [name] = defineField("name");
const [company] = defineField("company");
const [registerdNameCompany] = defineField("registerdNameCompany");
const [ruc] = defineField("ruc");
const [idTax] = defineField("idTax");
const [email] = defineField("email");
const [phone] = defineField("phone");
const [country] = defineField("country");
const [city] = defineField("city");
const [service] = defineField("service");
const [dateBooking] = defineField("dateBooking");
const [amount] = defineField("amount");
const [details] = defineField("details");
const [fileBooking] = defineField("fileBooking");
const [methodContact] = defineField("methodContact");
const [privacy] = defineField("privacy");

const onSubmit = handleSubmit(async (values) => {
  if (!recaptchaToken.value) {
    toast.error("Por favor, completa la verificación de reCAPTCHA.");
    return;
  }

  try {
    let fileBase64 = null;
    let fileNameStr = null;

    if (values.fileBooking instanceof File) {
      fileNameStr = values.fileBooking.name;
      
      fileBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(values.fileBooking as File);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }

    const payload = {
      ...values,
      fileBooking: fileBase64,
      fileName: fileNameStr,
      recaptchaToken: recaptchaToken.value,
    };

    const response = await $fetch<{ success: boolean; message: string }>(
      `${config.public.apiBase}/api/bookings/send-email`,
      {
        method: "POST",
        body: payload,
      }
    );

    // 1. Resetear formulario y valores de VeeValidate
    resetForm();
    recaptchaToken.value = null;
    fileName.value = null; // Limpia el texto visual del nombre del archivo en el input personalizado

    // 2. Limpiar físicamente el valor del input file del DOM
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    // 3. Reiniciar el reCAPTCHA visualmente en la interfaz
    const win = window as any;
    if (win.grecaptcha && typeof win.grecaptcha.reset === "function") {
      win.grecaptcha.reset();
    }

    toast.success(response.message);
  } catch (error: any) {
    console.error("Error al enviar formulario:", error);
    const errorMessage = error?.data?.message || "Ocurrió un error al enviar el correo.";
    toast.error(errorMessage);
  }
});

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

  // 👉 AQUÍ LO COLOCAS: Forzamos a que el campo de archivo comience marcado como requerido/vacío
  if (!fileName.value) {
    setFieldError("fileBooking", "* El archivo adjunto es obligatorio");
  }
});
 
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    fileName.value = file.name;
    setFieldValue("fileBooking", file); // Asigna el archivo válido
  } else {
    fileName.value = null;
    setFieldValue("fileBooking", undefined); // Esto disparará el error de Zod inmediatamente
  }
};
const services = computed(() => generalSetting.value?.services);

const disabled = computed(
  () => !meta.value.valid || isSubmitting.value || !recaptchaToken.value,
);
</script>

<template>
  <!-- enctype="multipart/form-data" -->
  <form class="p-8 space-y-6" @submit.prevent="onSubmit">
    <!-- Sección 1: Información General -->

    <div>
      <h3 class="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">
        1. Información de la Empresa y Contacto
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
        <!-- Nombre completo -->
        <div>
          <label
            for="nombre"
            class="block text-sm font-medium text-slate-700 mb-1"
            >Nombre completo <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            v-model="name"
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <span v-if="errors.name" class="custom-alert">{{ errors.name }}</span>
        </div>

        <!-- Empresa -->
        <div>
          <label
            for="empresa"
            class="block text-sm font-medium text-slate-700 mb-1"
            >Empresa <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            v-model="company"
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <span v-if="errors.company" class="custom-alert">{{
            errors.company
          }}</span>
        </div>

        <!-- Razón social -->
        <div>
          <label
            for="razon_social"
            class="block text-sm font-medium text-slate-700 mb-1"
            >Razón social <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            v-model="registerdNameCompany"
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <span v-if="errors.registerdNameCompany" class="custom-alert">{{
            errors.registerdNameCompany
          }}</span>
        </div>

        <!-- RUC -->
        <div>
          <label for="ruc" class="block text-sm font-medium text-slate-700 mb-1"
            >RUC <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            v-model="ruc"
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <span v-if="errors.ruc" class="custom-alert">{{ errors.ruc }}</span>
        </div>

        <!-- ID tributario -->
        <div>
          <label
            for="id_tributario"
            class="block text-sm font-medium text-slate-700 mb-1"
            >ID tributario <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            v-model="idTax"
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <span v-if="errors.idTax" class="custom-alert">{{
            errors.idTax
          }}</span>
        </div>

        <!-- Correo electrónico -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-slate-700 mb-1"
            >Correo electrónico <span class="text-red-500">*</span></label
          >
          <input
            type="email"
            v-model="email"
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <span v-if="errors.email" class="custom-alert">{{
            errors.email
          }}</span>
        </div>

        <!-- Teléfono -->
        <div>
          <label
            for="telefono"
            class="block text-sm font-medium text-slate-700 mb-1"
            >Teléfono <span class="text-red-500">*</span></label
          >
          <input
            type="tel"
            v-model="phone"
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <span v-if="errors.phone" class="custom-alert">{{
            errors.phone
          }}</span>
        </div>
      </div>
    </div>

    <!-- Sección 2: Ubicación y Logística -->
    <div class="pt-4">
      <h3 class="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">
        2. Ubicación y Detalles del Producto
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- País del proveedor -->
        <div>
          <label
            for="pais_proveedor"
            class="block text-sm font-medium text-slate-700 mb-1"
            >País del proveedor <span class="text-red-500">*</span></label
          >
          <select
            v-model="country"
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="" disabled selected>Seleccione un país</option>
            <option
              v-for="country in countries"
              :key="country.value"
              :value="country.value"
            >
              {{ country.label }}
            </option>
          </select>
          <span v-if="errors.country" class="custom-alert">{{
            errors.country
          }}</span>
        </div>

        <!-- País/ciudad de destino -->
        <div>
          <label
            for="destino"
            class="block text-sm font-medium text-slate-700 mb-1"
            >País/ciudad de destino <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            v-model="city"
            placeholder="Ej. Lima, Perú"
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <span v-if="errors.city" class="custom-alert">{{ errors.city }}</span>
        </div>

        <!-- Tipo de producto por categoría -->
        <div>
          <label
            for="categoria_producto"
            class="block text-sm font-medium text-slate-700 mb-1"
            >Tipo de producto (Categoría) <span class="text-red-500">*</span></label
          >
          <select
            v-model="service"
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="" disabled selected>Selecciona una opción</option>
            <!-- <option value="consulta">Consulta general</option> -->
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
        </div>
        <!-- Fecha estimada del servicio -->
        <div>
          <label
            for="fecha_servicio"
            class="block text-sm font-medium text-slate-700 mb-1"
            >Fecha estimada del servicio <span class="text-red-500">*</span></label
          >
          <input
            type="date"
            v-model="dateBooking"
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <span v-if="errors.dateBooking" class="custom-alert">{{
            errors.dateBooking
          }}</span>
        </div>
        <!-- Cantidad -->
        <div class="md:col-span-2">
          <label
            for="cantidad"
            class="block text-sm font-medium text-slate-700 mb-1"
            >Cantidad <span class="text-red-500">*</span></label
          >
          <input
            type="number"
            v-model="amount"
            min="1"
            placeholder="Ej. 500"
            class="w-full md:w-1/2 rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <span v-if="errors.amount" class="custom-alert">{{
            errors.amount
          }}</span>
        </div>
      </div>
    </div>
    <!-- Sección 3: Documentación y Notas -->
    <div class="pt-4">
      <h3 class="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">
        3. Documentación y Preferencias
      </h3>
      <div class="space-y-6">
        <!-- Detalles adicionales -->
        <div>
          <label
            for="detalles"
            class="block text-sm font-medium text-slate-700 mb-1"
            >Detalles adicionales <span class="text-red-500">*</span></label
          >
          <textarea
            v-model="details"
            rows="4"
            placeholder="Especifique cualquier detalle relevante..."
            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          ></textarea>
          <span v-if="errors.details" class="custom-alert">{{
            errors.details
          }}</span>
        </div>

        <!-- Carga de archivo -->
      <!-- Carga de archivo -->
<div>
  <label class="block text-sm font-medium text-slate-700 mb-2">
    Adjuntar documento <span class="text-red-500">*</span>
  </label>
  
  <input
    type="file"
    @change="handleFileUpload"
    name="fileBooking"
    accept=".pdf, .jpg, .jpeg, .zip"
    class="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
  />

  <!-- Texto aclaratorio -->
  <p class="text-xs text-slate-500 mt-1.5 leading-relaxed">
    Formatos permitidos: <strong>PDF, JPG, JPEG o ZIP</strong> (máx. 10 MB).<br />
    <span class="text-slate-400">* Si adjuntas un ZIP, debe contener únicamente archivos PDF o imágenes permitidas.</span>
  </p>

  <span
    v-if="errors.fileBooking"
    class="text-xs text-red-500 mt-1 block"
  >
    {{ errors.fileBooking }}
  </span>
</div>
        <!-- Medio de contacto preferido -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">
            Medio de contacto preferido <span class="text-red-500">*</span>
          </label>
          <div class="flex flex-wrap gap-6">
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="methodContact"
                name="methodContact"
                value="email"
                class="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-slate-700">Email</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="methodContact"
                name="methodContact"
                value="whatsapp"
                class="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-slate-700">WhatsApp</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="methodContact"
                name="methodContact"
                value="llamada"
                class="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-slate-700">Llamada</span>
            </label>
          </div>

          <!-- Mensaje de error dinámico -->
          <span
            v-if="errors.methodContact"
            class="custom-alert text-xs text-red-500 mt-1 block"
          >
            {{ errors.methodContact }}
          </span>
        </div>

        <!-- Acepto términos y política de privacidad -->
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              v-model="privacy"
              type="checkbox"
              class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="terminos" class="text-slate-600">
              Acepto los
              <a
                href="#"
                target="_blank"
                class="text-blue-600 hover:underline font-medium"
                >términos y condiciones</a
              >
              y la
              <a
                href="#"
                target="_blank"
                class="text-blue-600 hover:underline font-medium"
                >política de privacidad</a
              >. <span class="text-red-500">*</span>
            </label>
          </div>
        </div>

        <!-- Componente reCAPTCHA -->
        <!-- Componente reCAPTCHA -->
        <div class="pt-2 flex flex-col items-start">
          <div v-if="siteKey" id="recaptcha-booking-container"></div>
        </div>
      </div>
    </div>

    <!-- Botón de Envío -->
    <div class="pt-6 border-t flex justify-center">
      <button
        :disabled
        type="submit"
        class="bg-verus-red hover:bg-verus-gold text-white font-medium px-8 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Enviar Solicitud
      </button>
    </div>
  </form>
</template>
<style scoped>
@reference "tailwindcss";
.custom-alert {
  @apply text-red-500 text-xs block mt-1;
}
</style>
