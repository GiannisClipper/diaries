import React, { useContext, useEffect  } from 'react';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { retrieveRequestFeature } from '../core/features/requests';
import { CoreMenu, RetrieveOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import saveAsTextFile from '../core/helpers/saveAsTextFile';

import { AppContext } from '../app/AppContext';

import assets from './assets/assets';
import BackupForm from './BackupForm';

function Backup( { lexicon } ) {

    const { state, actions } = useContext( AppContext );
    const { backup } = state;
    const { _uiux } = backup;

    const retrieveMode = presetAction( actions.retrieveMode, { assets } );
    const openForm = presetAction( actions.openForm, { assets } );

    useEffect( () => {
        
        if ( ! _uiux.status.isResponseOk ) {
            retrieveRequestFeature( { 
                _item: backup,
                actions,
                assets,
                url: `/.netlify/functions/backup`
            } );

        } else {
            delete backup._uiux;
            const content = JSON.stringify( backup, null, 2 );  // spacing = 2
            backup._uiux = _uiux;

            saveAsTextFile( content, 'backup.json' );
        }

    } );

    return (
        <RowBox>

            <RowValue>
                <span>{ `Αντίγραφο βάσης δεδομένων σε αρχείο json.` }</span>
            </RowValue>

            <RowMenu>
                <CoreMenu status={ _uiux.status } >
                    <RetrieveOption 
                        lexicon={ lexicon }
                        onClick={ () => { 
                            retrieveMode(); 
                            openForm(); 
                        } }
                    />
                </CoreMenu>
            </RowMenu>

            { _uiux.form.isOpen ?
                <BackupForm
                    backup={ backup }
                    actions={ actions }
                    assets={ assets }
                    lexicon={ lexicon }
                />
            : null }

        </RowBox>
    );
}

export default Backup;
export { Backup };