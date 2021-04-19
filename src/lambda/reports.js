import { createHandler, auth } from './core/handler';
import payments from './reports/payments';
import paymentsGroupByMonth from './reports/paymentsGroupByMonth';
import paymentsGroupByWeek from './reports/paymentsGroupByWeek';
import paymentsGroupByGenre from './reports/paymentsGroupByGenre';
import paymentsGroupByFund from './reports/paymentsGroupByFund';

const getMethod = async ( event, db, collectionName ) => {
    let { 
        diary_id,
        type, 
        groupBy,
        dateFrom, 
        dateTill,
        genre_id,
        genre_code,
        fund_id,
        fund_code
    } = event.queryStringParameters;

    const collection = db.collection( collectionName );

    switch ( type ) {

        case 'note': {
            return [];

        } case 'payment': {

            let genre_ids = null;
            if ( genre_code ) {
                const result = await db.collection( 'payment_genres' ).find( { code: { $regex: '^' + genre_code } } ).toArray();
                if ( result.length > 1 ) {
                    genre_ids = result.map( x => x._id.toString() );
                }
            }

            let fund_ids = null;
            if ( fund_code ) {
                const result = await db.collection( 'payment_funds' ).find( { code: { $regex: '^' + fund_code } } ).toArray();
                if ( result.length > 1 ) {
                    fund_ids = result.map( x => x._id.toString() );
                }
            }

            switch ( groupBy ) {

                case 'month': {
                    const stages = paymentsGroupByMonth( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } );
                    const result = await collection.aggregate( stages ).toArray();
                    return { result };

                } case 'week': {
                    const stages = paymentsGroupByWeek( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } );
                    const result = await collection.aggregate( stages ).toArray();
                    return { result };

                } case 'genre': {
                    const stages = paymentsGroupByGenre( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } );
                    const result = await collection.aggregate( stages ).toArray();
                    return { result };

                } case 'fund': {
                    const stages = paymentsGroupByFund( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } );
                    const result = await collection.aggregate( stages ).toArray();
                    return { result };

                } default: {
                    const stages = payments( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, fund_id, fund_ids } );
                    const result = await collection.aggregate( stages ).toArray();
                    return { result };
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
