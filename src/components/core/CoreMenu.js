import React, { useContext, useEffect } from 'react';
import { CoreContext } from './CoreContext';

import { Loader } from '../libs/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { EditTool, DeleteTool } from '../libs/Tools';

function CoreMenu( { options, process } ) {

    const { openForm } = useContext( CoreContext );

    return ( 
        process.isValidation || 
        process.isRequestBefore ||
        process.isRequest ||
        process.isResponseWaiting ?
            <Loader />

        : process.isResponseError ?
            <FontAwesomeIcon icon={faBan} className="icon" />

        : 
        <>
            { options.includes( 'C' ) ? <EditTool onClick={ event => openForm( { mode: { isCreate: true } } ) } /> : null }
            { options.includes( 'RM' ) ? <EditTool onClick={ event => openForm( { mode: { isRetrieveMany: true } } ) } /> : null }
            { options.includes( 'U' ) ? <EditTool onClick={ event => openForm( { mode: { isUpdate: true } } ) } /> : null }
            { options.includes( 'D' ) ? <DeleteTool onClick={ event => openForm( { mode: { isDelete: true } } ) } /> : null }
        </>
    );
}

export default CoreMenu;
export { CoreMenu };