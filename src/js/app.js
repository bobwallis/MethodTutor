require( ['ready', './lib/ServiceWorker', './ui/Hash', './ui/About', './ui/Sections', './ui/ChooseOptions', './ui/SelectMethod', './ui/Tutor'], function( ready, ServiceWorker, Hash ) {
	ready( function() {
		// Load service worker
		ServiceWorker.load();

		// Read data from the URL hash
		Hash.read();
	} );
} );
