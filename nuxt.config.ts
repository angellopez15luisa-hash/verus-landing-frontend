// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBase: `${process.env.NUXT_PUBLIC_API_BASE}/api`
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false, // <-- Esto evita que anteponga el nombre de las subcarpetas
    }
  ],
  app: {
    head: {
      title:
        "China Verus | Quality Control & Supplier Inspection Services in Asia",
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
        }
        
      ],
    },
  },
});
