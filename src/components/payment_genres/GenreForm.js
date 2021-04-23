import React, { useState, useEffect } from 'react';

import { Modal } from '../commons/Modal';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputSelectingList } from '../commons/InputList';

import CoreForm from "../core/CoreForm";
import presetAction from '../core/helpers/presetAction';
import { getFromList } from '../core/helpers/getFromList';
import { validationFeature } from "../core/features/validation";

import { isEmptyDiary_id, isEmptyName } from './assets/validators';
import { GenresContext } from './GenresContext';

function GenreForm( { genres, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const genre = genres[ index ];

    const [ data, setData ] = useState( { ...genre } );
    const { status } = genre._uiux;

    const types = [
        { type: 'revenue', descr: lexicon.payment_genres.types.revenue },
        { type: 'expense', descr: lexicon.payment_genres.types.expense },
        { type: '', descr: '--' },
    ];

    // validation feature

    useEffect( () => {

        validationFeature( { 
            actions,
            assets,
            index,
            data,
            status,
            validationProcess: ( { data } ) => {
                const errors = [];
                errors.push( isEmptyDiary_id( { data } ) );
                errors.push( isEmptyName( { data } ) );
            
                return errors.filter( x => x !== null );
            }, 
        } );

    } );

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.payment_genres.genre }
                Context={ GenresContext }
                assets={ assets }
                lexicon={ lexicon }
                index={ index }
                validationFeature={ true }
            >
                {/* <InputBox>
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
                </InputBox> */}

                <InputBox>
                    <InputLabel>
                        { lexicon.payment_genres.name }
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
                        { lexicon.payment_genres.type }
                    </InputLabel>
                    <InputValue>
                        <InputSelectingList
                            value={ getFromList( types, 'type', data.type ).descr }
                            values={ types.map( x => x.descr ) }
                            onChange={ event => setData( { ...data, type: getFromList( types, 'descr', event.target.value ).type } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        { lexicon.payment_genres.code }
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