<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { contactSchema } from "~/schemas";
import { contactFormValue } from "~/values";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const config = useRuntimeConfig();

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
const [affair] = defineField("affair");
const [message] = defineField("message");

const onSubmit = handleSubmit( async values => {
    console.log(values)
    const response = await $fetch<{success:boolean,message:string}>(`${config.public.apiBase}/api/contacts/send-email`, {
        method: 'POST',
        body:values
    })

    resetForm()
    toast.success(response.message)
    console.log(response.message)
    
})

const services = computed(() => generalSetting.value?.services);

const disabled = computed(() => !meta.value.valid || isSubmitting.value);
</script>

<template>
  <form method="POST" class="space-y-6"  @submit.prevent="onSubmit" >
    <!-- Fila 1: Nombre y Empresa -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label
          for="nombre"
          class="block text-sm font-medium text-verus-dark mb-2"
          >Nombre completo *</label
        >
        <input
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
          >Empresa</label
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
          >Correo electrónico *</label
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
          >Teléfono *</label
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
        >Asunto *</label
      >
      <div class="relative">
        <select
          v-model="affair"
          class="w-full px-4 py-3 bg-verus-bg border border-verus-dark/10 rounded-xl text-sm text-verus-dark focus:outline-none focus:border-verus-gold focus:ring-1 focus:ring-verus-gold transition duration-200 appearance-none"
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
          <!-- <option value="cotizacion">Cotización</option>
          <option value="soporte">Soporte a un servicio en curso</option>
          <option value="alianza">Alianza comercial</option>
          <option value="otro">Otro</option> -->
          <option value="otro">Otro</option>
        </select>
        <span v-if="errors.affair" class="custom-alert">{{
          errors.affair
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
        >Mensaje *</label
      >
      <textarea
        id="mensaje"
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
          required
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
          *
        </label>
      </div>
    </div>

    <!-- Fila 6: Google reCAPTCHA y Botón -->
    <div class="pt-2 grid md:grid-cols-2 gap-6 items-center">
      <div
        class="bg-gray-50 items-start border border-gray-200 rounded-xl p-2 inline-block shadow-inner"
      >
        <div class="flex items-center space-x-3">
          <input
            type="checkbox"
            id="recaptcha-mock"
            disabled
            class="h-5 w-5 text-blue-600 rounded border-gray-300"
          />
          <label
            for="recaptcha-mock"
            class="text-xs text-gray-600 font-medium select-none"
            >No soy un robot</label
          >
          <div class="flex flex-col items-center pl-6">
            <img
              src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
              alt="reCAPTCHA"
              loading="lazy"
              class="w-6 h-6"
            />
            <span class="text-[8px] text-gray-400 mt-0.5">reCAPTCHA</span>
          </div>
        </div>
      </div>
      <div class="items-center">
        <button
          :disabled
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
  @apply text-red-500 text-xs block;
}
</style>
