import Canvas from './Canvas.js';
import LocalStorage from './LocalStorage.js';

/**
 * Measure text width for a specific font and cache the result.
 *
 * Used by drawing code that needs repeatable text sizing without repeatedly
 * calling expensive canvas measurement APIs.
 */
var measureText = function(text, font) {
	var width = LocalStorage.getCache( 'Width.'+font+text );
	if( width === null ) {
		var canvas = new Canvas( { id: 'metric', width: 50, height: 50, scale: 1 } );
		canvas.context.font = font;
		width = canvas.context.measureText( text ).width;
		LocalStorage.setCache( 'Width.'+font+text, width );
	}
	return width;
};

export default measureText;
