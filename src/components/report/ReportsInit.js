import { useEffect, useContext } from 'react';
import { ReportsContext } from './ReportsContext';

function ReportsInit() {

    const { state, dispatch } = useContext( ReportsContext );
    const { _uiux } = state;

    useEffect( () => {
        if ( Object.keys( _uiux.status ).length === 0 ) {  // status === {}
            dispatch( { 
                type: 'DO_INIT', 
                payload: {}
            } );
        }
    } );

    return null;
}

export default ReportsInit;
