import React, { useContext, useEffect  } from 'react';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { RetrieveRequest } from '../core/CoreRequests';
import { CoreMenu, RetrieveMenuOption } from '../core/CoreMenu';
import prepayAction from '../core/helpers/prepayAction';
import saveAsTextFile from '../core/helpers/saveAsTextFile';

import { AppContext } from '../app/AppContext';

import assets from './assets/assets';
import BackupForm from './BackupForm';

function Backup() {

    const { state, actions } = useContext( AppContext );
    const { backup } = state;
    const { _uiux } = backup;

    const openForm = prepayAction( actions.openForm, { assets } );

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
                assets={ assets }
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
                <BackupForm
                    backup={ backup }
                    actions={ actions }
                    assets={ assets }
                />
            : null }

        </>
    );
}

export default Backup;
export { Backup };