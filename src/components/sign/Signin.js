import React, { useContext, useState, useEffect  } from 'react';

import { AppContext } from '../app/AppContext';
import { parseSigninToDB } from '../../storage/sign/parsers';
import { heads } from '../../storage/texts';

import { SignContextProvider, SigninRequest, SignForm } from './Sign';

import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { isBlank } from '../../helpers/validation';

function Signin() {

    const { state, dispatch } = useContext( AppContext );
    const { signin } = state;
    const { _uiux } = signin;

    const [ data, setData ] = useState( { ...signin } );

    const validation = () => {
        let errors = '';
 
        errors += isBlank( data.username ) 
            ? 'Το Όνομα χρήστη δεν μπορεί να είναι κενό.\n' : '';
 
        errors += isBlank( data.password )
            ? 'Ο Κωδικός εισόδου δεν μπορεί να είναι κενός.\n' : '';
  
        return { data, errors };
    }

    const payload = { ...data };
    const dataToDB = parseSigninToDB( data );

    return (
        <SignContextProvider 
            dispatch={ dispatch }
            namespace={ 'signin' }
            payload={ payload }
        >
    
            <SigninRequest 
                process={ _uiux.process }
                url={ `/.netlify/functions/signin` }
                dataToDB={ dataToDB }
                body={ JSON.stringify( { data: dataToDB } ) }
            />

            <SignForm
                headLabel={ heads.app }
                mode={ { isSignin: true } }
                process={ _uiux.process }
                validation={ validation }
            >

                <InputBox>
                    <InputLabel>
                        Όνομα
                    </InputLabel>
                    <InputValue>
                        <input
                            value={ data.username || '' }
                            onChange={ event => setData( { ...data, username: event.target.value || '' } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Κωδικός
                    </InputLabel>
                    <InputValue>
                        <input
                            type="password"
                            value={data.password || ''}
                            onChange={ event => setData( { ...data, password: event.target.value || '' } ) }
                        />
                    </InputValue>
                </InputBox>

            </SignForm>

        </SignContextProvider>
    );
}

export default Signin;
export { Signin };