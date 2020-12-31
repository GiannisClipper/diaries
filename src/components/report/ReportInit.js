import { useEffect, useContext } from 'react';
import { ReportsContext } from './ReportsContext';

function ReportInit( { process } ) {

    const { dispatch } = useContext( ReportsContext );

    useEffect( () => {
        if ( Object.keys( process ).length === 0 ) {  // process === {}
            dispatch( { 
                type: 'DO_INIT', 
                payload: {}
            } );
        }
    } );

    return null;
}

export default ReportInit;
