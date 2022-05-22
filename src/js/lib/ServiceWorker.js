define( function() {
    return {
        load: function() {
            if( 'serviceWorker' in navigator ) {
                navigator.serviceWorker.register( 'service-worker.js' );
            }
        }
    };
} );
