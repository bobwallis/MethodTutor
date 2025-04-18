import ready from '../lib/ready.js';

ready(function() {
    // Find the about element
    var about = document.getElementById( 'about' );

    // Create overlay element
    var overlay = document.createElement( 'div' );
    overlay.id = 'overlay';
    overlay.className = 'hide';
    document.body.insertBefore( overlay, about );

    // Functions to open and close the about box
    var aboutOpen = false;
    var toggleAbout = function() {
        aboutOpen? closeAbout() : openAbout();
    };
    var openAbout = function() {
        overlay.className = 'active';
        about.className   = 'active';
        aboutOpen = true;
    };
    var closeAbout = function() {
        overlay.className = 'hide';
        about.className   = 'hide';
        aboutOpen = false;
    }

    // Add event listeners
    document.getElementById( 'aboutButton' ).addEventListener( 'click', toggleAbout );
    overlay.addEventListener( 'click', toggleAbout );
    document.getElementById( 'head' ).addEventListener( 'click', function( e ) {
        if( !e.target.matches( '#aboutButton' ) ) {
            closeAbout();
        }
    } );
    document.body.addEventListener( 'keydown', function( e ) {
        if( e.key === 'Escape' ) {
            closeAbout();
        }
    } );
});
