<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  (window as any).googleTranslateElementInit = () => {
    if ((window as any).google?.translate) {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'es',
          includedLanguages: 'en,es,pt',
          autoDisplay: false
        },
        'google_translate_element'
      )
    }
  }

  if ((window as any).google?.translate) {
    (window as any).googleTranslateElementInit()
  }
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
