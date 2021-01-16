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

import addCourierNewNormal from './fonts/courierNewNormal';
import addCourierNewBold from './fonts/courierNewBold';
import addCourierNewItalic from './fonts/courierNewItalic';
import addCourierNewBoldItalic from './fonts/courierNewBoldItalic';

import addTrebuchetMSNormal from './fonts/trebuchetMSNormal';
import addTrebuchetMSBold from './fonts/trebuchetMSBold';
import addTrebuchetMSItalic from './fonts/trebuchetMSItalic';
import addTrebuchetMSBoldItalic from './fonts/trebuchetMSBoldItalic';

jsPDF.API.events.push( [ 'addFonts', addCourierNewNormal ] );
jsPDF.API.events.push( [ 'addFonts', addCourierNewBold ] );
jsPDF.API.events.push( [ 'addFonts', addCourierNewItalic ] );
jsPDF.API.events.push( [ 'addFonts', addCourierNewBoldItalic ] );

jsPDF.API.events.push( [ 'addFonts', addTrebuchetMSNormal ] );
jsPDF.API.events.push( [ 'addFonts', addTrebuchetMSBold ] );
jsPDF.API.events.push( [ 'addFonts', addTrebuchetMSItalic ] );
jsPDF.API.events.push( [ 'addFonts', addTrebuchetMSBoldItalic ] );

const paymentsPDF = data => {
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

    pdf.setFont( 'trebuchetMSBoldItalic', 'bolditalic' );
    pdf.text( 20, 100, 'Κατάσταση οικονομικών, title somewhere here?!' );

    // https://micropyramid.com/blog/export-html-web-page-to-pdf-using-jspdf/
    // const cols = {
    //     serial: { width: 10, value: null },
    //     date: { width: 30, value: null },
    //     genre: { width: 60, value: null },
    //     incoming: { width: 30, value: null },
    //     outgoing: { width: 30, value: null },
    //     remarks: { width: 60, value: null },
    //     fund: { width: 60, value: null },
    // };

    // let coordY = 80;


    const blobPDF =  new Blob( [ pdf.output() ], { type : 'application/pdf' } );
    const blobURL = URL.createObjectURL( blobPDF );
    window.open( blobURL );
}

export  { paymentsPDF };