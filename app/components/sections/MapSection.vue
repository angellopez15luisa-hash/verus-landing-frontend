<script setup lang="ts">
const { generalSetting } = await useGeneralSettings();
</script>

<template>
  <section class="pb-16 pt-8 px-0 sm:px-6 lg:px-8 overflow-hidden">
    <!-- <div class="max-w-7xl w-full p-8 mx-auto space-y-8"> -->
    <!-- <iframe
        width="100%"
        height="400"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.803242407919!2d-77.0633095!3d-11.988112400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105ce518d66053f%3A0x7626f999653d75ed!2sMetro!5e0!3m2!1ses!2spe!4v1790609347508!5m2!1ses!2spe"
        ><a
          href="https://www.mapsdirections.info/calcular-la-poblacion-en-un-mapa/"
          >Calculadora de mapas de población</a
        >
      </iframe> -->
    <!-- </div> -->

    <!-- El div contenedor con un alto fijo o flexible y las clases para redondear -->
    <div
      class="max-w-7xl w-full h-[450px] mx-auto rounded-2xl overflow-hidden shadow-lg"
    >
      <!-- Usamos v-html para inyectar todo el iframe guardado -->
      <div
        v-html="generalSetting?.informationAditional?.iframe_map_contact"
        class="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
      ></div>
    </div>
  </section>
</template>
<!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.803242407919!2d-77.0633095!3d-11.988112400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105ce518d66053f%3A0x7626f999653d75ed!2sMetro!5e0!3m2!1ses!2spe!4v1790609347508!5m2!1ses!2spe" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe> -->
