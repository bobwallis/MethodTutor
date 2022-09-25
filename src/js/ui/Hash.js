define( ['ready', '$document_on'], function( ready, $document_on ) {
    var fieldMap;

    var parseCurrentHash = function() {
        var queryString = window.location.hash,
            query = {},
            pairs = (queryString[0] === '#' ? queryString.substring( 1 ) : queryString).split( '&' );
        for( var i = 0; i < pairs.length; i++ ) {
            var pair = pairs[i].split( '=' );
            query[decodeURIComponent( pair[0] )] = decodeURIComponent( pair[1] || '' );
        }
        return query;
    };

    var Hash = {
        read: function() {
            var currentHash = parseCurrentHash();
            // Push the values in the hash into the relevant form fields
            for( field in fieldMap ) {
                if( typeof currentHash[field] !== 'undefined' && currentHash[field] !== '' ) {
                    fieldMap[field].value = currentHash[field];
                }
            }
            // Trigger change events
            for( field in fieldMap ) {
                if( typeof currentHash[field] !== 'undefined' && currentHash[field] !== '' ) {
                    fieldMap[field].dispatchEvent( new Event( 'change', { bubbles: true } ) );
                }
            }
            // If the method has been fully populated via the hash then move onto options
            if( typeof currentHash.title !== 'undefined' && typeof currentHash.notation !== 'undefined' && typeof currentHash.stage !== 'undefined' ) {
                document.querySelector( '#selectMethod .next_button button' ).dispatchEvent( new Event( 'click', { bubbles: true } ) );
            }
        },
        update: function( e ) {
            var currentHash = parseCurrentHash(),
                hashString;
            // Read values in the fields into the hash if they are different or if the field is the one that changed
            for( field in fieldMap ) {
                if( fieldMap[field].id === e.target.id || typeof currentHash[field] !== 'undefined' ) {
                    currentHash[field] = fieldMap[field].value;
                }
            }
            // Filter out empty options
            var filteredCurrentHash = Object.entries( currentHash ).filter( function( e ) { return e[1]; } );
            // Combine the fields back into a string
            hashString = Object.keys( Object.fromEntries( filteredCurrentHash ) ).map( function( key ) { return key+'='+encodeURIComponent( currentHash[key] ); } ).join( '&' );
            // Replace the hash
            history.replaceState( undefined, undefined, '#'+hashString )
        }
    };

    ready( function() {
        $document_on( 'change', 'select, input', Hash.update );
        fieldMap = {
            'title': document.getElementById( 'practice_chooser_name' ),
            'stage': document.getElementById( 'practice_chooser_stage' ),
            'notation': document.getElementById( 'practice_chooser_notation' ),
            'ruleoffs': document.getElementById( 'practice_chooser_ruleOffs' ),
            'allowMethodSelection': document.getElementById( 'practice_chooser_allowMethodSelection' )
        };
    } );

    return Hash;
} );
