import { jsPDF } from "jspdf";
import { addFonts } from './fonts/jsPDFGreekFonts';

jsPDF.API.events.push( [ 'addFonts', addFonts ] );

const paymentsPDF = data => {
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    pdf.setFont( 'courierNewNormal', 'normal' );
    pdf.setFontSize( 16 );
    pdf.setTextColor( 100, 100, 100 );
    pdf.text( 20, 20, 'Κατάσταση οικονομικών, title somewhere here?!' );

    pdf.setFont( 'courier', 'normal' );
    pdf.setFontSize( 12 );
    pdf.setTextColor( 0, 0, 0 );
    pdf.text( 20, 30, 'Data rows starts somewhere here?!' );
    pdf.text( 20, 40, '---------------------------------' );

    pdf.setFont( 'courierNewBold', 'bold' );
    pdf.setFontSize( 16 );
    pdf.setTextColor( 100, 100, 100 );
    pdf.text( 20, 50, 'Κατάσταση οικονομικών, title somewhere here?!' );

    pdf.setFont( 'courierNewItalic', 'italic' );
    pdf.setFontSize( 16 );
    pdf.setTextColor( 100, 100, 100 );
    pdf.text( 20, 60, 'Κατάσταση οικονομικών, title somewhere here?!' );

    pdf.setFont( 'courierNewBoldItalic', 'bolditalic' );
    pdf.setFontSize( 16 );
    pdf.setTextColor( 100, 100, 100 );
    pdf.text( 20, 70, 'Κατάσταση οικονομικών, title somewhere here?!' );

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