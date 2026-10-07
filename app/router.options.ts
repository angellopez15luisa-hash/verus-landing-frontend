import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      // Verificamos si el elemento existe en el DOM antes de que el router intente buscarlo
      const element = document.querySelector(to.hash)
      if (element) {
        return { el: to.hash, behavior: 'smooth' }
      }
      return false // Evita el error R0042 si el ID no existe en la página actual
    }
    return { top: 0 }
  }
}