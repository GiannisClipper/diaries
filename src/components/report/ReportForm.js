import React, { useState } from 'react';

import { Modal } from '../libs/Modal';
import { InputBox, InputLabel, InputValue } from '../libs/InputBox';
import { InputDate } from '../libs/InputDate';

import CoreForm from "../core/CoreForm";
import { shiftDate, YYYYMMDDToRepr, dateToYYYYMMDD } from '../core/helpers/dates';
import presetAction from '../core/helpers/presetAction';

import { ReportsContext } from './ReportsContext';
// import { testPDF } from './helpers/reportPDF';

import PaymentReportForm from '../payment/PaymentReportForm';
import WorkoutReportForm from '../workout/WorkoutReportForm';

function ReportForm( { reports, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const report = reports[ index ];

    const [ data, setData ] = useState( { 
        ...report,
        dateFrom: YYYYMMDDToRepr( dateToYYYYMMDD( shiftDate( new Date(), -6 ) ) ) ,
        dateTill: YYYYMMDDToRepr( dateToYYYYMMDD( new Date() ) ),
    } );

    const onValidation = () => {
        let errors = [];
        return { data, errors };
    }

    return (
        <Modal onClick={ onClickOut } centeredness>
            <CoreForm
                headLabel={ lexicon.report.report }
                Context={ ReportsContext }
                assets={ assets }
                lexicon={ lexicon }
                index={ index }
                onValidation={ onValidation }
            >
                <InputBox>
                    <InputLabel>
                        { lexicon.report.descr }
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
                        { lexicon.report.dateFrom }
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
                        { lexicon.report.dateTill }
                    </InputLabel>
                    <InputValue>
                        <InputDate
                            value={ data.dateTill }
                            onChange={ event => setData( { ...data, dateTill: event.target.value } ) }
                        />
                    </InputValue>
                </InputBox>

                { data.type === 'payment' ?
                    <PaymentReportForm 
                        data={ data } 
                        setData={ setData } 
                        lexicon={ lexicon } 
                    />

                : data.type === 'workout' ?
                    <WorkoutReportForm 
                        data={ data } 
                        setData={ setData } 
                        lexicon={ lexicon } 
                    />

                : null }

                {/* <InputBox>
                    <InputLabel>
                        Test
                    </InputLabel>
                    <InputValue>
                        <button onClick={ event => testPDF() } >
                            testPDF()
                        </button>
                    </InputValue>
                </InputBox> */}

            </CoreForm>
        </Modal>
    );
}

export default ReportForm;
