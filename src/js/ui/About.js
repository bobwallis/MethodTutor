define( ['ready'], function( ready ) {
    ready( function() {
        // Create overlay element
        var overlay = document.createElement( 'div' );
        overlay.id = 'overlay';
        overlay.className = 'hide';

        // Find the about element
        var about = document.getElementById( 'about' );

        // Add the overlay element to the document
        document.body.insertBefore( overlay, about );

        // Functions to open and close the about box
        var openAbout = function() {
            overlay.className = 'active';
            about.className   = 'active';
        };
        var closeAbout = function() {
            overlay.className = 'hide';
            about.className   = 'hide';
        };

        // Add event listeners
        document.getElementById( 'aboutButton' ).addEventListener( 'click', openAbout );
        overlay.addEventListener( 'click', closeAbout );
        about.addEventListener( 'click', closeAbout );
        document.body.addEventListener( 'keydown', function( e ) {
            if( e.key === 'Escape' ) {
                closeAbout();
            }
		} );
    } );
} );
