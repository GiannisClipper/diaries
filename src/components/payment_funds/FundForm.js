import React, { useState, useContext } from 'react';

import { Modal } from '../commons/Modal';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';

import CoreForm from "../core/CoreForm";
import validators from '../core/assets/validators';
import presetAction from '../core/helpers/presetAction';
import withLexicon from '../core/helpers/withLexicon';

import { FundsContext } from './FundsContext';

function FundForm( { funds, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const fund = funds[ index ];

    const [ data, setData ] = useState( { ...fund } );

    const onValidation = () => {
        let errors = [];

        // const isBlank = withLexicon( validators.isBlank, lexicon );
        // const isFound = withLexicon( validators.isFound, lexicon );

        // errors.push( isBlank( lexicon.payment_funds.name, data.name ) );
        // errors.push( isFound( lexicon.payment_funds.name, funds.map( x=> x.name ), data.name, index ) );
        // errors.push( isFound( lexicon.payment_funds.code, funds.map( x=> x.code ), data.code, index ) );

        // errors = errors.filter( x => x !== null );

        return { data, errors };
    }

    return (
        <Modal onClick={ onClickOut } centeredness>

            <CoreForm
                headLabel={ lexicon.payment_funds.fund }
                Context={ FundsContext }
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
                        { lexicon.payment_funds.name }
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
                        { lexicon.payment_funds.code }
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