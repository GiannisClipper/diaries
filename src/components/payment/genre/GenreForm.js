import React, { useState, useContext } from 'react';

import { Modal } from '../../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../../libs/InputBox';
import { InputCheck } from '../../libs/InputCheck';

import CoreForm from "../../core/CoreForm";
import { isBlank, isFound } from '../../core/assets/validators';
import presetAction from '../../core/helpers/presetAction';

import { GenresContext } from './GenresContext';

function GenreForm( { genres, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const genre = genres[ index ];

    const [ data, setData ] = useState( { ...genre } );

    const validators = () => {
        let errors = [];

        errors.push( isBlank( lexicon.genre.name, data.name ) );
        errors.push( isFound( lexicon.genre.name, genres.map( x=> x.name ), data.name, index ) );
        errors.push( isFound( lexicon.genre.code, genres.map( x=> x.code ), data.code, index ) );

        errors = errors.filter( x => x !== null );

        return { data, errors };
    }

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.genre.genre }
                Context={ GenresContext }
                assets={ assets }
                lexicon={ lexicon }
                index={ index }
                validators={ validators }
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
                        { lexicon.genre.name }
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
                        { lexicon.genre.type }
                    </InputLabel>
                    <InputValue>
                        <InputCheck
                            checked={ data.isIncoming }
                            onChange={ event => setData( { ...data, isIncoming: event.target.checked } ) }
                            label={ lexicon.genre.isIncoming }
                        />
                        <InputCheck
                            checked={ data.isOutgoing }
                            onChange={ event => setData( { ...data, isOutgoing: event.target.checked } ) }
                            label={ lexicon.genre.isOutgoing }
                        />                        
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        { lexicon.genre.code }
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