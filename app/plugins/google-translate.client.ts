export default defineNuxtPlugin(() => {
  if (!import.meta.client) return;

  // Definir el callback global que espera Google
  (window as any).googleTranslateElementInit = () => {
    if ((window as any).google?.translate?.TranslateElement) {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "es,en,pt",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    }
  };

  // Inyectar el script exclusivamente en el navegador del cliente
  if (!document.getElementById("google-translate-script")) {
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }
});