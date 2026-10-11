<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug;

const { generalSetting, pending, error } = await useGeneralSettings();

const service = computed(() => {
  return generalSetting.value?.services?.find((item) => item.slug === slug);
});

useHead(() => ({
  title: service.value?.title,
  meta: [
    {
      name: "description",
      content: () => service.value?.text_short,
    },
    {
      property: "og:title",
      content: service.value?.title,
    },
    {
      property: "og:description",
      content: service.value?.text_short,
    },
  ],
}));
</script>
<template>
  <div class="space-y-16 py-8">
    <!-- Imagen principal con animación suave -->
    <div class="fade-in-up">
      <SectionImageService :service />
    </div>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <!-- Información del servicio con efecto -->
      <div class="fade-in-up" style="transition-delay: 100ms;">
        <SectionInformationService :service />
      </div>

      <!-- Lista de texto con efecto -->
      <div class="fade-in-up" style="transition-delay: 200ms;">
        <SectionListTextService :service />
      </div>

      <!-- Galería con efecto -->
      <div class="fade-in-up" style="transition-delay: 300ms;">
        <SectionGalleryImagesService :service />
      </div>

      <!-- Video con efecto -->
      <div class="fade-in-up" style="transition-delay: 400ms;">
        <SectionVideoService :service />
      </div>

      <!-- Preguntas frecuentes con efecto -->
      <div class="fade-in-up" style="transition-delay: 500ms;">
        <SectionQuestionService :service />
      </div>
    </main>
  </div>
</template>