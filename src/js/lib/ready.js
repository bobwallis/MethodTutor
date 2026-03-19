/**
 * Execute a callback after the DOM is ready.
 *
 * Runs immediately when `document.readyState` is already beyond `loading`.
 */
var ready = function( fn ) {
    if( document.readyState != 'loading' ) {
        fn();
    }
    else {
        document.addEventListener( 'DOMContentLoaded', fn );
    }
};
export default ready;
