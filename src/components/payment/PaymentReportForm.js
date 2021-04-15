import React from 'react';

import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputFromListRequesting } from '../commons/InputFromList';

function PaymentReportForm( { data, setData, lexicon } ) {

    const { diary_id, type_specs } = data;

    return (
        <>
        <InputBox>
            <InputLabel title={ `${ type_specs.genre_id }` }>
                { lexicon.payment.genre_name }
            </InputLabel>
            <InputValue>
                <InputFromListRequesting
                    value={ type_specs.genre_name }
                    valueToAssign={ value => value.name }
                    valueToRepr={ value => value.name }    
                    url={ `/.netlify/functions/payment-genre?diary_id=${ diary_id }&name=` }
                    onChange={ event => {
                        const { value } = event.target;
                        const genre_id = value ? value._id : null;
                        const genre_name = value ? value.name : '';
                        const genre_code = value ? value.code : '';
                        setData( { ...data, type_specs: { ...type_specs, genre_id, genre_name, genre_code } } );
                    } }
                />
            </InputValue>
        </InputBox>

        <InputBox>
            <InputLabel title={ `${ type_specs.fund_id }` }>
                { lexicon.payment.fund_name }
            </InputLabel>
            <InputValue>
            <InputFromListRequesting
                    value={ type_specs.fund_name }
                    valueToAssign={ value => value.name }
                    valueToRepr={ value => value.name }    
                    url={ `/.netlify/functions/payment-fund?diary_id=${ diary_id }&name=` }
                    onChange={ event => {
                        const { value } = event.target;
                        const fund_id = value ? value._id : null;
                        const fund_name = value ? value.name : '';
                        const fund_code = value ? value.code : '';
                        setData( { ...data, type_specs: { ...type_specs, fund_id, fund_name, fund_code } } );
                    } }
                />
            </InputValue>
        </InputBox>
        </>
    );
}

export default PaymentReportForm;
