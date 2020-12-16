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

import courierNewNormal from './courierNewNormal';
import courierNewBold from './courierNewBold';
import courierNewItalic from './courierNewItalic';
import courierNewBoldItalic from './courierNewBoldItalic';

function addFonts() {
    this.addFileToVFS( 'courierNewNormal.ttf', courierNewNormal );
    this.addFont( 'courierNewNormal.ttf', 'courierNewNormal', 'normal' );

    this.addFileToVFS( 'courierNewBold.ttf', courierNewBold );
    this.addFont( 'courierNewBold.ttf', 'courierNewBold', 'bold' );

    this.addFileToVFS( 'courierNewItalic.ttf', courierNewItalic );
    this.addFont( 'courierNewItalic.ttf', 'courierNewItalic', 'italic' );
    
    this.addFileToVFS( 'courierNewBoldItalic.ttf', courierNewBoldItalic );
    this.addFont( 'courierNewBoldItalic.ttf', 'courierNewBoldItalic', 'bolditalic' );
};

export { addFonts };