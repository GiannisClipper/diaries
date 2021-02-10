import { YYYYMMDDToRepr } from '../../core/helpers/dates';
import { getFromList } from '../../core/helpers/getFromList';

import { reportPDF } from './reportPDF';

const paymentsPDF = ( { lexicon, descr, dateFrom, dateTill, result, genres, funds } ) => {

    const title = `${ descr } (${ YYYYMMDDToRepr( dateFrom ) }-${ YYYYMMDDToRepr( dateTill ) })`;

    const cols = {
        date: { width: 20, align: 'center' },
        genre_name: { width: 70, align: 'left' },
        incoming: { width: 20, align: 'right' },
        outgoing: { width: 20, align: 'right' },
        fund_name: { width: 70, align: 'left' },
        remark: { width: 70, align: 'left' },
    };

    const labels = {
        date: lexicon.entry.date,
        genre_name: lexicon.payment.genre_name,
        incoming: lexicon.payment.incoming,
        outgoing: lexicon.payment.outgoing,
        fund_name: lexicon.payment.fund_name,
        remark: lexicon.payment.remark,
    };

    result.forEach( x => x.date = YYYYMMDDToRepr( x.date ) );

    const totals = {
        incoming: 0,
        outgoing: 0,
        remark: `${ lexicon.report.difference } = `,
    };

    result.forEach( x => {
        let incoming = parseFloat( x.incoming );
        let outgoing = parseFloat( x.outgoing );
        totals.incoming += isNaN( incoming ) ? 0 : incoming;
        totals.outgoing += isNaN( outgoing ) ? 0 : outgoing;
    } );

    totals.remark += ( totals.incoming - totals.outgoing ).toFixed( 2 );
    totals.incoming = totals.incoming.toFixed( 2 );
    totals.outgoing = totals.outgoing.toFixed( 2 );

    result.forEach( x => {
        x.genre_name = x.genre_id
            ? getFromList( genres, 'id', x.genre_id ).name
            : '';
        x.fund_name = x.fund_id
            ? getFromList( funds, 'id', x.fund_id ).name
            : '';
    } );

    reportPDF( { title, cols, labels, result, totals } );
}

export  { paymentsPDF };