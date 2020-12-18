import React, { useContext, useEffect } from 'react';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { parseSettingsToDB } from '../storage/parsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Loader } from './libs/Loader';
import { RowBox, RowValue, RowMenu } from './libs/RowBox';
import SettingsMenu from './SettingsMenu';
import SettingsForm from './SettingsForm';

const namespace = 'settings';

function SettingsList() {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const settings = STATE.state.data.settings;

    const openForm = mode => {
        REF.current.saved = { ...settings };

        STATE.dispatch( { 
            namespace,
            type: 'OPEN_FORM',
            payload: { mode },
        } );
    }

    const closeForm = () => {
        STATE.dispatch( { 
            namespace,
            type: 'CLOSE_FORM',
            payload: {},
        } );
    }

    const doValidation = () => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_VALIDATION',
            payload: {},
        } );
    }

    const validationOk = () => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_OK',
            payload: {},
        } );
    }

    const validationError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_ERROR',
            payload: {},
        } );
    }

    const doRequest = () => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_REQUEST',
            payload: {},
        } );
    }

    const updateResponseOk = dataFromDB => {
        STATE.dispatch( {
            namespace, 
            type: 'UPDATE_RESPONSE_OK',
            payload: { dataFromDB },
        } );
    }

    const updateResponseError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'UPDATE_RESPONSE_ERROR',
            payload: { saved: REF.current.saved },
        } );
    }

    useEffect( () => {
        if ( settings.uiux.process.isRequest ) {

            const doFetch = ( url, args, onDone, onError, dataFromDB ) => {
                console.log( 'Requesting... ', settings.uiux.mode, settings.data.id )

                realFetch( url, args )
                .then( res => {
                    alert( JSON.stringify( res ) );
                    onDone( dataFromDB( res ) );
                } )
                .catch( err => { 
                    alert( err );
                    onError();
                } );
            }

            const dataToDB = parseSettingsToDB( settings.data );
            const body = JSON.stringify( { data: dataToDB } );
        
            if ( settings.uiux.mode.isUpdate ) {
                const url = `/.netlify/functions/settings`;
                const args = { method: 'PUT', body };
                const onDone = updateResponseOk;
                const onError = updateResponseError;
                const dataFromDB = res => ( { ...dataToDB } );
                doFetch( url, args, onDone, onError, dataFromDB );
            }
        }
    } );

    const mode = { isUpdate: true };

    return (
        <RowBox>
            <RowValue title={`${settings.data.id}`}>
                <div>{`Επιλογή Χρωματισμού: ${settings.data.theme}`}</div>
                <br />
                <div>{`Κεντρική Ημ/νία: ${settings.data.centralDate}`}</div>
                <br />
            </RowValue>

            <RowMenu>
                {settings.uiux.process.isValidation || settings.uiux.process.isRequest ?
                    <Loader />
                : settings.uiux.process.isResponseError ?
                    <FontAwesomeIcon icon={ faBan } className="icon" />
                : 
                    <SettingsMenu openForm={openForm} mode={mode} />
                }
            </RowMenu>

            {settings.uiux.form.isOpen 
                ? 
                <SettingsForm 
                    settings={settings} 
                    closeForm={closeForm}
                    doValidation={doValidation}
                    validationOk={validationOk}
                    validationError={validationError}
                    doRequest={doRequest}
                /> 
                : 
                null
            }

        </RowBox> 
    );
}

export default SettingsList;