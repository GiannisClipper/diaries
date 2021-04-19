import { useContext, useEffect } from 'react';

import assets from './assets/assets'; 

import { ReportsContext } from './ReportsContext';

function ReportsLoader( { diary_id, lexicon } ) {

    const { state, actions } = useContext( ReportsContext );

    const data = [
        { diary_id, descr: lexicon.reports.descr_notes, type: 'note' },

        { diary_id, descr: lexicon.reports.descr_payments, type: 'payment' },
        { diary_id, descr: lexicon.reports.descr_payments_month, type: 'payment', groupBy: 'month' },
        { diary_id, descr: lexicon.reports.descr_payments_week, type: 'payment', groupBy: 'week' },
        { diary_id, descr: lexicon.reports.descr_payments_genre, type: 'payment', groupBy: 'genre' },
        { diary_id, descr: lexicon.reports.descr_payments_fund, type: 'payment', groupBy: 'fund' },

        { diary_id, descr: lexicon.reports.descr_workouts, type: 'workout' },
        { diary_id, descr: lexicon.reports.descr_workouts_month, type: 'workout', groupBy: 'month' },
        { diary_id, descr: lexicon.reports.descr_workouts_week, type: 'workout', groupBy: 'week' },
        { diary_id, descr: lexicon.reports.descr_workouts_genre, type: 'workout', groupBy: 'genre' },
        { diary_id, descr: lexicon.reports.descr_workouts_fund, type: 'workout', groupBy: 'equip' }
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
