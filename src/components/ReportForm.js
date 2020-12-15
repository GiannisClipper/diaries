import React, { useContext, useState } from 'react';
import { Modal } from './libs/Modal';
import { heads } from '../storage/texts';
import { CRUDContext, CRUDForm } from "./libs/CRUD";
import { InputBox, InputLabel, InputValue } from './libs/InputBox';
import { InputDate } from './libs/InputDate';
import { shiftDate, YYYYMMDDToRepr, dateToYYYYMMDD } from '../helpers/dates';

function ReportForm( { reports, index } ) {

    const report = reports[ index ];

    const { closeForm } = useContext( CRUDContext );

    const [ data, setData ] = useState( { 
        ...report.data,
        dateFrom: YYYYMMDDToRepr( dateToYYYYMMDD( shiftDate( new Date(), -6 ) ) ) ,
        dateTill: YYYYMMDDToRepr( dateToYYYYMMDD( new Date() ) ),
    } );

    const validation = () => {
        let errors = '';
        // errors += isBlank( data.username ) ? 'Το Όνομα χρήστη δεν μπορεί να είναι κενό.\n' : '';
        // errors += !isBlank( data.username ) && isFound( users.map( x=> x.data.username), data.username, index ) ? 'Το Όνομα xρήστη υπάρχει ήδη.\n' : '';
        // errors += isBlank( data.password ) && user.uiux.mode.isCreate ? 'Ο Κωδικός εισόδου δεν μπορεί να είναι κενός.\n' : '';
        // errors += !isBlank( data.password ) && data.password !== data.password2 ? 'Διαφορά στην πληκτρολόγηση του Κωδικού εισόδου.\n' : '';
        return { data, errors };
    }

    return (
        <Modal onClick={closeForm} centeredness>
            <CRUDForm
                headLabel={heads.reports}
                mode={{ isRetrieveMany: true }}
                process={report.uiux.process}
                validation={validation}
            >
                <InputBox>
                    <InputLabel>
                        Περιγραφή
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={report.data.descr || ''}
                            tabIndex="-1"
                            readOnly
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Από
                    </InputLabel>
                    <InputValue>
                        <InputDate
                            value={data.dateFrom}
                            onChange={event => setData( { ...data, dateFrom: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Έως
                    </InputLabel>
                    <InputValue>
                        <InputDate
                            value={data.dateTill}
                            onChange={event => setData( { ...data, dateTill: event.target.value } )}
                        />
                    </InputValue>
                </InputBox>

            </CRUDForm>
        </Modal>
    );
}

export default ReportForm;
