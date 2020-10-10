import React, { useContext, useState, useEffect } from 'react';
import '../../styles/PaymentForm.css';
import { STATEContext } from '../STATEContext';
import EntryForm from '../EntryForm';
import { Field } from '../libs/Field';
import { InputNumber } from '../libs/InputNumber';
import { InputFromList } from '../libs/InputFromList';
import { isBlank } from '../../helpers/validation';
import { getFromList } from '../../storage/payments/parsers';

function PaymentForm( { date, entry, inSequence, closeForm, doValidation, validationDone, validationError, doRequest } ) {

    const  { data } = useContext( STATEContext ).state;

    // const allGenres = data.payments.genres.map( x => x.data.name ).filter( x => x !== '' );
    // const allFunds = data.payments.funds.map( x => x.data.name ).filter( x => x !== '' );

    let allGenres = [ ...data.payments.genres ].reverse();
    allGenres = allGenres.filter( ( x, i ) => i === 0 || !allGenres[ i - 1 ].data.code.startsWith( x.data.code ) );
    allGenres = allGenres.map( x => x.data.name ).filter( x => x !== '' );

    let allFunds = [ ...data.payments.funds ].reverse();
    allFunds = allFunds.filter( ( x, i ) => i === 0 || !allFunds[ i - 1 ].data.code.startsWith( x.data.code ) );
    allFunds = allFunds.map( x => x.data.name ).filter( x => x !== '' );

    const [ formData, setFormData ] = useState( { ...entry.data } );

    const setupGenre = name => {
        let isIncoming = false;
        let isOutgoing = false;
        let incoming = null;
        let outgoing = null;

        if ( name ) {
            const genre = getFromList( data.payments.genres, 'name', name );
            isIncoming = genre.isIncoming;
            isOutgoing = genre.isOutgoing;
            incoming = isIncoming ? formData.incoming : null;
            outgoing = isOutgoing ? formData.outgoing : null;
        }
        return { isIncoming, isOutgoing, incoming, outgoing };
    }

    useEffect( () => {

        setFormData( { ...formData, ...setupGenre( formData.genre_name ) } );

    }, [] );

    useEffect( () => {
    
        if ( entry.uiux.process.isOnValidation ) {

            let errors = '';
            errors += isBlank( formData.genre_name ) ? 'Η κατηγορία οικονομικής κίνησης δεν μπορεί να είναι κενή.\n' : '';
            errors += isBlank( formData.fund_name ) ? 'Το μέσο οικονομικής κίνησης δεν μπορεί να είναι κενό.\n' : '';

            if ( errors === '' ) {
                validationDone( date, inSequence )

            } else {
                alert( errors );
                validationError( date, inSequence );
            }

        } else if ( entry.uiux.process.isOnValidationDone ) {
            doRequest( date, inSequence );
        }
    } );

    return (
        <EntryForm
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
            <Field label="Κατηγορία">
                <InputFromList
                    value={formData.genre_name}
                    allValues={allGenres}
                    onChange={event => {
                        const genre_name = event.target.value;
                        setFormData( { ...formData, genre_name, ...setupGenre( genre_name ) } );
                    }}
                />
            </Field>

            <Field label="Είσπραξη">
                <InputNumber
                    decimals="2"
                    value={formData.incoming || ''}
                    onChange={event => setFormData( { ...formData, incoming: event.target.value } )}
                    readOnly={!formData.isIncoming}
                />
            </Field>

            <Field label="Πληρωμή">
                <InputNumber
                    decimals="2"
                    value={formData.outgoing || ''}
                    onChange={event => setFormData( { ...formData, outgoing: event.target.value } )}
                    readOnly={!formData.isOutgoing}
                />
            </Field>

            <Field label="Αιτιολογία">
                <input
                    value={formData.remark}
                    onChange={event => setFormData( { ...formData, remark: event.target.value } )}
                />
            </Field>

            <Field label="Μέσο πληρωμής">
                <InputFromList
                    value={formData.fund_name}
                    allValues={allFunds}
                    onChange={event => setFormData( { ...formData, fund_name: event.target.value } )}
                />
            </Field>
        </EntryForm>
    );
}

export default PaymentForm;
