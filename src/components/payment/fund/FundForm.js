import React, { useState, useContext } from 'react';

import { Modal } from '../../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../../libs/InputBox';

import CoreForm from "../../core/CoreForm";
import { isBlank, isFound } from '../../core/assets/validators';
import presetAction from '../../core/helpers/presetAction';

import { AppContext } from '../../app/AppContext';

import lexicons from './assets/lexicons';
import { FundsContext } from './FundsContext';

function FundForm( { funds, index, actions, assets } ) {

    const { language } = useContext( AppContext ).state.settings;
    const lexicon = lexicons[ language ] || lexicons.DEFAULT;

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const fund = funds[ index ];

    const [ data, setData ] = useState( { ...fund } );

    const validators = () => {
        let errors = [];

        errors.push( isBlank( lexicon.name, data.name ) );
        errors.push( isFound( lexicon.name, funds.map( x=> x.name ), data.name, index ) );
        errors.push( isFound( lexicon.code, funds.map( x=> x.code ), data.code, index ) );

        errors = errors.filter( x => x !== null );

        return { data, errors };
    }

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.fund }
                Context={ FundsContext }
                assets={ assets }
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
                        { lexicon.name }
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
                        { lexicon.code }
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

export default FundForm;
export { FundForm };