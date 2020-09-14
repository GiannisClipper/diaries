import React, { useContext, useEffect } from 'react';
import '../../styles/payments/FundList.css';
import { STATEContext } from '../STATEContext';
import { REFContext } from '../REFContext';
import { realFetch, mockFetch } from '../../helpers/customFetch';
import { parseFundToDB } from '../../storage/payments/parsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '../libs/Loader';
import GenreMenu from './GenreMenu';
import FundForm from './FundForm';

const namespace = 'payments.funds';

function FundList( { className } ) {

    const REF = useContext( REFContext );

    const STATE = useContext( STATEContext );

    const { funds } = STATE.state.data.payments;

    //useEffect( () => {
        // if ( !STATE.state.uiux.isInitialized.funds ) {
        if ( !REF.current.initializedFunds ) {
            REF.current[ 'initializedFunds' ] = true;
            console.log( 'add_init_funds' )
            STATE.dispatch( { namespace, type: 'INITIALIZE_LIST' } );
        }
    //} );

    useEffect( () => {
        console.log( 'Has rendered. ', 'payments/FundList' );
    } );

    let index = -1;

    return (
        <div className={`payments FundList ${className}`}>
            <ul>
                { funds.map( fund => (
                    <Fund key={++index} index={index} funds={funds} />
                ) ) }
            </ul>
        </div>
    );
}

function Fund( { index, funds } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const fund = funds[ index ];

    const openForm = mode => {
        REF.current.saved = { fund };

        STATE.dispatch( { 
            namespace,
            type: 'OPEN_FORM',
            payload: { index, mode },
        } );
    }

    const closeForm = () => {
        STATE.dispatch( { 
            namespace,
            type: 'CLOSE_FORM',
            payload: { index },
        } );
    }

    const doValidation = index => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_VALIDATION',
            payload: { index },
        } );
    }

    const validationDone = index => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_DONE',
            payload: { index },
        } );
    }

    const validationError = index => {
        STATE.dispatch( { 
            namespace,
            type: 'VALIDATION_ERROR',
            payload: { index },
        } );
    }

    const doRequest = index => {
        STATE.dispatch( { 
            namespace,
            type: 'DO_REQUEST',
            payload: { index },
        } );
    }

    const retrieveAllRequestDone = dataFromDB => {
        STATE.dispatch( { 
            namespace,
            type: 'RETRIEVE_ALL_REQUEST_DONE',
            payload: { dataFromDB },
        } );
    }

    const retrieveAllRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'RETRIEVE_ALL_REQUEST_ERROR',
            payload: {},
        } );
    }

    const createRequestDone = dataFromDB => {
        STATE.dispatch( { 
            namespace,
            type: 'CREATE_REQUEST_DONE',
            payload: { index, dataFromDB },
        } );
    }

    const createRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'CREATE_REQUEST_ERROR',
            payload: { index },
        } );
    }

    const updateRequestDone = dataFromDB => {
        STATE.dispatch( {
            namespace, 
            type: 'UPDATE_REQUEST_DONE',
            payload: { index, dataFromDB },
        } );
    }

    const updateRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'UPDATE_REQUEST_ERROR',
            payload: { index, saved: REF.current.saved },
        } );
    }

    const deleteRequestDone = dataFromDB => {
        STATE.dispatch( { 
            namespace,
            type: 'DELETE_REQUEST_DONE',
            payload: { index, dataFromDB },
        } );
    }

    const deleteRequestError = () => {
        STATE.dispatch( { 
            namespace,
            type: 'DELETE_REQUEST_ERROR',
            payload: {},
        } );
    }

    useEffect( () => {

        if ( fund.uiux.process.isOnRequest ) {

            const doFetch = ( url, args, onDone, onError, dataFromDB ) => {
                console.log( 'Requesting... ', fund.uiux.mode, fund.data.id )

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

            if ( fund.uiux.mode.isCreate ) {
                const url = `/.netlify/functions/payments-fund`;
                const dataToDB = parseFundToDB( fund.data );
                const args = { method: 'POST', body: JSON.stringify( { data: dataToDB } ) };
                const onDone = createRequestDone;
                const onError = createRequestError;
                const idInResponse = res => res.insertedId;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( fund.uiux.mode.isRetrieveAll ) {
                const url = `/.netlify/functions/payments-fund`;
                const args = { method: 'GET' };
                const onDone = retrieveAllRequestDone;
                const onError = retrieveAllRequestError;
                const dataFromDB = res => res;
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( fund.uiux.mode.isUpdate ) {
                const url = `/.netlify/functions/payments-fund?id=${fund.data.id}`;
                const dataToDB = parseFundToDB( fund.data );
                const args = { method: 'PUT', body: JSON.stringify( { data: dataToDB } ) };
                const onDone = updateRequestDone;
                const onError = updateRequestError;
                const idInResponse = res => fund.data.id;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( fund.uiux.mode.isDelete ) {
                const url = `/.netlify/functions/payments-fund?id=${fund.data.id}`;
                const dataToDB = parseFundToDB( fund.data );
                const args = { method: 'DELETE', body: JSON.stringify( { data: dataToDB } ) };
                const onDone = deleteRequestDone;
                const onError = deleteRequestError;
                const idInResponse = () => fund.data.id;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );
            }
        }
    } );

    const mode = !fund.data.id ? { isCreate: true } : { isUpdate: true };

    return (
        <li 
            className={`payments Fund`}
            key={index}
        >
            <div className='data' title={`${fund.data.id}`}>
                <span className='code'>{fund.data.code}</span>
                <span className='name'>{fund.data.name}</span>
            </div>

            {fund.uiux.process.isOnValidation || fund.uiux.process.isOnRequest
                ? <Loader />
                : fund.uiux.status.isSuspended
                ? <FontAwesomeIcon icon={ faBan } className="icon" />
                : <GenreMenu openForm={openForm} mode={mode} />
            }

            {fund.uiux.form.isOpen 
                ? 
                <FundForm 
                    funds={funds} 
                    index={index} 
                    closeForm={closeForm}
                    doValidation={doValidation}
                    validationDone={validationDone}
                    validationError={validationError}
                    doRequest={doRequest}
                /> 
                : 
                null
            }

        </li> 
    );
}

export default FundList;