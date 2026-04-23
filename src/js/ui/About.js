import ready from '../lib/ready.js';

/**
 * About dialog controller.
 *
 * Controls the native about dialog from the header button and routes button,
 * backdrop, and Escape close paths through a shared transition helper.
 */
ready(function() {
    // Find the about dialog
    var about = document.getElementById( 'about' );

    // Run dialog state updates inside a view transition when supported.
    var runAboutTransition = function( type, updateFn ) {
        if( !document.startViewTransition ) {
            updateFn();
            return;
        }

        try {
            document.startViewTransition( {
                update: updateFn,
                types: [ type ]
            } );
        } catch( error ) {
            document.startViewTransition( updateFn );
        }
    };

    var openAbout = function() {
        if( about.open ) {
            return;
        }

        runAboutTransition( 'about-in', function() {
            about.showModal();
        } );
    };

    var closeAbout = function() {
        if( !about.open ) {
            return;
        }

        runAboutTransition( 'about-out', function() {
            about.close();
        } );
    };

    // Toggle the about dialog from the header button.
    var toggleAbout = function() {
        if( about.open ) {
            closeAbout();
        } else {
            openAbout();
        }
    };

    // Add event listeners
    document.getElementById( 'aboutButton' ).addEventListener( 'click', toggleAbout );

    // Intercept native close requests (Escape and backdrop via closedby="any")
    // and run them through the same transition.
    about.addEventListener( 'cancel', function( event ) {
        event.preventDefault();
        closeAbout();
    } );
});
