define( ['ready', '$document_on', './Hash'], function( ready, $document_on ) {

    ready( function() {
        var practice_chooser_name     = document.getElementById( 'practice_chooser_name' ),
            practice_chooser_stage    = document.getElementById( 'practice_chooser_stage' ),
            practice_chooser_notation = document.getElementById( 'practice_chooser_notation' ),
            practice_chooser_ruleOffs = document.getElementById( 'practice_chooser_ruleOffs' ),
            searchResults = document.getElementById( 'searchResults' );

        // Listen for changes to the name box and initiate a search
        var searchCount = 0
            activeSearchCount = -1;
        practice_chooser_name.addEventListener( 'input', function( e ) {
            // Hide the search results if the value is empty
            if( e.target.value === '' ) {
                searchResults.style.display = 'none';
                return;
            }
            // Otherwise search, and update the results <ul> with the methods
            var thisSearchCount = searchCount;
            searchCount++;
            fetch( 'https://rsw.me.uk/blueline/methods/search.json?q=' + encodeURIComponent( e.target.value ) )
                .then( function( r ) {
                    if( thisSearchCount < activeSearchCount ) {
                        throw new Error( 'Ignored result received out of sync' );
                    }
                    else {
                        activeSearchCount = thisSearchCount;
                        return r.json();
                    }
                } )
                .then( function( data ) {
                    var fragment = '';
                    for( var i = 0; i < 5; i++ ) {
                        if( typeof data.results[i] === 'undefined' ) { break; }
                        fragment += '<li data-stage="'+data.results[i].stage+'" data-notation="'+data.results[i].notation+'" data-ruleOffs="{&quot;from&quot;:'+data.results[i].ruleOffs.from+',&quot;every&quot;:'+data.results[i].ruleOffs.every+'}">'+data.results[i].title+'</li>'
                    }
                    searchResults.innerHTML = fragment;
                    searchResults.style.marginBottom = (i*-33)+'px';
                    searchResults.style.display = 'block';
                } )
                .catch( function( e ) {
                    console.log( e );
                } );

        } );


        // Listen for changes to place notation and only let user proceed if it's populated
        var nextButton = document.querySelector( '#selectMethod .next_button' ),
            pnChange =  function( e ) {
            if( practice_chooser_notation.value === '' ) {
                nextButton.style.pointerEvents = 'none';
                nextButton.style.opacity = 0;
            }
            else {
                nextButton.style.pointerEvents = 'auto';
                nextButton.style.opacity = 1;
            }
        };
        practice_chooser_notation.addEventListener( 'change', pnChange );
        practice_chooser_notation.addEventListener( 'input', pnChange );


        // Listen for changes to title and show the restart button
        var prevButton = document.querySelector( '#selectMethod .prev_button' ),
            titleChange =  function( e ) {
            if( practice_chooser_name.value === '' ) {
                prevButton.style.pointerEvents = 'none';
                prevButton.style.opacity = 0;
            }
            else {
                prevButton.style.pointerEvents = 'auto';
                prevButton.style.opacity = 1;
            }
        };
        practice_chooser_name.addEventListener( 'change', titleChange );
        practice_chooser_name.addEventListener( 'input', titleChange );
        practice_chooser_notation
        practice_chooser_notation

        // Reset the form and focus the search box when the restart button is clicked
        document.querySelector( '#selectMethod input[type="reset"]' ).addEventListener( 'click', function(e) {
            practice_chooser_name.value = '';
            practice_chooser_notation.value = '';
            practice_chooser_stage.value = '';
            practice_chooser_ruleOffs.value = '';
            practice_chooser_name.dispatchEvent( new Event( 'change', { bubbles: true } ) );
            practice_chooser_notation.dispatchEvent( new Event( 'change', { bubbles: true } ) );
            practice_chooser_stage.dispatchEvent( new Event( 'change', { bubbles: true } ) );
            practice_chooser_ruleOffs.dispatchEvent( new Event( 'change', { bubbles: true } ) );
            practice_chooser_name.focus();
        } )


        // Listen for clicks on search results
        $document_on( 'click', '#searchResults li', function( e ) {
            practice_chooser_name.value = e.target.innerText;
            practice_chooser_notation.value = e.target.dataset.notation;
            practice_chooser_stage.value = e.target.dataset.stage;
            practice_chooser_ruleOffs.value = e.target.dataset.ruleoffs;
            practice_chooser_name.dispatchEvent( new Event( 'change', { bubbles: true } ) );
            practice_chooser_notation.dispatchEvent( new Event( 'change', { bubbles: true } ) );
            practice_chooser_stage.dispatchEvent( new Event( 'change', { bubbles: true } ) );
            practice_chooser_ruleOffs.dispatchEvent( new Event( 'change', { bubbles: true } ) );
            searchResults.style.display = 'none';
        } );
    } );

} );
