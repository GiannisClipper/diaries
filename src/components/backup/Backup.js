import React, { useContext, useEffect  } from 'react';

import { RowBox, RowValue, RowMenu } from '../commons/RowBox';

import { retrieveRequestFeature } from '../core/features/requests';
import { CoreMenu, RetrieveOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import saveAsTextFile from '../core/helpers/saveAsTextFile';

import { AppContext } from '../app/AppContext';
import { urls } from '../app/assets/urls';

import assets from './assets/assets';
import BackupForm from './BackupForm';

function Backup( { lexicon } ) {

    const { state, actions } = useContext( AppContext );
    const { backup } = state;
    const { _uiux } = backup;

    const retrieveMode = presetAction( actions.retrieveMode, { assets } );
    const openForm = presetAction( actions.openForm, { assets } );
    const retrieveResponseOkAfter = presetAction( actions.retrieveResponseOkAfter, { assets } );

    useEffect( () => {
        
        if ( ! _uiux.status.isResponseOk ) {
            retrieveRequestFeature( { 
                _item: backup,
                actions,
                assets,
                url: urls.backup
            } );

        } else {
            const { _uiux, ...data } = backup;
            const stringified = JSON.stringify( data, null, 2 );  // spacing = 2
            saveAsTextFile( stringified, 'backup.json' );
            retrieveResponseOkAfter();
        }

    } );

    return (
        <RowBox>

            <RowValue>
                <span>{ lexicon.backup.descr }</span>
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