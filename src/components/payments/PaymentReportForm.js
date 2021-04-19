import React from 'react';

import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputRequestingList } from '../commons/InputList';

import { urls } from '../app/assets/urls';

function PaymentReportForm( { data, setData, lexicon } ) {

    const { diary_id, type_specs } = data;

    return (
        <>
        <InputBox>
            <InputLabel title={ `${ type_specs.genre_id }` }>
                { lexicon.payments.genre_name }
            </InputLabel>
            <InputValue>
                <InputRequestingList
                    value={ type_specs.genre_name }
                    valueToAssign={ value => value.name }
                    valueToRepr={ value => value.name }    
                    url={ `${ urls.payment_genres }?diary_id=${ diary_id }&name=` }
                    onChange={ event => {
                        const { value } = event.target;
                        const specs = {
                            genre_id: value ? value._id : null,
                            genre_name: value ? value.name : null,
                            genre_code: value ? value.code : null,
                        }
                        setData( { ...data, type_specs: { ...type_specs, ...specs } } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel title={ `${ type_specs.fund_id }` }>
                { lexicon.payments.fund_name }
            </InputLabel>
            <InputValue>
                <InputRequestingList
                    value={ type_specs.fund_name }
                    valueToAssign={ value => value.name }
                    valueToRepr={ value => value.name }    
                    url={ `${ urls.payment_funds }?diary_id=${ diary_id }&name=` }
                    onChange={ event => {
                        const { value } = event.target;
                        const specs = {
                            fund_id: value ? value._id : null,
                            fund_name: value ? value.name : null,
                            fund_code: value ? value.code : null,
                        }
                        setData( { ...data, type_specs: { ...type_specs, ...specs } } );
                    } }
                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default PaymentReportForm;
