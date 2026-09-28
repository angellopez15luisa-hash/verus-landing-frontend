<template>
  <div
    class="bg-white text-slate-800 antialiased selection:bg-sky-600 selection:text-white"
  >
    <TheHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
