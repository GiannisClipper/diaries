import React, { useContext, useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputDate } from '../libs/InputDate';

import CoreForm from "../core/CoreForm";
import { shiftDate, YYYYMMDDToRepr, dateToYYYYMMDD } from '../core/helpers/dates';
import prepayAction from '../core/helpers/prepayAction';

import { ReportsContext } from './ReportsContext';

function ReportForm( { reports, index, actions, assets } ) {

    const closeForm = prepayAction( actions.closeForm, { assets, index } );

    const report = reports[ index ];

    const [ data, setData ] = useState( { 
        ...report,
        dateFrom: YYYYMMDDToRepr( dateToYYYYMMDD( shiftDate( new Date(), -6 ) ) ) ,
        dateTill: YYYYMMDDToRepr( dateToYYYYMMDD( new Date() ) ),
    } );

    const validationRules = () => {
        let errors = '';
        return { data, errors };
    }

    return (
        <Modal onClick={ closeForm } centeredness>
            <CoreForm
                Context={ ReportsContext }
                assets={ assets }
                index={ index }
                validationRules={ validationRules }
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

            </CoreForm>
        </Modal>
    );
}

export default ReportForm;
