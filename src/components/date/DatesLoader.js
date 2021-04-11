import { useContext, useEffect  } from 'react';

import { retrieveManyRequestFeature } from '../core/features/requests';
import { dateToYYYYMMDD } from '../core/helpers/dates';

import assets from './assets/assets';

import { DatesContext } from '../date/DatesContext';
import paymentGenresContext from '../payment/genre/GenresContext';
import paymentFundsContext from '../payment/fund/FundsContext';
import workoutGenresContext from '../workout/genre/GenresContext';
import workoutEquipsContext from '../workout/equip/EquipsContext';

const PaymentGenresContext = paymentGenresContext.GenresContext;
const PaymentFundsContext = paymentFundsContext.FundsContext;
const WorkoutGenresContext = workoutGenresContext.GenresContext;
const WorkoutEquipsContext = workoutEquipsContext.EquipsContext;

function DatesLoader( { diary_id } ) {

    const { state, actions } = useContext( DatesContext );
    const { dates, _uiux } = state;

    const dateFrom = dateToYYYYMMDD( dates[ 0 ].date );
    const dateTill = dateToYYYYMMDD( dates[ dates.length - 1 ].date );

    const payment = { 
        genres: { _uiux: useContext( PaymentGenresContext ).state._uiux },
        funds: { _uiux: useContext( PaymentFundsContext ).state._uiux }
    }

    const workout = { 
        genres: { _uiux: useContext( WorkoutGenresContext ).state._uiux },
        equips: { _uiux: useContext( WorkoutEquipsContext ).state._uiux }
    }

    useEffect( () => {

        if ( diary_id ) {

            if ( Object.keys( _uiux.status ).length === 0 ) {
                actions.retrieveManyRequestBefore( { assets } );

            } else if ( ! _uiux.status.isResponseOk ) {
                retrieveManyRequestFeature( { 
                    _uiux,
                    actions,
                    assets,
                    url: `/.netlify/functions/entry?diary_id=${ diary_id }&range=${ dateFrom }-${ dateTill }`
                } );
            
            } else {
                const status1 = payment.genres._uiux.status;
                const status2 = payment.funds._uiux.status;
                const status3 = workout.genres._uiux.status;
                const status4 = workout.equips._uiux.status;

                if ( 
                    status1.isResponseOkAfter && 
                    status2.isResponseOkAfter && 
                    status3.isResponseOkAfter && 
                    status4.isResponseOkAfter 
                ) {
                    actions.retrieveManyResponseOkAfter();
    
                } else if ( 
                    status1.isResponseError || 
                    status2.isResponseError || 
                    status3.isResponseError || 
                    status4.isResponseError 
                ) {
                    actions.retrieveManyResponseError();
                }    
            }

        }
    } );
    
    // useEffect( () => console.log( 'Has rendered. ', 'DatesLoader' ) );

    return null;
}

export default DatesLoader;
export { DatesLoader };