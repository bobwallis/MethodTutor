import Canvas from './Canvas.js';
import LocalStorage from './LocalStorage.js';

/**
 * Measure X/Y offsets needed for visually centred canvas text.
 *
 * Canvas text metrics vary by browser and pixel ratio. This helper rasterises a
 * sample glyph, finds its bounds, and returns offsets to apply when drawing with
 * `textAlign='center'` and `textBaseline='middle'`. Results are cached.
 */
var measureXAndYTextPadding = function( size, font, text ) {
	if( typeof text == 'undefined' ) { text = '0'; }
	var padding = LocalStorage.getCache( 'Offset.'+font+text );
	if( padding === null ) {
		var canvas = new Canvas( {
			id: 'metric'+Math.floor((Math.random()*100)+1),
			width: size*3,
			height: size*3,
			scale: (typeof window.devicePixelRatio === 'number')? Math.round(window.devicePixelRatio*8) : 8
		} );
		if( canvas !== false ) {
			try {
				var context = canvas.context;
				context.font = font;
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillStyle = '#F00';
				context.fillText( text, size*1.5, size*1.5 );

				var dim = size*3*canvas.scale,
					imageData = context.getImageData( 0, 0, dim, dim ),
					bottomOfText = false,
					topOfText = false,
					leftOfText = false,
					rightOfText = false,
					row, column;

				// Find top
				for( row = 0; topOfText === false && row < dim; ++row ) {
					for( column = 0; column < dim ; ++column ) {
						if(imageData.data[((row*(dim*4)) + (column*4))] > 0 ) {
							topOfText = row;
							break;
						}
					}
				}
				// Find bottom
				for( row = dim; bottomOfText === false && row > 0; --row ) {
					for( column = 0; column < dim ; ++column ) {
						if( imageData.data[((row*(dim*4)) + (column*4))] > 0 ) {
							bottomOfText = row + 1;
							break;
						}
					}
				}
				// Find left
				for( column = 0; leftOfText === false && column < dim; ++column ) {
					for( row = 0; row < dim ; ++row ) {
						if( imageData.data[((row*(dim*4)) + (column*4))] > 0 ) {
							leftOfText = column;
							break;
						}
					}
				}
				// Find right
				for( column = dim; rightOfText === false && column > 0; --column ) {
					for( row = 0; row < dim ; ++row ) {
						if( imageData.data[((row*(dim*4)) + (column*4))] > 0 ) {
							rightOfText = column + 1;
							break;
						}
					}
				}

				padding = {
					x: Math.round(1000*((dim - rightOfText) - leftOfText) / (canvas.scale*2))/1000,
					y: Math.round(1000*((dim - bottomOfText) - topOfText) / (canvas.scale*2))/1000
				};

				LocalStorage.setCache( 'Offset.'+font+text, padding );
			}
			catch( e ) {
				padding.x = padding.y = 0;
			}
		}
		canvas = null;
	}
	return padding;
};

export default measureXAndYTextPadding;
