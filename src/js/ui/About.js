import ready from '../lib/ready.js';

/**
 * About dialog controller.
 *
 * Controls the native about dialog from the header button and relies on
 * native light-dismiss behavior for backdrop/Escape closure.
 */
ready(function() {
    // Find the about dialog
    var about = document.getElementById( 'about' );

    // Toggle the about dialog from the header button.
    var toggleAbout = function() {
        if( about.open ) {
            about.close();
        } else {
            about.showModal();
        }
    };

    // Add event listeners
    document.getElementById( 'aboutButton' ).addEventListener( 'click', toggleAbout );
});
