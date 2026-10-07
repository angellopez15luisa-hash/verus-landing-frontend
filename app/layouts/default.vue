<template>
  <div
    class="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-sky-600 selection:text-white"
  >
    <TheHeader />
    
    <main class="flex-grow">
      <slot />
    </main>
    
    <TheFooter />
  </div>
</template>