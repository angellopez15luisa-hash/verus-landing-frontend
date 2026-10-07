<script setup lang="ts">
import type { Service } from "~/types";

const props = defineProps<{
  service?: Service;
}>();

const { generalSetting } = await useGeneralSettings();

const imageList = computed(() => {
  return generalSetting.value?.imagesService.filter(
    (item) => item.service_id === props.service?.id,
  );
});
</script>

<template>
  <section class="space-y-6">
    <h3 class="text-2xl font-bold text-verus-primary">
      Galería de inspecciones reales
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in imageList"
        :key="index"
        class="overflow-hidden rounded-2xl h-64 shadow-sm bg-slate-100"
      >
        <img
          :src="item.image"
          alt="Imagen del servicio"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  </section>
</template>
