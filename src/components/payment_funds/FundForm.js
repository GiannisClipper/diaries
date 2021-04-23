import React, { useState, useEffect } from 'react';

import { Modal } from '../commons/Modal';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';

import CoreForm from "../core/CoreForm";
import presetAction from '../core/helpers/presetAction';
import { validationFeature } from "../core/features/validation";

import { isEmptyDiary_id, isEmptyName } from './assets/validators';
import { FundsContext } from './FundsContext';

function FundForm( { funds, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const fund = funds[ index ];

    const [ data, setData ] = useState( { ...fund } );
    const { status } = fund._uiux;

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
                headLabel={ lexicon.payment_funds.fund }
                Context={ FundsContext }
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