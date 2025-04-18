// ES module entry point
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
