import React from 'react';

import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputNumber } from '../commons/InputNumber';
import { InputRequestingList } from '../commons/InputList';

import { paymentSchema } from './assets/schemas';

function PaymentForm( { data, setData, lexicon } ) {

    let { diary_id, type_specs } = data;
    type_specs = type_specs || paymentSchema();

    return (
        <>
        <InputBox>
            <InputLabel title={ `${ data.genre_id }` }>
                { lexicon.payment.genre_name }
            </InputLabel>
            <InputValue>
                <InputRequestingList
                    value={ type_specs.genre_name }
                    valueToAssign={ value => value.name }
                    valueToRepr={ value => value.name }    
                    url={ `/.netlify/functions/payment-genre?diary_id=${ diary_id }&name=` }
                    onChange={ event => {
                        const { value } = event.target;
                        const specs = {
                            genre_id: value ? value._id : null,
                            genre_name: value ? value.name : null,
                            genre_type: value ? value.type : null,
                            revenue: value && value.type === 'revenue' ? type_specs.revenue : null,
                            expense: value && value.type === 'expense' ? type_specs.expense : null,
                        }
                        setData( { ...data, type_specs: { ...type_specs, ...specs } } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.payment.revenue }
            </InputLabel>
            <InputValue>
                <InputNumber
                    decimals="2"
                    value={ type_specs.revenue || '' }
                    onChange={ event => setData( { ...data, type_specs: { ...type_specs, revenue: event.target.value } } ) }
                    readOnly={ type_specs.genre_type !== 'revenue' }
                    tabIndex={ type_specs.genre_type !== 'revenue' ? '-1' : null }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.payment.expense }
            </InputLabel>
            <InputValue>
                <InputNumber
                    decimals="2"
                    value={ type_specs.expense || '' }
                    onChange={ event => setData( { ...data, type_specs: { ...type_specs, expense: event.target.value } } ) }
                    readOnly={ type_specs.genre_type !== 'expense' }
                    tabIndex={ type_specs.genre_type !== 'expense' ? '-1' : null }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel>
                { lexicon.payment.remark }
            </InputLabel>
            <InputValue>
                <input
                    value={ type_specs.remark }
                    onChange={ event => setData( { ...data, type_specs: { ...type_specs, remark: event.target.value } } ) }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel title={ `${ type_specs.fund_id }` }>
                { lexicon.payment.fund_name }
            </InputLabel>
            <InputValue>
                <InputRequestingList
                    value={ type_specs.fund_name }
                    valueToAssign={ value => value.name }
                    valueToRepr={ value => value.name }    
                    url={ `/.netlify/functions/payment-fund?diary_id=${ diary_id }&name=` }
                    onChange={ event => {
                        const { value } = event.target;
                        const specs = {
                            fund_id: value ? value._id : null,
                            fund_name: value ? value.name : null,
                        }
                        setData( { ...data, type_specs: { ...type_specs, ...specs } } );
                    } }
                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default PaymentForm;
