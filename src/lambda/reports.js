import { createHandler, auth } from './core/handler';

import payments from './reports/payments';
import paymentsGroupByMonth from './reports/paymentsGroupByMonth';
import paymentsGroupByWeek from './reports/paymentsGroupByWeek';
import paymentsGroupByGenre from './reports/paymentsGroupByGenre';
import paymentsGroupByFund from './reports/paymentsGroupByFund';

import workouts from './reports/workouts';
import workoutsGroupByMonth from './reports/workoutsGroupByMonth';
import workoutsGroupByWeek from './reports/workoutsGroupByWeek';
import workoutsGroupByGenre from './reports/workoutsGroupByGenre';
import workoutsGroupByEquip from './reports/workoutsGroupByEquip';

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
        fund_code,
        equip_id,
        equip_code
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

        } case 'workout': {

            let genre_ids = null;
            if ( genre_code ) {
                const result = await db.collection( 'workout_genres' ).find( { code: { $regex: '^' + genre_code } } ).toArray();
                if ( result.length > 1 ) {
                    genre_ids = result.map( x => x._id.toString() );
                }
            }

            let equip_ids = null;
            if ( equip_code ) {
                const result = await db.collection( 'workout_equips' ).find( { code: { $regex: '^' + equip_code } } ).toArray();
                if ( result.length > 1 ) {
                    equip_ids = result.map( x => x._id.toString() );
                }
            }

            switch ( groupBy ) {

                case 'month': {
                    const stages = workoutsGroupByMonth( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } );
                    const result = await collection.aggregate( stages ).toArray();
                    return { result };

                } case 'week': {
                    const stages = workoutsGroupByWeek( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } );
                    const result = await collection.aggregate( stages ).toArray();
                    return { result };

                } case 'genre': {
                    const stages = workoutsGroupByGenre( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } );
                    const result = await collection.aggregate( stages ).toArray();
                    return { result };

                } case 'equip': {
                    const stages = workoutsGroupByEquip( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } );
                    const result = await collection.aggregate( stages ).toArray();
                    return { result };

                } default: {
                    const stages = workouts( { diary_id, type, dateFrom, dateTill, genre_id, genre_ids, equip_id, equip_ids } );
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
