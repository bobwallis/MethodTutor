/**
 * Service worker registration wrapper.
 *
 * Called once at app startup to enable offline caching/update behavior when
 * the browser supports service workers.
 */
const ServiceWorker = {
    load() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js');
        }
    }
};
export default ServiceWorker;
