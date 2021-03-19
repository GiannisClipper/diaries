import { useEffect } from 'react';

function ReportsLoader( { diary_id, actions, assets, lexicon, state } ) {

    const data = [
        { diary_id, descr: lexicon.report.descr_notes, type: 'note' },
        { diary_id, descr: lexicon.report.descr_payments, type: 'payment' }
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
