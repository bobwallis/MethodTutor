import ready from '../lib/ready.js';
import $document_on from '../lib/$document_on.js';

ready(function() {
    var practice_chooser_container            = document.getElementById( 'selectMethod' ),
        practice_chooser_name                 = document.getElementById( 'practice_chooser_name' ),
        practice_chooser_stage                = document.getElementById( 'practice_chooser_stage' ),
        practice_chooser_notation             = document.getElementById( 'practice_chooser_notation' ),
        practice_chooser_ruleOffs             = document.getElementById( 'practice_chooser_ruleOffs' ),
        practice_chooser_allowMethodSelection = document.getElementById( 'practice_chooser_allowMethodSelection' ),
        practice_chooser_help                 = document.getElementById( 'practice_chooser_help' ),
        searchResults                         = document.getElementById( 'searchResults' );


    // If the setting to disable method choice is set, then hide the relevant UI elements
    practice_chooser_allowMethodSelection.addEventListener( 'change', function() {
        var allow = practice_chooser_allowMethodSelection.value === 'false'? false : true;
        if( !allow ) { // No need to unhide as setting is only possible via query string and can't be turned off
            var prevButton = document.querySelector( '#chooseOptions .prev_button' );
            prevButton.style.pointerEvents = 'none';
            prevButton.style.opacity = 0;
            document.querySelector( '#chooseOptions h3' ).style.display = 'none';
            document.querySelector( '#head h1' ).innerHTML = (practice_chooser_name.value !== '')? '<span style="font-weight:normal">Method Tutor &raquo;</span> '+practice_chooser_name.value : 'Method Tutor';
        }
    } );


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
                for( var i = 0; i < 4; i++ ) {
                    if( typeof data.results[i] === 'undefined' ) { break; }
                    fragment += '<li class="result" data-stage="'+data.results[i].stage+'" data-notation="'+data.results[i].notation+'" data-ruleOffs="{&quot;from&quot;:'+data.results[i].ruleOffs.from+',&quot;every&quot;:'+data.results[i].ruleOffs.every+'}">'+data.results[i].title+'</li>';
                }
                fragment += '<li class="close">Close Search Results ✖</li>';
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


    // Listen for changes to title. Show the restart button, and make the help bolder
    var prevButton = document.querySelector( '#selectMethod .prev_button' ),
        titleChange =  function( e ) {
        if( practice_chooser_name.value === '' ) {
            prevButton.style.pointerEvents = 'none';
            prevButton.style.opacity = 0;
            practice_chooser_help.classList.add( 'pulse' );
        }
        else {
            prevButton.style.pointerEvents = 'auto';
            prevButton.style.opacity = 1;
            practice_chooser_help.classList.remove( 'pulse' );
        }
    };
    practice_chooser_name.addEventListener( 'change', titleChange );
    practice_chooser_name.addEventListener( 'input', titleChange );


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
    $document_on( 'click', '#searchResults li.result', function( e ) {
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
    $document_on( 'click', '#searchResults li.close', function( e ) {
        searchResults.style.display = 'none';
    } );


    // Focus the search box when '/' is typed
    document.body.addEventListener( 'keydown', function( e ) {
        if( practice_chooser_container.classList.contains( 'active' ) && e.key == '/' && document.activeElement.id !== 'practice_chooser_name' ) {
            practice_chooser_name.focus();
            e.preventDefault();
        }
    } );


    // Tag the active search result
    $document_on( 'mouseover', '#searchResults li.result', function( e ) {
        var searchResults_li = e.target.parentElement.children;
        for( var i = 0; i < searchResults_li.length; i++ ) {
            searchResults_li[i].classList.remove( 'active' );
        }
        e.target.classList.add( 'active' );
    } );
    $document_on( 'mouseout', '#searchResults li.result', function( e ) {
        e.target.classList.remove( 'active' );
    } );


    // Allow keyboard interaction with search results
    document.body.addEventListener( 'keydown', function( e ) {
        if( searchResults.style.display === 'block' ) {
            if( e.key === 'Escape' ) {
                document.querySelector( '#searchResults li.close' ).dispatchEvent( new Event( 'click', { bubbles: true } ) );
                e.preventDefault();
                return;
            }
            if( e.key === 'Enter' ) {
                var active_searchResults_li = document.querySelector( '#searchResults li.active' );
                if( active_searchResults_li !== null ) {
                    active_searchResults_li.dispatchEvent( new Event( 'click', { bubbles: true } ) );
                    e.preventDefault();
                }
                return;
            }
            if( e.key === 'ArrowUp' || e.key === 'ArrowDown' ) {
                // Find the target
                var active_searchResults_li = document.querySelector( '#searchResults li.active' ),
                    target_searchResults_li;
                if( active_searchResults_li !== null && e.key === 'ArrowUp' ) {
                    target_searchResults_li = active_searchResults_li.previousSibling;
                }
                if( active_searchResults_li === null && e.key === 'ArrowDown' ) {
                    target_searchResults_li = document.querySelector( '#searchResults li' );
                }
                if( active_searchResults_li !== null && e.key === 'ArrowDown' ) {
                    target_searchResults_li = active_searchResults_li.nextSibling;
                    if( target_searchResults_li === null ) {
                        target_searchResults_li = document.querySelector( '#searchResults li' );
                    }
                }
                // Switch to it
                if( active_searchResults_li !== null ) {
                    active_searchResults_li.dispatchEvent( new Event( 'mouseout', { bubbles: true } ) );
                }
                if( target_searchResults_li !== null ) {
                    target_searchResults_li.dispatchEvent( new Event( 'mouseover', { bubbles: true } ) );
                }
                e.preventDefault();
                return;
            }
        }
    } );
});
