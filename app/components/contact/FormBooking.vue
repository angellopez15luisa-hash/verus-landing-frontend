<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
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

const { handleSubmit, resetForm, defineField, errors, isSubmitting, meta,setFieldValue } =
  useForm({
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

onMounted(() => {
  // Forzamos a que tome la variable pública directamente en el cliente
  siteKey.value = config.public.recaptchaSiteKey;
  console.log("Site Key en onMounted:", siteKey.value);

  if (!siteKey.value) {
    console.error("La clave de reCAPTCHA no está definida.");
    return;
  }

  (window as any).onRecaptchaSuccess = (token: string) => {
    console.log("Token capturado con éxito:", token);
    recaptchaToken.value = token;
  };

  (window as any).onRecaptchaExpired = () => {
    console.log("El token de reCAPTCHA expiró");
    recaptchaToken.value = null;
  };

  // Inyectar el script de Google
  if (!document.querySelector('script[src*="recaptcha/api.js"]')) {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
});

// Actualiza tu función de carga de archivos existente
// Asegúrate de extraer setFieldValue de tu useForm (ej: const { setFieldValue, errors, meta } = useForm(...))

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    fileName.value = file.name;
    // ¡Esta es la clave! Vinculamos el archivo con VeeValidate y Zod
    setFieldValue('fileBooking', file);
  } else {
    fileName.value = null;
    setFieldValue('fileBooking', undefined);
  }
};
const services = computed(() => generalSetting.value?.services);

const disabled = computed(
  () => !meta.value.valid || isSubmitting.value || !recaptchaToken.value,
);
</script>

<template>
  <!-- enctype="multipart/form-data" -->
  <form class="p-8 space-y-6">
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
            >Razón social</label
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
            >RUC</label
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
            >ID tributario</label
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
            >País del proveedor</label
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
            >País/ciudad de destino</label
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
            >Tipo de producto (Categoría)</label
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
            >Fecha estimada del servicio</label
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
            >Cantidad</label
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
            >Detalles adicionales</label
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
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">
            Adjuntar documentos <span class="text-red-500">*</span>
          </label>

          <input
            type="file"
            @change="handleFileUpload"
            name="archivo"
            accept=".pdf, .jpg, .jpeg, .zip"
            class="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border border-slate-300 rounded-lg bg-slate-50"
          />

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
            Medio de contacto preferido
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
        <div class="pt-2 flex flex-col items-start">
          <div
            v-if="siteKey"
            class="g-recaptcha"
            :data-sitekey="siteKey"
            data-callback="onRecaptchaSuccess"
            data-expired-callback="onRecaptchaExpired"
          ></div>
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
