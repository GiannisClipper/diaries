import React, { useState, useEffect  } from 'react';
import { ListBox } from './libs/ListBox';
import { BlockBox, BlockLabel, BlockValue } from './libs/BlockBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Loader } from './libs/Loader';
import { isBlank } from '../helpers/validation';
import styled from 'styled-components';

const AuthList = styled( ListBox )`
    width: 30em;
    height: 100%;
    border: 1px dotted red;
`;

function Signin() {
//function UserForm( { users, index, closeForm, doValidation, validationDone, validationError, doRequest } ) {

    // const user = users[ index ];

    const [ data, setData ] = useState( { username: null, password: null } );

    const isOnRequest = false;

    const onClickOk = event => {
        alert( 'do validation & request' )
        // user.uiux.mode.isCreate || user.uiux.mode.isUpdate
        //     ? doValidation( index )
        //     : doRequest( index )
    }

    //const onClickCancel = closeForm;

    // useEffect( () => {
    
    //     if ( user.uiux.process.isOnValidation ) {

    //         let errors = '';
    //         errors += isBlank( data.username ) ? 'Το Όνομα χρήστη δεν μπορεί να είναι κενό.\n' : '';

    //         data.password = data.password && data.password === user.data.password ? undefined : data.password;
    //         user.data = { ...data };

    //         if ( errors === '' ) {
    //             validationDone( index )

    //         } else {
    //             alert( errors );
    //             validationError( index );
    //         }

    //     } else if ( user.uiux.process.isOnValidationDone ) {
    //         doRequest( index );
    //     }
    // } );

    return (
        <AuthList>

            <BlockBox>
                <BlockLabel>
                    Όνομα χρήστη
                </BlockLabel>
                <BlockValue>
                    <input
                        value={data.username}
                        onChange={event => setData( { ...data, username: event.target.value } )}
                    />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel>
                    Κωδικός εισόδου
                </BlockLabel>
                <BlockValue>
                    <input
                        type="password"
                        value={data.password}
                        onChange={event => setData( { ...data, password: event.target.value } )}
                    />
                </BlockValue>
            </BlockBox>

            <BlockBox>
                <BlockLabel />
                <BlockValue>
                    <button className="ok" onClick={onClickOk}>
                        {isOnRequest
                            ? <Loader /> 
                            : <FontAwesomeIcon className="icon" icon={ faCheck } />}
                        <span>Είσοδος</span>
                    </button>
                </BlockValue>
            </BlockBox>

        </AuthList>
    );
}
    
function Signout() {
    return <></>
}

export { Signin, Signout };