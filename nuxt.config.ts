// nuxt.config.ts (CORREGIDO)
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
      paypalClientId: process.env.NUXT_PUBLIC_PAYPAL_CLIENT_ID,
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      // ❌ ELIMINAMOS EL SCRIPT DE GOOGLE TRANSLATE DE AQUÍ
      htmlAttrs: {
        lang: "es",
      },
      title: "China Verus | Quality Control & Supplier Inspection Services in Asia",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { charset: "UTF-8" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@400;600;700&family=Open+Sans:wght@400;600&family=Inter:wght@300;400;500;600;700;800;900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
        },
      ],
    },
  },
  hooks: {
    "pages:extend"(pages) {
      pages.forEach((page) => {
        if (page.path.startsWith("/services")) {
          page.path = page.path.replace("/services", "/servicios");
        }
      });
    },
  },
});