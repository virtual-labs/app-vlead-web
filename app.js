const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        console.log("Service Worker is supported")
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('../../sw_cache_site.js').then(registration => {
                console.log('SW registered');
            }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
        })
    }
  };
  registerServiceWorker();

