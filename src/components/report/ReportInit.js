import { useEffect, useContext } from 'react';
import { ReportsContext } from './ReportsContext';

function ReportInit() {

    const { state, dispatch } = useContext( ReportsContext );
    const { _uiux } = state;

    useEffect( () => {
        if ( Object.keys( _uiux.process ).length === 0 ) {  // process === {}
            dispatch( { 
                type: 'DO_INIT', 
                payload: {}
            } );
        }
    } );

    return null;
}

export default ReportInit;
