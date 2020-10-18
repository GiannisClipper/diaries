import React, { useState, useEffect  } from 'react';
import { ListBox, List, Block } from './libs/List';
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
            <Block label='Όνομα χρήστη'>
                <input
                    value={data.username}
                    onChange={event => setData( { ...data, username: event.target.value } )}
                />
            </Block>

            <Block label='Κωδικός εισόδου'>
                <input
                    type="password"
                    value={data.password}
                    onChange={event => setData( { ...data, password: event.target.value } )}
                />
            </Block>

            <Block label=''>
                <button className="ok" onClick={onClickOk}>
                    {isOnRequest
                        ? <Loader /> 
                        : <FontAwesomeIcon className="icon" icon={ faCheck } />}
                    <span>Είσοδος</span>
                </button>
            </Block>
        </AuthList>
    );
}
    
function Signout() {
    return <></>
}

export { Signin, Signout };