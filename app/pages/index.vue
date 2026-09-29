<script setup lang="ts">
const { generalSetting } = await useGeneralSettings();

const info = computed(() => generalSetting.value?.informationAditional);

useHead({
  title: () => info.value?.title_seo || "Vireo",
  meta: [
    {
      name: "description",
      content: () => info.value?.description_seo || "",
    },
    {
      name: "keywords",
      content: () => info.value?.keywords_seo || "",
    },
    {
      property: "og:title",
      content: () => info.value?.ogTitle_title_seo || "",
    },
    {
      property: "og:description",
      content: () => info.value?.ogDescription_seo || "",
    },
    {
      property: "og:image",
      content: () => info.value?.image || "",
    },
  ],
});
</script>

<template>
  <div>
    <HeroSection />
    <RiskSection />
    <HowItWorksSection />
    <ServicesSection />
    <TestimonySection />
    <ContactSection />
    <MapSection />
    <BookVerifySection />
  </div>
</template>
