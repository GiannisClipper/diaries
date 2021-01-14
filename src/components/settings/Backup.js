import React, { useContext, useEffect  } from 'react';

import { AppContext } from '../app/AppContext';
import { RetrieveRequest } from '../core/CoreRequests';
import { CoreMenu, RetrieveMenuOption } from '../core/CoreMenu';
import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import BackupForm from './BackupForm';
import saveAsTextFile from '../../helpers/saveAsTextFile';

function Backup() {

    const { state, actions, assets } = useContext( AppContext );
    const { backup } = state;
    const { _uiux } = backup;

    const openForm = payload => actions.openForm( { ...payload, assets: assets.backup } );

    useEffect( () => {
        if ( _uiux.status.isResponseOk ) {
            delete backup._uiux;
            const content = JSON.stringify( backup, null, 2 );  // spacing = 2
            backup._uiux = _uiux;
            saveAsTextFile( content, 'backup.json' );
        }
    }, [ _uiux, backup ] );

    return (
        <>
            <RetrieveRequest 
                Context={ AppContext }
                assets={ assets.backup }
                url={ `/.netlify/functions/backup` }
            />

            <RowBox>
                <RowValue>
                    <span>{ `Αντίγραφο βάσης δεδομένων σε αρχείο json.` }</span>
                </RowValue>

                <RowMenu>
                    <CoreMenu status={ _uiux.status } >
                        <RetrieveMenuOption openForm={ openForm } />
                    </CoreMenu>
                </RowMenu>
            </RowBox>

            { _uiux.form.isOpen ?
                <BackupForm />
            : null }

        </>
    );
}

export default Backup;
export { Backup };