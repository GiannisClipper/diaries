import { useEffect } from 'react';

function ReportsLoader( { diary_id, actions, assets, lexicon, state } ) {

    const data = [
        { diary_id, descr: lexicon.report.descr_notes, type: 'note' },
        { diary_id, descr: lexicon.report.descr_payments, type: 'payment' },
        { diary_id, descr: lexicon.report.descr_payments_month, type: 'payment', groupBy: 'month' },
        { diary_id, descr: lexicon.report.descr_payments_week, type: 'payment', groupBy: 'week' },
        { diary_id, descr: lexicon.report.descr_payments_genre, type: 'payment', groupBy: 'genre' },
        { diary_id, descr: lexicon.report.descr_payments_fund, type: 'payment', groupBy: 'fund' }
    ];
    
    const { _uiux } = state;

    useEffect( () => {
        if ( ! _uiux.page.isOpen ) {
            actions.openPage( { assets, data } );
        }
    } );

    return null;
}

export default ReportsLoader;
