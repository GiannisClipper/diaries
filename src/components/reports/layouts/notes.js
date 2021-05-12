import { calcDayOfWeek, setDateRepr } from '@giannisclipper/date';
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
        let day = calcDayOfWeek( row.date );
        day = day === 7 ? 0 : day;
        const dayName = noIntonation( lexicon.core.days[ day ].substr( 0, 2 ) );
        const dateRepr = setDateRepr( row.date );
        row.date = `${ dayName } ${ dateRepr }`;
    } );

    return result;
}

export default { cols, labels, normalizeRows };
export { cols, labels, normalizeRows };