import { YYYYMMDDToDate, YYYYMMDDToRepr } from '../../core/helpers/dates';
import { noIntonation } from '../../core/helpers/strings';

const cols = {
    sn: { width: 10, align: 'center' },
    date: { width: 30, align: 'center' },
    note: { width: 140, align: 'left' },
};

const labels = ( lexicon ) => ( {
    sn: lexicon.reports.sn,
    date: lexicon.entries.date,
    note: lexicon.notes.note,
} )

const normalizeRows = ( { lexicon, result } ) => {

    let sn = 0;

    result.forEach( row => {
        row.sn = ++sn;
        const day = YYYYMMDDToDate( row.date ).getDay();
        const dayName = noIntonation( lexicon.core.days[ day ].substr( 0, 2 ) );
        const dateRepr = YYYYMMDDToRepr( row.date );
        row.date = `${ dayName } ${ dateRepr }`;
    } );

    return result;
}

export default { cols, labels, normalizeRows };
export { cols, labels, normalizeRows };