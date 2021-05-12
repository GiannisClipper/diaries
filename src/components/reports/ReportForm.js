import React, { useState, useEffect } from 'react';
import { calcDateByDaysAddition, setDateRepr } from '@giannisclipper/date';

import { Modal } from '../commons/Modal';
import { InputBox, InputLabel, InputValue } from '../commons/InputBox';
import { InputDate } from '../commons/InputDate';

import CoreForm from "../core/CoreForm";
import presetAction from '../core/helpers/presetAction';
import { validationFeature } from "../core/features/validation";

import { ReportsContext } from './ReportsContext';
// import { testPDF } from './helpers/reportPDF';

import PaymentReportForm from '../payments/PaymentReportForm';
import WorkoutReportForm from '../workouts/WorkoutReportForm';

function ReportForm( { reports, index, actions, assets, lexicon } ) {

    const closeForm = presetAction( actions.closeForm, { assets, index } );
    const noMode = presetAction( actions.noMode, { assets, index } );
    const onClickOut = () => { closeForm(); noMode() };

    const report = reports[ index ];
    const { status } = report._uiux;

    const dateFrom = setDateRepr( calcDateByDaysAddition( new Date(), -6 ) );
    const dateTill = setDateRepr( new Date() );
 
    const [ data, setData ] = useState( { ...report, dateFrom, dateTill } );

    useEffect( () => {
        validationFeature( { 
            actions,
            assets,
            index,
            data,
            status,
        } );
    } );
        
    return (
        <Modal onClick={ onClickOut } centeredness>
            <CoreForm
                headLabel={ lexicon.reports.report }
                Context={ ReportsContext }
                assets={ assets }
                lexicon={ lexicon }
                index={ index }
            >
                <InputBox>
                    <InputLabel>
                        { lexicon.reports.descr }
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
                        { lexicon.reports.dateFrom }
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
                        { lexicon.reports.dateTill }
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

            </CoreForm>
        </Modal>
    );
}

export default ReportForm;
