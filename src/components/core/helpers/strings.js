/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * 
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 * 
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 *
 * ex: console.log( getTextWidth("hello there!", "bold 12pt arial" ) );  // close to 86
 */
 function getTextWidth( text, font ) {

    // re-use canvas object for better performance
    const canvas = getTextWidth.canvas || ( getTextWidth.canvas = document.createElement( "canvas" ) );
    const context = canvas.getContext( "2d" );
    context.font = font;
    const metrics = context.measureText( text );

    return metrics.width;
}

const wordToLetters = ( { word, font, width } ) => {

    const result = [];
    const letters = word.split( '' );
    let row = '';

    for ( let i = 0; i < letters.length; i++ ) {
        if ( getTextWidth( row + letters[ i ], font ) > width ) {
            result.push( row );
            row = letters[ i ];
        } else {
            row += letters[ i ];
        }

        if ( i === letters.length - 1 ) {
            result.push( row );
        }
    };

    return result;
}

const paragraphToWords = ( { paragraph, font, width } ) => {

    const result = [];
    const words = paragraph.split( ' ' );
    let row = '';

    for ( let i = 0; i < words.length; i++ ) {
        if ( getTextWidth( row + words[ i ], font ) > width ) {
            if ( i > 0 ) {
                result.push( row );
            }

            if ( getTextWidth( words[ i ], font ) > width ) {
                wordToLetters( { word: words[ i ], font, width } ).forEach( row => {
                    result.push( row );
                } );
                row = '';
    
            } else {
                row = words[ i ] + ' ';
                if ( i === words.length - 1 ) {
                    result.push( row.trim() );
                }        
            }

        } else {
            row += words[ i ] + ' ';
            if ( i === words.length - 1 ) {
                result.push( row.trim() );
            }    
        }
    };

    return result;
}

const textToParagraphs = ( { text, font, width } ) => {

    const result = [];
    const paragraphs = text.split( '\n' );

    for ( const paragraph of paragraphs ) {
        if ( getTextWidth( paragraph, font ) <= width ) {
            result.push( paragraph );

        } else {
            paragraphToWords( { paragraph, font, width } ).forEach( row => {
                result.push( row );
            } );
        }
    }

    return result;
}

const noIntonation = word => {

    const toBeReplaced = "άέήίόύώΆΈΉΊΌΎΏ";
    const toReplaceWith = "αεηιουωΑΕΗΙΟΥΩ";

    let result = '';

    for ( const letter of word ) {
        const i = toBeReplaced.indexOf( letter );
        result += i === -1 ? letter : toReplaceWith.substr( i, 1 );
    }

    return result;
}

export { getTextWidth, textToParagraphs, noIntonation };
