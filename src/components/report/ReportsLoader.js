import { useEffect } from 'react';

function ReportsLoader( { actions, assets, lexicon, state } ) {

    const data = [
        { descr: lexicon.report.descr_notes, type: 'note' },
        { descr: lexicon.report.descr_payments, type: 'payment' }
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
