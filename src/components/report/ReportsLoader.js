import { useContext, useEffect } from 'react';

import assets from './assets/assets'; 

import { ReportsContext } from './ReportsContext';
import { GenresContext } from '../payment/genre/GenresContext';
import { FundsContext } from '../payment/fund/FundsContext';

function ReportsLoader( { diary_id, lexicon } ) {

    const { state, actions } = useContext( ReportsContext );

    const genres_uiux = useContext( GenresContext ).state._uiux;
    const funds_uiux = useContext( FundsContext ).state._uiux;

    const data = [
        { diary_id, descr: lexicon.report.descr_notes, type: 'note' },

        { diary_id, descr: lexicon.report.descr_payments, type: 'payment' },
        { diary_id, descr: lexicon.report.descr_payments_month, type: 'payment', groupBy: 'month' },
        { diary_id, descr: lexicon.report.descr_payments_week, type: 'payment', groupBy: 'week' },
        { diary_id, descr: lexicon.report.descr_payments_genre, type: 'payment', groupBy: 'genre' },
        { diary_id, descr: lexicon.report.descr_payments_fund, type: 'payment', groupBy: 'fund' },

        { diary_id, descr: lexicon.report.descr_workouts, type: 'workout' },
        { diary_id, descr: lexicon.report.descr_workouts_month, type: 'workout', groupBy: 'month' },
        { diary_id, descr: lexicon.report.descr_workouts_week, type: 'workout', groupBy: 'week' },
        { diary_id, descr: lexicon.report.descr_workouts_genre, type: 'workout', groupBy: 'genre' },
        { diary_id, descr: lexicon.report.descr_workouts_fund, type: 'workout', groupBy: 'equip' }
    ];
    
    const { _uiux } = state;

    useEffect( () => {
        if ( ! _uiux.page.isOpen ) {
            actions.openPage( { assets, data } );
            actions.retrieveManyResponseWaiting( { assets } );
            
        } else if ( _uiux.status.isResponseWaiting ) {
            const status1 = genres_uiux.status;
            const status2 = funds_uiux.status;
    
            if ( status1.isResponseOkAfter && status2.isResponseOkAfter ) {
                actions.retrieveManyResponseOkAfter( { assets } );
    
            } else if ( status1.isResponseError || status2.isResponseError ) {
                actions.retrieveManyResponseError( { assets } );
            }    

        }
    } );

    return null;
}

export default ReportsLoader;
