import React, { useState } from 'react';
import '../styles/PaymentForm.css';
import EntryForm from './EntryForm';
import { Field } from './libs/Form';
import { InputNumber } from './libs/Inputs';

function PaymentForm( { date, entry, inSequence } ) {

    const className = 'PaymentForm';

    const [ data, setData ] = useState( { ...entry.data } );

    return (
        <EntryForm
            className={className}
            date={date}
            entry={entry}
            inSequence={inSequence}
            data={data}
        >
            <Field className="genre" label="Λογαριασμός">
                <input
                    value={data.genre}
                    onChange={event => setData( { ...data, genre: event.target.value } )}
                />
            </Field>

            <Field className="incoming" label="Είσπραξη">
                <InputNumber
                    value={data.incoming}
                    onChange={event => setData( { ...data, incoming: event.target.value } )}
                />
            </Field>

            <Field className="outgoing" label="Πληρωμή">
                <InputNumber
                    value={data.outgoing}
                    onChange={event => setData( { ...data, outgoing: event.target.value } )}
                />
            </Field>

            <Field className="remark" label="Αιτιολογία">
                <input
                    value={data.remark}
                    onChange={event => setData( { ...data, remark: event.target.value } )}
                />
            </Field>

            <Field className="fund" label="Μέσο πληρωμής">
                <input
                    value={data.fund}
                    onChange={event => setData( { ...data, fund: event.target.value } )}
                />
            </Field>
        </EntryForm>
    );
}

export default PaymentForm;
