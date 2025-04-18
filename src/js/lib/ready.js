// Helper function that queues functions for execution once the DOM is ready
var ready = function( fn ) {
    if( document.readyState != 'loading' ) {
        fn();
    }
    else {
        document.addEventListener( 'DOMContentLoaded', fn );
    }
};
export default ready;
