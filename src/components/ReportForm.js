import React, { useContext } from 'react';
import { Modal } from './libs/Modal';
import { heads } from '../storage/texts';
import { RetrieveManyContext, RetrieveManyForm } from "./libs/RetrieveMany";
import { InputBox, InputLabel, InputValue } from './libs/InputBox';

function ReportForm( { reports, index } ) {

    const report = reports[ index ];

    const { closeForm } = useContext( RetrieveManyContext );

    return (
        <Modal onClick={closeForm} centeredness>

            <RetrieveManyForm
                headLabel={heads.reports}
                isOnRequest={report.uiux.process.isOnRequest}
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

            </RetrieveManyForm>
        </Modal>
    );
}

export default ReportForm;
