// Service worker registration
const ServiceWorker = {
    load() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js');
        }
    }
};
export default ServiceWorker;
