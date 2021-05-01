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
const offsetY = ( height ) => height * 0.7;

const printHeader = ( { pdf, config, left, top, overHeader, header, underHeader } ) => {

    const { PAGE_WIDTH, ROW_HEIGHT, FONT_SIZE } = config;

    let coordX = PAGE_WIDTH / 2;
    let coordY = top;

    pdf.setFontSize( FONT_SIZE );
    pdf.text( overHeader, coordX, coordY, 'center' );

    top += ROW_HEIGHT;
    coordY = top;

    pdf.setFontSize( FONT_SIZE + 2 );
    pdf.text( header, coordX, coordY, 'center' );

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

    let coordX = left;
    let coordY = top;

    Object.keys( cols ).forEach( key => {
        const { width, align } = cols[ key ];

        // pdf.rect( coordX, coordY, width, ROW_HEIGHT );

        pdf.line( 
            coordX, 
            coordY, 
            coordX + width, 
            coordY
        );

        pdf.text( 
            labels[ key ], 
            coordX + offsetX( width, align ), 
            coordY + offsetY( ROW_HEIGHT ), 
            align 
        );

        pdf.line( 
            coordX + 1, 
            coordY + ROW_HEIGHT, 
            coordX + width - 1, 
            coordY + ROW_HEIGHT
        );

        coordX += width;
    } );

    top += ROW_HEIGHT;
    return top;
}

const printRows = ( { pdf, config, left, top, cols, rows, page } ) => {

    const { ROWS_PER_PAGE, ROW_HEIGHT } = config;

    const firstRow = ( page - 1 ) * ROWS_PER_PAGE;
    const lastRow = Math.min( page * ROWS_PER_PAGE, rows.length ) - 1;

    for ( let i = firstRow; i <= lastRow; i++ ) {
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

        top += ROW_HEIGHT;    
    }

    return top;
}

const printTotals = ( { pdf, config, left, top, cols, totals } ) => {

    const { ROW_HEIGHT } = config;

    let coordX = left;
    let coordY = top;

    Object.keys( cols ).forEach( key => {
        const { width, align } = cols[ key ];

        if ( totals[ key ] !== undefined ) {
            // pdf.rect( coordX, coordY, width, ROW_HEIGHT );

            pdf.line( 
                coordX + 1, 
                coordY, 
                coordX + width - 1, 
                coordY
            );    

            pdf.text( 
                totals[ key ], 
                coordX + offsetX( width, align ), 
                coordY + offsetY( ROW_HEIGHT ), 
                align 
            );
    
        }

        coordX += width;
    } );

    top += ROW_HEIGHT;
    return top;
}

const printFooter = ( { pdf, config, footer } ) => {

    const { PAGE_WIDTH, PAGE_HEIGHT, FONT_SIZE } = config;

    let coordY = PAGE_HEIGHT * 0.95;
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
    FONT_SIZE,
    ORIENTATION,
} ) => {

    MARGIN_LEFT = MARGIN_LEFT || 20;
    MARGIN_TOP = MARGIN_TOP || 20;
    MARGIN_RIGHT = MARGIN_RIGHT || 20;
    MARGIN_BOTTOM = MARGIN_BOTTOM || 20;
    ROW_WIDTH = ROW_WIDTH || 0;
    ROW_HEIGHT = ROW_HEIGHT || 7;
    FONT_SIZE = FONT_SIZE || 8;
    ORIENTATION = ORIENTATION || ( MARGIN_LEFT + ROW_WIDTH + MARGIN_RIGHT <= 210 ? 'portrait' : 'landscape' );

    const PAGE_WIDTH = ORIENTATION === 'portrait' ? 210 : 297;
    const PAGE_HEIGHT = ORIENTATION === 'portrait' ? 297 : 210;
    const ROWS_PER_PAGE = parseInt( ( PAGE_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM ) / ROW_HEIGHT );

    return { 
        MARGIN_LEFT, 
        MARGIN_TOP, 
        MARGIN_RIGHT, 
        MARGIN_BOTTOM, 
        ROW_WIDTH, 
        ROW_HEIGHT, 
        FONT_SIZE, 
        ORIENTATION, 
        PAGE_WIDTH, 
        PAGE_HEIGHT, 
        ROWS_PER_PAGE 
    };
}

const getPdfFile = ( { overHeader, header, underHeader, cols, labels, result, totals, footer } ) => {

    const ROW_WIDTH = Object.keys( cols )
        .map( key => cols[ key ].width )
        .reduce( ( tot = 0, width ) => tot += width );

    const config = getPdfConfig( { MARGIN_LEFT: 10, MARGIN_TOP: 15, MARGIN_RIGHT: 10, MARGIN_BOTTOM: 20, ROW_WIDTH } );
    const { ORIENTATION, MARGIN_TOP, MARGIN_BOTTOM, PAGE_WIDTH, PAGE_HEIGHT, ROWS_PER_PAGE } = config;

    const pdf = new jsPDF( { format: 'a4', orientation: ORIENTATION, unit: 'mm' } );

    // https://micropyramid.com/blog/export-html-web-page-to-pdf-using-jspdf/
    pdf.setFont( 'trebuchetMSNormal', 'normal' );

    let pages = parseInt( result.length / ROWS_PER_PAGE );
    pages += result.length % ROWS_PER_PAGE ? 1 : 0;
    pages += pages === 0 ? 1 : 0;

    const layoutWidth = Object.keys( cols ).map( key => cols[ key ].width ).reduce( ( total, width ) => total + width );
    const left = ( PAGE_WIDTH - layoutWidth ) / 2;

    for ( let page = 1; page <= pages; page++ ) {

        if ( page > 1 ) {
            pdf.addPage();
        }

        let top = MARGIN_TOP;

        top = printHeader( { pdf, config, left, top, overHeader, header, underHeader } );

        top = printLabels( { pdf, config, left, top, cols, labels } );

        top = printRows( { pdf, config, left, top, cols, rows: result, page } );

        if ( page === pages ) {
            top = printTotals( { pdf, config, left, top, cols, totals } );
        }

        top = PAGE_HEIGHT - MARGIN_BOTTOM;

        printFooter( { pdf, config, footer: `${ footer } ${ page }/${ pages }` } );
    }

    const blobPDF =  pdf.output( 'blob' );
    // const blobPDF =  new Blob( [ pdf.output() ], { type : 'application/pdf' } );
    const blobURL = URL.createObjectURL( blobPDF );
    window.open( blobURL );
}

export  { getPdfFile };