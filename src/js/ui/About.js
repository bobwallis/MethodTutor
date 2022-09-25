define( ['ready'], function( ready ) {
    ready( function() {
        // Create overlay
        var overlay = document.createElement( 'div' );
        overlay.id = 'overlay';
        overlay.className = 'hide';

        // Find about element
        var about = document.getElementById( 'about' );

        // Add overlay to document
        document.body.insertBefore( overlay, about );

        // Handle click to open/close the info window
        document.getElementById( 'aboutButton' ).addEventListener( 'click', function() {
            overlay.className = 'active';
            about.className   = 'active';
        } );
        overlay.addEventListener( 'click', function() {
            overlay.className = 'hide';
            about.className   = 'hide';
        } );
        about.addEventListener( 'click', function() {
            overlay.className = 'hide';
            about.className   = 'hide';
        } );
    } );
} );
