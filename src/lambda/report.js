import { createHandler, auth } from './common/handler';
import payments from './reports/payments';
import paymentsGroupByMonth from './reports/paymentsGroupByMonth';
import paymentsGroupByWeek from './reports/paymentsGroupByWeek';
import paymentsGroupByGenre from './reports/paymentsGroupByGenre';
import paymentsGroupByFund from './reports/paymentsGroupByFund';

const getMethod = async ( event, db, collectionName ) => {
    const { 
        diary_id,
        type, 
        dateFrom, 
        dateTill,
        groupBy,
    } = event.queryStringParameters;

    const collection = db.collection( collectionName );

    switch ( type ) {

        case 'note': {
            return [];

        } case 'payment': {

            switch ( groupBy ) {

                case 'month': {
                    const stages = paymentsGroupByMonth( { diary_id, type, dateFrom, dateTill } );
                    const result = collection.aggregate( stages ).toArray();
                    return result;

                } case 'week': {
                    const stages = paymentsGroupByWeek( { diary_id, type, dateFrom, dateTill } );
                    const result = collection.aggregate( stages ).toArray();
                    return result;

                } case 'genre': {
                    const stages = paymentsGroupByGenre( { diary_id, type, dateFrom, dateTill } );
                    const result = collection.aggregate( stages ).toArray();
                    return result;

                } case 'fund': {
                    const stages = paymentsGroupByFund( { diary_id, type, dateFrom, dateTill } );
                    const result = collection.aggregate( stages ).toArray();
                    return result;

                } default: {
                    const stages = payments( { diary_id, type, dateFrom, dateTill } );
                    const result = collection.aggregate( stages ).toArray();
                    return result;
                }
            }

        } default: {
            return [];
        }
    
    }    
}

exports.handler = createHandler( {
    collectionName: 'entries',
    auth,
    getMethod
} );
