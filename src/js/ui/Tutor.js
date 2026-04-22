import ready from '../lib/ready.js';
import RingingPractice from '../lib/RingingPractice.js';
import PlaceNotation from '../lib/PlaceNotation.js';

/**
 * Tutor runtime launcher.
 *
 * Reads configured form options when the user starts practice, derives bell-line
 * highlighting metadata, and instantiates `RingingPractice` for the active touch.
 */
ready(function() {
    // Listen for clicks to the Go button, and destroy then re-create the practice interface
    document.getElementById( 'go' ).addEventListener( 'click', function( e ) {
        var i;

        // Clear the existing interface
        var practice_container = document.getElementById( 'practice_container' );
        practice_container.innerHTML = '';
        practice_container.replaceWith( practice_container.cloneNode(true) );

        // Read some options into variables
        var option_title = document.getElementById( 'practice_chooser_name' ).value,
            option_leadOrCourse = document.querySelector( '#practice_chooser_leadOrCourse li.active input' ).value,
            option_stage = parseInt( document.getElementById( 'practice_chooser_stage' ).value, 10 ),
            option_notation = PlaceNotation.parse( PlaceNotation.expand( document.getElementById( 'practice_chooser_notation' ).value, option_stage ), option_stage ),
            option_following = parseInt( practice_chooser_bell.querySelector( 'li.active input' ).value, 10 ) - 1;

        // Read off rule offs
        var option_ruleOffs = {};
        try {
            option_ruleOffs = JSON.parse( document.getElementById( 'practice_chooser_ruleOffs' ).value );
        }
        catch(e) {
            var option_ruleOffs = { from: 0, every: option_notation.length };
        }

        // Work out which bells to draw lines through
        var option_lines = new Array( option_stage ),
            huntBells = PlaceNotation.huntBells( option_notation, option_stage );
        for( i = 0; i < option_stage; ++i ) {
            if( huntBells.indexOf( i ) !== -1 ) {
                option_lines[i] = { color: '#D11', width: 2 };
            }
            else {
                option_lines[i] = null
            }
        }
        option_lines[option_following] = { color: (huntBells.indexOf( option_following ) !== -1)? '#D11' : '#11D', width: 4 };

        // Work out how many changes make up a full course (rounds at a lead boundary).
        var option_finishRow = option_notation.length;
        if( option_leadOrCourse === 'course' ) {
            var courseRow = PlaceNotation.rounds( option_stage ),
                startRow = courseRow.slice( 0 ),
                maxCourseRows = 10000;
            while( option_finishRow < maxCourseRows ) {
                courseRow = PlaceNotation.apply( option_notation[(option_finishRow - 1) % option_notation.length], courseRow );
                ++option_finishRow;
                if( PlaceNotation.rowsEqual( courseRow, startRow ) && option_finishRow % option_notation.length === 0 ) {
                    break;
                }
            }
        }

        // Create a new ringing practice interface
        var practice = new RingingPractice( {
            container: 'practice_container',
            title: option_title,
            stage: option_stage,
            notation: option_notation,
            following: option_following,
            lines: option_lines,
            ruleOffs: option_ruleOffs,
            introduction: true,
            score: true,
            thatsAll: (option_leadOrCourse === 'course')? "That's all!" : ' ',
            finishRow: option_finishRow,
            placeStarts: { from: 0, every: option_notation.length },
            autostart: true,
            buttons: [{text: '↑ Exit', className: 'plain', callback: function() { document.querySelector( '#tutor .prev_button button' ).dispatchEvent( new Event( 'click', { bubbles: true } ) ); }}]
        } );
    } );
});
