import { useEffect } from 'react';

function ReportsLoader( { actions, assets, lexicon, state } ) {

    const data = [
        { descr: lexicon.descr_notes, type: 'note' },
        { descr: lexicon.descr_payments, type: 'payment' }
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
