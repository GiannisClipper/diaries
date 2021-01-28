import { useEffect } from 'react';

const data = [
    { descr: 'Κατάσταση σημειωμάτων', type: 'note' },
    { descr: 'Κατάσταση οικονομικών κινήσεων', type: 'payment' }
];

function ReportsLoader( { actions, assets, state } ) {

    const { _uiux } = state;

    useEffect( () => {
        if ( ! _uiux.page.isOpen ) {
            actions.openPage( { assets, data } );
        }
    } );

    return null;
}

export default ReportsLoader;
