/**
 * Application bootstrap entry.
 *
 * Loads UI modules for their side effects (event bindings), then initialises
 * cross-cutting runtime services (service worker and URL hash state) once DOM is ready.
 */
import ready from './lib/ready.js';
import ServiceWorker from './lib/ServiceWorker.js';
import Hash from './ui/Hash.js';
// Import UI modules for side-effects
import './ui/About.js';
import './ui/Sections.js';
import './ui/ChooseOptions.js';
import './ui/SelectMethod.js';
import './ui/Tutor.js';

ready(function() {
    // Load service worker
    ServiceWorker.load();
    // Read data from the URL hash
    Hash.read();
});
