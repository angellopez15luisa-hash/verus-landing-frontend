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
  <SectionImageService :service />
  {{ service }}
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
    <SectionInformationService :service />
    <SectionListTextService :service />
    <SectionGalleryImagesService :service />
    <SectionVideoService :service />
    <SectionQuestionService :service />
  </main>
</template>
