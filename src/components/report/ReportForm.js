import React, { useContext, useState } from 'react';

import { AppContext } from '../app/AppContext';
import { CRUDContext, CRUDForm } from "../libs/CRUD";

import { Modal } from '../libs/Modal';
import { heads } from '../../storage/texts';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputDate } from '../libs/InputDate';
import { shiftDate, YYYYMMDDToRepr, dateToYYYYMMDD } from '../../helpers/dates';

function ReportForm( { report } ) {

    const { _uiux } = report;

    const { closeForm } = useContext( CRUDContext );

    const [ data, setData ] = useState( { 
        ...report,
        dateFrom: YYYYMMDDToRepr( dateToYYYYMMDD( shiftDate( new Date(), -6 ) ) ) ,
        dateTill: YYYYMMDDToRepr( dateToYYYYMMDD( new Date() ) ),
    } );

    const validation = () => {
        let errors = '';
        return { data, errors };
    }

    return (
        <Modal onClick={ closeForm } centeredness>
            <CRUDForm
                headLabel={ heads.reports }
                mode={ { isRetrieveMany: true } }
                process={ _uiux.process }
                validation={ validation }
            >
                <InputBox>
                    <InputLabel>
                        Περιγραφή
                    </InputLabel>
                    <InputValue>
                        <input 
                            value={ data.descr || '' }
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
                            value={ data.dateFrom }
                            onChange={ event => setData( { ...data, dateFrom: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                <InputBox>
                    <InputLabel>
                        Έως
                    </InputLabel>
                    <InputValue>
                        <InputDate
                            value={ data.dateTill }
                            onChange={ event => setData( { ...data, dateTill: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

            </CRUDForm>
        </Modal>
    );
}

export default ReportForm;
