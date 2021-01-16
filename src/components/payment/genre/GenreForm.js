import React, { useState, useContext } from 'react';

import { Modal } from '../../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../../libs/InputBox';
import { InputCheck } from '../../libs/InputCheck';

import CoreForm from "../../core/CoreForm";
import { isBlank, isFound } from '../../core/helpers/validation';
import prepayAction from '../../core/helpers/prepayAction';

import { GenresContext } from './GenresContext';

function GenreForm( { genres, index, actions, assets } ) {

    const closeForm = prepayAction( actions.closeForm, { assets, index } );

    const genre = genres[ index ];

    const [ data, setData ] = useState( { ...genre } );

    const validationRules = () => {
        let errors = '';

        errors += isBlank( data.name ) 
            ? 'Η Ονομασία δεν μπορεί να είναι κενή.\n' : '';

        errors += !isBlank( data.name ) && isFound( genres.map( x=> x.name), data.name, index ) 
            ? 'Η Ονομασία υπάρχει ήδη.\n' : '';

        errors += !isBlank( data.code ) && isFound( genres.map( x=> x.code), data.code, index ) 
            ? 'Ο Λογιστικός Κωδικός υπάρχει ήδη.\n' : '';

        return { data, errors };
    }

    return (
        <Modal onClick={closeForm} centeredness>

            <CoreForm
                Context={ GenresContext }
                assets={ assets }
                index={ index }
                validationRules={ validationRules }
            >
                <InputBox>
                    <InputLabel>
                        Id
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={ data.id || '' }
                            tabIndex="-1"
                            readOnly
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Ονομασία
                    </InputLabel>
                    <InputValue>
                        <input
                            value={ data.name || '' }
                            onChange={ event => setData( { ...data, name: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Εγγραφές
                    </InputLabel>
                    <InputValue>
                        <InputCheck
                            checked={ data.isIncoming }
                            onChange={ event => setData( { ...data, isIncoming: event.target.checked } ) }
                            label='Εισπράξεων'
                        />
                        <InputCheck
                            checked={ data.isOutgoing }
                            onChange={ event => setData( { ...data, isOutgoing: event.target.checked } ) }
                            label='Πληρωμών'
                        />                        
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Λογ.Κωδικ.
                    </InputLabel>
                    <InputValue>
                        <input
                            value={ data.code || '' }
                            onChange={ event => setData( { ...data, code: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

            </CoreForm>
        </Modal>
    );
}

export default GenreForm;
export { GenreForm };