import React, { useContext, useEffect } from 'react';
import { BenchContext } from '../../bench/BenchContext';
import { GenresContext } from './GenresContext';
import { CreateRequest, UpdateRequest, DeleteRequest } from '../../core/CoreRequests';
import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../../core/CoreMenu';
import { RowBox, RowValue, RowMenu } from '../../libs/RowBox';
import GenreForm from './GenreForm';

function Genre( { index } ) {
    // const { diary_id } = useContext( BenchContext ).state;
    // assets.schema = () => ( { ...paymentGenreSchema(), diary_id } );

    const { state, actions } = useContext( GenresContext );
    const { genres } = state;
    const genre = genres[ index ];
    const { _uiux } = genre;

    const openForm = payload => actions.openForm( { index, ...payload } );

    const typeInfo = _uiux.mode.isCreate
        ? ''
        : genre.isIncoming && genre.isOutgoing
        ? 'Μ'
        : genre.isIncoming
        ? 'Ε'
        : genre.isOutgoing
        ? 'Π'
        : '-';

    return (
        <RowBox key={ index }>

            { _uiux.mode.isCreate ?
                <CreateRequest
                    Context={ GenresContext }
                    index={ index }
                    url={ `/.netlify/functions/payment-genre` }
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    Context={ GenresContext }
                    index={ index }
                    url={ `/.netlify/functions/payment-genre?id=${genre.id}` }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    Context={ GenresContext }
                    index={ index }
                    url={ `/.netlify/functions/payment-genre?id=${genre.id}` }
                />

            : null }

            <RowValue title={ `${genre.diary_id}.${genre.id}` }>
                <span style={ { fontFamily: 'monospace' } } >{ `${typeInfo} ${genre.code} ` }</span>
                <span>{ genre.name }</span>
            </RowValue>

            <RowMenu>
                { ! genre.id 
                ?
                <CoreMenu status={ _uiux.status } >
                    <CreateMenuOption openForm={ openForm } />
                </CoreMenu>
                :
                <CoreMenu status={ _uiux.status } >
                    <UpdateMenuOption openForm={ openForm } />
                    <DeleteMenuOption openForm={ openForm } />
                </CoreMenu>
                }
            </RowMenu>

            { _uiux.form.isOpen ? 
                <GenreForm index={ index } /> 
            : null }

        </RowBox> 
    );
}

export default Genre;
export { Genre };