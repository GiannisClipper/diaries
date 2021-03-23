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

const testPDF = () => {
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
}

const TOP = 10;
const LEFT = 10;
const rowHeight = 8;
const rowsPerPage = 20;

const offsetX = ( width, align ) => align === 'center' ? width / 2 : align === 'right' ? width - 1 : 1;
const offsetY = ( height ) => height * 0.7;


const printTitle = ( { pdf, top, title, rowHeight } ) => {
    let coordY = top;
    let coordX = 148.5;

    pdf.setFontSize( 10 );
    pdf.text( title, coordX, coordY, 'center' );

    top += rowHeight;
    return top;
}

const printLabels = ( { pdf, top, cols, labels, rowHeight } ) => {
    pdf.setFontSize( 8 );

    let coordY = top;
    let coordX = LEFT;

    Object.keys( cols ).forEach( key => {
        const { width, align } = cols[ key ];
        pdf.rect( 
            coordX, 
            coordY,
            width,
            rowHeight 
        );

        pdf.text( 
            labels[ key ], 
            coordX + offsetX( width, align ), 
            coordY + offsetY( rowHeight ), 
            align 
        );
        coordX += width;
    } );

    top += rowHeight;
    return top;
}

const printRows = ( { pdf, top, cols, rows, rowsPerPage, rowHeight, page } ) => {

    const firstRow = ( page - 1 ) * rowsPerPage;
    const lastRow = Math.min( page * rowsPerPage, rows.length ) - 1;

    for ( let i = firstRow; i <= lastRow; i++ ) {
        let coordX = LEFT;
        let coordY = top;

        Object.keys( cols ).forEach( key => {
            const { width, align } = cols[ key ];

            pdf.text( 
                rows[ i ][ key ] || '', 
                coordX + offsetX( width, align ), 
                coordY + offsetY( rowHeight ), 
                align 
            );

            coordX += width;
        } );

        top += rowHeight;    
    }

    return top;
}

const printTotals = ( { pdf, top, cols, totals, rowHeight } ) => {
    let coordY = top;
    let coordX = LEFT;

    Object.keys( cols ).forEach( key => {
        const { width, align } = cols[ key ];

        if ( totals[ key ] !== undefined ) {
            pdf.rect( 
                coordX, 
                coordY, 
                width, 
                rowHeight 
            );

            pdf.text( 
                totals[ key ], 
                coordX + offsetX( width, align ), 
                coordY + offsetY( rowHeight ), 
                align 
            );
        }

        coordX += width;
    } );

    top += rowHeight;
    return top;
}

const reportPDF = ( { title, cols, labels, result, totals } ) => {

    const pdf = new jsPDF( {
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    } );

    // https://micropyramid.com/blog/export-html-web-page-to-pdf-using-jspdf/
    pdf.setFont( 'trebuchetMSNormal', 'normal' );

    //pdf.setFont( 'Tahoma', 'normal' );
    // pdf.addFileToVFS( 'trebuchetMSNormal.ttf', base64TrebuchetMSNormal );
    // pdf.addFont( 'trebuchetMSNormal.ttf', 'trebuchetMSNormal', 'normal' );
    // pdf.setFont( 'trebuchetMSNormal' );

    let pages = parseInt( result.length / rowsPerPage );
    pages += result.length % 20 ? 1 : 0;
    pages += pages === 0 ? 1 : 0;

    for ( let page = 1; page <= pages; page++ ) {

        if ( page > 1 ) {
            pdf.addPage();
        }

        let top = TOP;

        title += ` (${ page }/${ pages })`;

        top = printTitle( { pdf, top, title, rowHeight } );

        top = printLabels( { pdf, top, cols, labels, rowHeight } );

        top = printRows( { pdf, top, cols, rows: result, rowsPerPage, rowHeight, page } );

        if ( page === pages ) {
            top = printTotals( { pdf, top, cols, totals, rowHeight } );
        }
    }

    const blobPDF =  pdf.output( 'blob' );
    // const blobPDF =  new Blob( [ pdf.output() ], { type : 'application/pdf' } );
    const blobURL = URL.createObjectURL( blobPDF );
    window.open( blobURL );
}

export  { reportPDF, testPDF };