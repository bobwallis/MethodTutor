define( function() {
    return function( eventNames, elementSelector, handler ) {
        eventNames.split( ' ' ).forEach( function( eventName ) {
            document.addEventListener( eventName, function( e ) {
                if( e.target ) {
                    var el = e.target.closest( elementSelector );
                    if( el === null ) { return; }
                    handler.call( el, e );
                }
            } );
        } );
    }
} );
