import ready from '../lib/ready.js';

ready(function() {
    // Listen for changes to the pill selectors
    var radios = document.querySelectorAll( 'ul.tab_group input[type=radio]' );
    for( i = 0; i < radios.length; i++ ) {
        radios[i].addEventListener( 'click', function( e ) {
            for( var node = e.target.parentElement.parentElement.firstChild; node && node.nodeType === 1; node = node.nextElementSibling || node.nextSibling ) {
                node.classList.remove( 'active' );
            }
            e.target.parentElement.classList.add( 'active' );
        } );
    }

    // Listen for changes to the stage and adjust the place bell selector
    var practice_chooser_bell = document.getElementById( 'practice_chooser_bell' );
    document.getElementById( 'practice_chooser_stage' ).addEventListener( 'change', function( e ) {
        var newStage = parseInt( e.target.value, 10 ),
            currentPlaceBell = parseInt( practice_chooser_bell.querySelector( 'li.active input' ).value, 10 );
        // Change the selector to the current stage
        practice_chooser_bell.className = 'tab_group _'+newStage;
        // If the currently selected place bell has fallen off the end then reset to the heaviest bell available
        if( newStage < currentPlaceBell ) {
            var event = new MouseEvent( 'click', { view: window, bubbles: true, cancelable: true } );
            practice_chooser_bell.querySelector( 'input#practice_chooser_bell_'+newStage ).dispatchEvent( event );
        }
    } );

    // Listen for changes to the method name and set the title
    var sectionTitle = document.querySelector( '#chooseOptions h3' );
    document.getElementById( 'practice_chooser_name' ).addEventListener( 'change', function( e ) {
            sectionTitle.innerText = e.target.value;
    });
} );
