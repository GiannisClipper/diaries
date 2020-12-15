import React, { useEffect, useContext } from 'react';
import { STATEContext } from './STATEContext';

const namespace = 'reports';

function ReportInit( { process } ) {

    const STATE = useContext( STATEContext );
    const { dispatch } = STATE;

    useEffect( () => {
        if ( Object.keys( process ).length === 0 ) {  // process === {}
            dispatch( { namespace, type: 'DO_INIT', payload: {} } );
        }
    } );

    return <></>;
}

export default ReportInit;
