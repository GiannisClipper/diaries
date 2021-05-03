/*
jsPDF: Use of Unicode Characters / UTF-8 ( https://bestofjs.org/projects/jspdf )

The 14 standard fonts in PDF are limited to the ASCII-codepage. If you want to use UTF-8 you have to integrate a custom font, which provides the needed glyphs. jsPDF supports .ttf-files. So if you want to have for example Chinese text in your pdf, your font has to have the necessary Chinese glyphs. So, check if your font supports the wanted glyphs or else it will show garbled characters instead of the right text.

To add the font to jsPDF use our fontconverter in /fontconverter/fontconverter.html. The fontconverter will create a js-file with the content of the provided ttf-file as base64 encoded string and additional code for jsPDF. You just have to add this generated js-File to your project. You are then ready to go to use setFont-method in your code and write your UTF-8 encoded text.

Alternatively you can just load the content of the *.ttf file as a binary string using fetch or XMLHttpRequest and add the font to the PDF file:
const doc = new jsPDF();
const myFont = ... // load the *.ttf font file as binary string
// add the font to jsPDF
doc.addFileToVFS("MyFont.ttf", myFont);
doc.addFont("MyFont.ttf", "MyFont", "normal");
*/
import { textToParagraphs } from '../../core/helpers/strings';

import { jsPDF } from "jspdf";

import addCourierNewNormal from '../../core/assets/fonts/courierNewNormal';
import addCourierNewBold from '../../core/assets/fonts/courierNewBold';
import addCourierNewItalic from '../../core/assets/fonts/courierNewItalic';
import addCourierNewBoldItalic from '../../core/assets/fonts/courierNewBoldItalic';

import addTrebuchetMSNormal from '../../core/assets/fonts/trebuchetMSNormal';
import addTrebuchetMSBold from '../../core/assets/fonts/trebuchetMSBold';
import addTrebuchetMSItalic from '../../core/assets/fonts/trebuchetMSItalic';
import addTrebuchetMSBoldItalic from '../../core/assets/fonts/trebuchetMSBoldItalic';

jsPDF.API.events.push( [ 'addFonts', addCourierNewNormal ] );
jsPDF.API.events.push( [ 'addFonts', addCourierNewBold ] );
jsPDF.API.events.push( [ 'addFonts', addCourierNewItalic ] );
jsPDF.API.events.push( [ 'addFonts', addCourierNewBoldItalic ] );

jsPDF.API.events.push( [ 'addFonts', addTrebuchetMSNormal ] );
jsPDF.API.events.push( [ 'addFonts', addTrebuchetMSBold ] );
jsPDF.API.events.push( [ 'addFonts', addTrebuchetMSItalic ] );
jsPDF.API.events.push( [ 'addFonts', addTrebuchetMSBoldItalic ] );

/*const testPDF = () => {
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    pdf.setFont( 'courierNewNormal', 'normal' );
    pdf.setFontSize( 11 );
    //pdf.setTextColor( 100, 100, 100 );
    pdf.text( 20, 10, 'Κατάσταση οικονομικών, title somewhere here?!' );

    pdf.setFont( 'trebuchetMSNormal', 'normal' );
    pdf.text( 20, 20, 'Κατάσταση οικονομικών, title somewhere here?!' );

    pdf.setFont( 'courier', 'normal' );
    pdf.setFontSize( 21 );
    pdf.text( 20, 30, 'Data rows starts somewhere here?!' );
    pdf.text( 20, 40, '---------------------------------' );

    pdf.setFont( 'courierNewBold', 'bold' );
    pdf.text( 20, 50, 'Κατάσταση οικονομικών, title somewhere here?!' );

    pdf.setFont( 'courierNewItalic', 'italic' );
    pdf.text( 20, 60, 'Κατάσταση οικονομικών, title somewhere here?!' );

    pdf.setFont( 'courierNewBoldItalic', 'bolditalic' );
    pdf.text( 20, 70, 'Κατάσταση οικονομικών, title somewhere here?!' );

    pdf.setFont( 'trebuchetMSBold', 'bold' );
    pdf.text( 20, 80, 'Κατάσταση οικονομικών, title somewhere here?!' );

    pdf.setFont( 'trebuchetMSItalic', 'italic' );
    pdf.text( 20, 90, 'Κατάσταση οικονομικών, title somewhere here?!' );

    // https://micropyramid.com/blog/export-html-web-page-to-pdf-using-jspdf/

//    pdf.save( 'test.pdf' )

    const blobPDF =  new Blob( [ pdf.output( 'blob' ) ], { type : 'application/pdf' } );
    const blobURL = URL.createObjectURL( blobPDF );
    window.open( blobURL );
}*/

const offsetX = ( width, align ) => align === 'center' ? width / 2 : align === 'right' ? width - 1 : 1;
const offsetY = ( height ) => height * 0.8;

const printHeader = ( { pdf, config, left, top, overHeader, header, underHeader } ) => {

    const { PAGE_WIDTH, ROW_HEIGHT, FONT_SIZE } = config;

    top += ROW_HEIGHT;
    let coordX = PAGE_WIDTH / 2;
    let coordY = top;

    pdf.setFontSize( FONT_SIZE );
    pdf.text( overHeader, coordX, coordY, 'center' );

    top += ROW_HEIGHT;
    top += ROW_HEIGHT;
    coordY = top;

    pdf.setFontSize( FONT_SIZE + 2 );
    pdf.text( header, coordX, coordY, 'center' );

    top += ROW_HEIGHT;
    top += ROW_HEIGHT;
    coordY = top;

    pdf.setFontSize( FONT_SIZE );
    pdf.text( underHeader, coordX, coordY, 'center' );

    top += ROW_HEIGHT;
    return top;
}

const printLabels = ( { pdf, config, left, top, cols, labels } ) => {

    const { ROW_HEIGHT, FONT_SIZE } = config;

    pdf.setFontSize( FONT_SIZE );

    top += ROW_HEIGHT;
    let coordX = left;
    let coordY = top;

    Object.keys( cols ).forEach( key => {
        const { width } = cols[ key ];

        // pdf.rect( coordX, coordY, width, ROW_HEIGHT );

        pdf.line(
            coordX, 
            coordY, 
            coordX + width, 
            coordY
        );

        coordX += width;
    } );

    top += ROW_HEIGHT;
    coordX = left;
    coordY = top;

    Object.keys( cols ).forEach( key => {
        const { width, align } = cols[ key ];

        pdf.text( 
            labels[ key ], 
            coordX + offsetX( width, align ), 
            coordY + offsetY( ROW_HEIGHT ), 
            align 
        );

        coordX += width;
    } );

    top += ROW_HEIGHT;
    coordX = left;
    coordY = top;

    Object.keys( cols ).forEach( key => {
        const { width } = cols[ key ];

        pdf.line(
            coordX + 1, 
            coordY + ROW_HEIGHT, 
            coordX + width - 1, 
            coordY + ROW_HEIGHT
        );

        coordX += width;
    } );

    return top;
}

const printRows = ( { pdf, config, left, top, cols, rows, page } ) => {

    const { ROWS_PER_PAGE, ROW_HEIGHT } = config;

    const firstRow = ( page - 1 ) * ROWS_PER_PAGE;
    const lastRow = Math.min( page * ROWS_PER_PAGE, rows.length ) - 1;

    for ( let i = firstRow; i <= lastRow; i++ ) {

        top += ROW_HEIGHT * ( i === firstRow && rows[ i ] ? 2: 1 );

        if ( rows[ i ] ) {

            let coordX = left;
            let coordY = top;

            Object.keys( cols ).forEach( key => {
                const { width, align } = cols[ key ];

                const text = ! [ undefined, null ].includes( rows[ i ][ key ] ) 
                    ? `${ rows[ i ][ key ] }`
                    : '';

                pdf.text( 
                    text, 
                    coordX + offsetX( width, align ), 
                    coordY + offsetY( ROW_HEIGHT ), 
                    align 
                );

                coordX += width;
            } );
        }
    }

    return top;
}

const printTotals = ( { pdf, config, left, top, cols, totals } ) => {

    const { ROW_HEIGHT } = config;

    top += ROW_HEIGHT;
    top += ROW_HEIGHT;
    let coordX = left;
    let coordY = top;

    Object.keys( cols ).forEach( key => {
        const { width } = cols[ key ];

        if ( totals[ key ] !== undefined ) {
            // pdf.rect( coordX, coordY, width, ROW_HEIGHT );

            pdf.line( 
                coordX + 1, 
                coordY, 
                coordX + width - 1, 
                coordY
            );
        }

        coordX += width;
    } );

    top += ROW_HEIGHT;
    coordX = left;
    coordY = top;

    Object.keys( cols ).forEach( key => {
        const { width, align } = cols[ key ];

        if ( totals[ key ] !== undefined ) {
            pdf.text( 
                totals[ key ], 
                coordX + offsetX( width, align ), 
                coordY + offsetY( ROW_HEIGHT ), 
                align 
            );
        }

        coordX += width;
    } );

    return top;
}

const printFooter = ( { pdf, config, left, top, footer } ) => {

    const { PAGE_WIDTH, FONT_SIZE } = config;

    let coordY = top;
    let coordX = PAGE_WIDTH / 2;

    pdf.setFontSize( FONT_SIZE - 1 );
    pdf.text( footer, coordX, coordY, 'center' );

    return;
}

const getPdfConfig = ( {
    MARGIN_LEFT, 
    MARGIN_TOP, 
    MARGIN_RIGHT, 
    MARGIN_BOTTOM, 
    ROW_WIDTH, 
    ROW_HEIGHT, 
    FONT_NAME,
    FONT_SIZE,
    ORIENTATION,
    staticRows,
    dynamicRows
} ) => {

    MARGIN_LEFT = MARGIN_LEFT || 20;
    MARGIN_TOP = MARGIN_TOP || 20;
    MARGIN_RIGHT = MARGIN_RIGHT || 20;
    MARGIN_BOTTOM = MARGIN_BOTTOM || 20;
    ROW_WIDTH = ROW_WIDTH || 0;
    ROW_HEIGHT = ROW_HEIGHT || 3.5;
    FONT_NAME = FONT_NAME || 'Arial';
    FONT_SIZE = FONT_SIZE || 10;
    ORIENTATION = ORIENTATION || ( MARGIN_LEFT + ROW_WIDTH + MARGIN_RIGHT <= 210 ? 'portrait' : 'landscape' );

    const PAGE_WIDTH = ORIENTATION === 'portrait' ? 210 : 297;
    const PAGE_HEIGHT = ORIENTATION === 'portrait' ? 297 : 210;
    const ROWS_PER_PAGE = parseInt( ( PAGE_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM ) / ROW_HEIGHT ) - staticRows;

    let PAGES = parseInt( dynamicRows / ROWS_PER_PAGE );
    PAGES += dynamicRows % ROWS_PER_PAGE ? 1 : 0;
    PAGES += PAGES === 0 ? 1 : 0;

    return { 
        MARGIN_LEFT, 
        MARGIN_TOP, 
        MARGIN_RIGHT, 
        MARGIN_BOTTOM, 
        ROW_WIDTH, 
        ROW_HEIGHT, 
        FONT_NAME,
        FONT_SIZE, 
        ORIENTATION, 
        PAGE_WIDTH, 
        PAGE_HEIGHT, 
        ROWS_PER_PAGE,
        PAGES
    };
}

const getRows = ( { result, cols, font } ) => {

    const rows = [];

    for ( const row of result ) {

        // to replace null or undefined values
        Object.keys( cols ).forEach( key => row[ key ] = row[ key ] || '' );

        // to convert to strings
        Object.keys( cols ).forEach( key => row[ key ] = row[ key ].toString() );

        // add line breaks to strings according to coloumn width
        Object.keys( cols ).forEach( key => {
            row[ key ] = textToParagraphs( { 
                text: row[ key ], 
                font, 
                width: cols[ key ].width * 3.78  // pixels = mm * 3.78
            } ).join( '\n' );
        } );
        
        // split strings including line breaks to arrays
        Object.keys( row ).forEach( key => row[ key ] = row[ key ] || '' );
        Object.keys( row ).forEach( key => row[ key ] = row[ key ].toString().split( '\n' ) );

        // find the max length of the arrays
        const maxLength = Object.keys( row )
            .map( key => row[ key ].length )
            .reduce( ( maxLength = 0, length ) => maxLength = length > maxLength ? length : maxLength );

        // add an blank row
        const newRow = null;
        rows.push( newRow );

        // add rows created per result row
        for ( let i = 0; i < maxLength; i++ ) {
            const newRow = {};
            Object.keys( row ).forEach( key => newRow[ key ] = row[ key ][ i ] ? row[ key ][ i ] + '' : '' );
            rows.push( newRow );
        }
    }

    return rows;
}

const getPdfFile = ( { overHeader, header, underHeader, cols, labels, result, totals, footer } ) => {

    const rows = getRows( { 
        result,
        cols,
        font: 'trebuchetMSNormal 8px',
    } );

    const ROW_WIDTH = Object.keys( cols )
        .map( key => cols[ key ].width )
        .reduce( ( total, width ) => total + width );

    const config = getPdfConfig( { 
        MARGIN_LEFT: 10,
        MARGIN_TOP: 15,
        MARGIN_RIGHT: 10,
        MARGIN_BOTTOM: 15,
        ROW_WIDTH,
        FONT_NAME: 'trebuchetMSNormal',
        FONT_SIZE: 8,    
        staticRows: 6 + 3 + 3,  // header + labels + footer
        dynamicRows: rows.length + 3,  // rows + totals
    } );

    const { ORIENTATION, MARGIN_TOP, MARGIN_BOTTOM, FONT_NAME, PAGE_WIDTH, PAGE_HEIGHT, PAGES, ROW_HEIGHT } = config;

    const pdf = new jsPDF( { format: 'a4', orientation: ORIENTATION, unit: 'mm' } );
    pdf.setFont( FONT_NAME, 'normal' );  // https://micropyramid.com/blog/export-html-web-page-to-pdf-using-jspdf/

    const left = ( PAGE_WIDTH - ROW_WIDTH ) / 2;

    for ( let page = 1; page <= PAGES; page++ ) {

        if ( page > 1 ) {
            pdf.addPage();
        }

        let top = MARGIN_TOP;

        top = printHeader( { pdf, config, left, top, overHeader, header, underHeader } );

        top = printLabels( { pdf, config, left, top, cols, labels } );
    
        top = printRows( { pdf, config, left, top, cols, rows, page } );

        if ( page === PAGES ) {
            top = printTotals( { pdf, config, left, top, cols, totals } );
        }

        top = PAGE_HEIGHT - MARGIN_BOTTOM + ROW_HEIGHT;

        printFooter( { pdf, config, left, top, footer: `${ footer } ${ page }/${ PAGES }` } );
    }

    const blobPDF =  pdf.output( 'blob' );
    // const blobPDF =  new Blob( [ pdf.output() ], { type : 'application/pdf' } );
    const blobURL = URL.createObjectURL( blobPDF );
    window.open( blobURL );
}

export  { getPdfFile };