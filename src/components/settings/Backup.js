import React, { useContext, useEffect  } from 'react';

import { CoreContextProvider } from '../core/CoreContext';
import actions from '../../storage/core/actions';
import { RetrieveRequest } from '../core/CoreRequests';
import { CoreMenu, RetrieveMenuOption } from '../core/CoreMenu';

import { AppContext } from '../app/AppContext';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import BackupForm from './BackupForm';

import saveAsTextFile from '../../helpers/saveAsTextFile';

function Backup() {

    const { state, dispatch } = useContext( AppContext );
    const { backup } = state;
    const { _uiux } = backup;

    const payload = {
        _namespace: 'backup',
    };

    useEffect( () => {
        if ( _uiux.process.isResponseOk ) {
            delete backup._uiux;
            const content = JSON.stringify( backup, null, 2 );  // spacing = 2
            backup._uiux = _uiux;
            saveAsTextFile( content, 'backup.json' );
        }
    }, [ _uiux, backup ] );

    return (
        <CoreContextProvider 
            actions={ [ 
                actions.form,
                actions.retrieveOne,
            ] }
            dispatch={ dispatch }
            namespace={ 'backup' }
            payload={ payload }
        >

            <RetrieveRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/backup` }
            />

            <RowBox>
                <RowValue>
                    <span>{ `Αντίγραφο βάσης δεδομένων σε αρχείο json.` }</span>
                </RowValue>

                <RowMenu>
                    <CoreMenu process={ _uiux.process } >
                        <RetrieveMenuOption />
                    </CoreMenu>
                </RowMenu>
            </RowBox>

            { _uiux.form.isOpen ?
                <BackupForm />
            : null }

        </CoreContextProvider>
    );
}

export default Backup;
export { Backup };