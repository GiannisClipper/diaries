import { createHandler, auth } from './common/handler';
import payments from './report/payments';
import paymentsGroupByMonth from './report/paymentsGroupByMonth';
import paymentsGroupByWeek from './report/paymentsGroupByWeek';
import paymentsGroupByGenre from './report/paymentsGroupByGenre';
import paymentsGroupByFund from './report/paymentsGroupByFund';

const getMethod = async ( event, db, collectionName ) => {
    const { 
        diary_id,
        type, 
        groupBy,
        dateFrom, 
        dateTill,
        genre_id,
        fund_id,
    } = event.queryStringParameters;

    const collection = db.collection( collectionName );

    switch ( type ) {

        case 'note': {
            return [];

        } case 'payment': {

            switch ( groupBy ) {

                case 'month': {
                    const stages = paymentsGroupByMonth( { diary_id, type, dateFrom, dateTill, genre_id, fund_id } );
                    const result = collection.aggregate( stages ).toArray();
                    return result;

                } case 'week': {
                    const stages = paymentsGroupByWeek( { diary_id, type, dateFrom, dateTill, genre_id, fund_id } );
                    const result = collection.aggregate( stages ).toArray();
                    return result;

                } case 'genre': {
                    const stages = paymentsGroupByGenre( { diary_id, type, dateFrom, dateTill, genre_id, fund_id } );
                    const result = collection.aggregate( stages ).toArray();
                    return result;

                } case 'fund': {
                    const stages = paymentsGroupByFund( { diary_id, type, dateFrom, dateTill, genre_id, fund_id } );
                    const result = collection.aggregate( stages ).toArray();
                    return result;

                } default: {
                    const stages = payments( { diary_id, type, dateFrom, dateTill, genre_id, fund_id } );
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
