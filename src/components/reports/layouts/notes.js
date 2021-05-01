import { YYYYMMDDToRepr } from '../../core/helpers/dates';

const cols = {
    sn: { width: 10, align: 'center' },
    date: { width: 20, align: 'center' },
    note: { width: 70, align: 'left' },
};

const labels = ( lexicon ) => ( {
    sn: lexicon.reports.sn,
    date: lexicon.entries.date,
    note: lexicon.notes.note,
} )

const normalizeRows = ( { result } ) => {

    let sn = 0;

    result.forEach( row => {
        row.sn = ++sn;
        row.date = YYYYMMDDToRepr( row.date );
    } );

    return result;
}

export default { cols, labels, normalizeRows };
export { cols, labels, normalizeRows };