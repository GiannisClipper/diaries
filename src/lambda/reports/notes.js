import { matchNotes, sortDate } from './notesStages';

const notes = ( { diary_id, type, dateFrom, dateTill } ) => {

    const matchDocuments = matchNotes( { diary_id, type, dateFrom, dateTill } );
    
    const selectFields1 = { 
        $project: {
            _id: 0,
            date: 1,
            index: 1,
            type: 1,
            note: '$type_specs.note',
        }
    }
    
    const stages = [ 
        matchDocuments,
        selectFields1,
        sortDate,
    ];

    return stages;
}

export default notes;
export { notes };