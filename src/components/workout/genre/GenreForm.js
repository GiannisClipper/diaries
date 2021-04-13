import React, { useState, useContext } from 'react';

import { Modal } from '../../commons/Modal';
import { InputBox, InputLabel, InputValue } from '../../commons/InputBox';

import CoreForm from "../../core/CoreForm";
import validators from '../../core/assets/validators';
import presetAction from '../../core/helpers/presetAction';
import withLexicon from '../../core/helpers/withLexicon';

import { GenresContext } from './GenresContext';

function GenreForm( { genres, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const genre = genres[ index ];

    const [ data, setData ] = useState( { ...genre } );

    const onValidation = () => {
        let errors = [];

        const isBlank = withLexicon( validators.isBlank, lexicon );
        const isFound = withLexicon( validators.isFound, lexicon );

        errors.push( isBlank( lexicon.workoutGenre.name, data.name ) );
        errors.push( isFound( lexicon.workoutGenre.name, genres.map( x=> x.name ), data.name, index ) );
        errors.push( isFound( lexicon.workoutGenre.code, genres.map( x=> x.code ), data.code, index ) );

        errors = errors.filter( x => x !== null );

        return { data, errors };
    }

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.workoutGenre.genre }
                Context={ GenresContext }
                assets={ assets }
                lexicon={ lexicon }
                index={ index }
                onValidation={ onValidation }
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
                        { lexicon.workoutGenre.name }
                    </InputLabel>
                    <InputValue>
                        <input
                            value={ data.name }
                            onChange={ event => setData( { ...data, name: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        { lexicon.workoutGenre.code }
                    </InputLabel>
                    <InputValue>
                        <input
                            value={ data.code }
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