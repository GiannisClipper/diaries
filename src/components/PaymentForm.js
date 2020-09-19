import React, { useContext, useState } from 'react';
import '../styles/PaymentForm.css';
import { STATEContext } from './STATEContext';
import EntryForm from './EntryForm';
import { Field } from './libs/Form';
import { InputNumber, InputFromList } from './libs/Inputs';

function PaymentForm( { date, entry, inSequence, closeForm, doValidation, validationDone, validationError, doRequest } ) {

    const className = 'PaymentForm';

    const  { data } = useContext( STATEContext ).state;

    const allGenres = data.payments.genres.map( x => x.data.name ).filter( x => x !== '' );

    const allFunds = data.payments.funds.map( x => x.data.name ).filter( x => x !== '' );

    const [ formData, setFormData ] = useState( { ...entry.data } );

    return (
        <EntryForm
            className={className}
            date={date}
            entry={entry}
            inSequence={inSequence}
            formData={formData}
            closeForm={closeForm}
            doValidation={doValidation}
            validationDone={validationDone}
            validationError={validationError}
            doRequest={doRequest}
        >
            <Field className="genre" label="Λογαριασμός">
                <InputFromList
                    value={formData.genre}
                    allValues={allGenres}
                    onChange={event => setFormData( { ...formData, genre: event.target.value } )}
                />
            </Field>

            <Field className="incoming" label="Είσπραξη">
                <InputNumber
                    value={formData.incoming}
                    onChange={event => setFormData( { ...formData, incoming: event.target.value } )}
                />
            </Field>

            <Field className="outgoing" label="Πληρωμή">
                <InputNumber
                    value={formData.outgoing}
                    onChange={event => setFormData( { ...formData, outgoing: event.target.value } )}
                />
            </Field>

            <Field className="remark" label="Αιτιολογία">
                <input
                    value={formData.remark}
                    onChange={event => setFormData( { ...formData, remark: event.target.value } )}
                />
            </Field>

            <Field className="fund" label="Μέσο πληρωμής">
            <InputFromList
                    value={formData.fund}
                    allValues={allFunds}
                    onChange={event => setFormData( { ...formData, fund: event.target.value } )}
                />
            </Field>
        </EntryForm>
    );
}

export default PaymentForm;
