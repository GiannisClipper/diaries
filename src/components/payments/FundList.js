import React, { useContext, useEffect } from 'react';
import '../../styles/payments/FundList.css';
import { STATEContext } from '../STATEContext';
import { REFContext } from '../REFContext';
import { realFetch, mockFetch } from '../../helpers/customFetch';
import { parseFundToDB } from '../../storage/payments/parsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '../libs/Loader';
import FundInit from './FundInit';
import GenreMenu from './GenreMenu';
import FundForm from './FundForm';

const namespace = 'payments.funds';

function FundList( { className } ) {

    const STATE = useContext( STATEContext );

    const { funds } = STATE.state.data.payments;

    useEffect( () => {
        console.log( 'Has rendered. ', 'payments/FundList' );
    } );

    let index = -1;

    return (
        <div className={`payments FundList ${className}`}>
            <FundInit />
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

    const { uiux } = STATE.state;
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

            const dataToDB = parseFundToDB( fund.data );
            const body = JSON.stringify( { data: dataToDB } );

            if ( fund.uiux.mode.isCreate ) {
                const url = `/.netlify/functions/payments-fund`;
                const args = { method: 'POST', body };
                const onDone = createRequestDone;
                const onError = createRequestError;
                const idInResponse = res => res.insertedId;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( fund.uiux.mode.isUpdate ) {
                const url = `/.netlify/functions/payments-fund?id=${fund.data.id}`;
                const args = { method: 'PUT', body };
                const onDone = updateRequestDone;
                const onError = updateRequestError;
                const idInResponse = res => fund.data.id;
                const dataFromDB = res => ( { ...dataToDB, _id: idInResponse( res ) } );
                doFetch( url, args, onDone, onError, dataFromDB );

            } else if ( fund.uiux.mode.isDelete ) {
                const url = `/.netlify/functions/payments-fund?id=${fund.data.id}`;
                const args = { method: 'DELETE', body };
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