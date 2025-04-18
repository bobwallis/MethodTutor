import ready from '../lib/ready.js';
import $document_on from '../lib/$document_on.js';

ready(function() {
    // Listen for clicks to the next / prev buttons
    $document_on( 'click', '.prev_button button', function( e ) {
        this.parentNode.parentNode.classList.remove( 'active' );
        this.parentNode.parentNode.classList.remove( 'up' );
        this.parentNode.parentNode.classList.add( 'down' );
        this.parentNode.parentNode.previousElementSibling.classList.add( 'active' );
        this.parentNode.parentNode.previousElementSibling.classList.remove( 'up' );
        this.parentNode.parentNode.previousElementSibling.classList.remove( 'down' );
    } );
    $document_on( 'click', '.next_button button', function( e ) {
        this.parentNode.parentNode.classList.remove( 'active' );
        this.parentNode.parentNode.classList.add( 'up' );
        this.parentNode.parentNode.classList.remove( 'down' );
        this.parentNode.parentNode.nextElementSibling.classList.add( 'active' );
        this.parentNode.parentNode.nextElementSibling.classList.remove( 'up' );
        this.parentNode.parentNode.nextElementSibling.classList.remove( 'down' );
    } );
});
