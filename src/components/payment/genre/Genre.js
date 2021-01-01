import React, { useContext, useEffect } from 'react';
import { GenresContext } from './GenresContext';
import { CRUDContextProvider, CRUDMenu, CreateRequest, UpdateRequest, DeleteRequest } from '../../libs/CRUD';
import { parseGenreToDB } from '../../../storage/payment/genre/parsers';

import { RowBox, RowValue, RowMenu } from '../../libs/RowBox';

import GenreForm from './GenreForm';

function Genre( { index } ) {

    const { state, dispatch } = useContext( GenresContext );
    const { genres } = state;
    const genre = genres[ index ];
    const { _uiux } = genre;

    const payload = { index, _saved: genre };
    const dataToDB = parseGenreToDB( genre );

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
        <CRUDContextProvider 
            dispatch={ dispatch } 
            payload={ payload }
        >

            { _uiux.mode.isCreate ?
                <CreateRequest
                    process={_uiux.process}
                    url={ `/.netlify/functions/payment-genre` }
                    body={ JSON.stringify( { data: dataToDB } ) }
                    dataToDB={ dataToDB }
                />

            : _uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={ _uiux.process}
                    url={ `/.netlify/functions/payment-genre?id=${genre.id}` }
                    body={ JSON.stringify( { data: dataToDB } ) }
                    dataToDB={ dataToDB }
                    id={ genre.id }
                />

            : _uiux.mode.isDelete ?
                <DeleteRequest 
                    process={ _uiux.process }
                    url={ `/.netlify/functions/payment-genre?id=${genre.id}` }
                    body={ JSON.stringify( { data: dataToDB } ) }
                    dataToDB={ dataToDB }
                    id={ genre.id }
                />

            : null }

            <RowBox key={ index }>
                <RowValue title={ `${genre.id}` }>
                    <span style={ { fontFamily: 'monospace' } } >{ `${typeInfo} ${genre.code} ` }</span>
                    <span>{ genre.name }</span>
                </RowValue>

                <RowMenu>
                    <CRUDMenu 
                        options={ ! genre.id ? [ 'C' ] : [ 'U', 'D' ] }
                        process={ _uiux.process }
                    />
                </RowMenu>

                { _uiux.form.isOpen ? 
                    <GenreForm 
                        index={ index } 
                    /> 
                : null }
            </RowBox> 
        </CRUDContextProvider>
    );
}

export default Genre;
export { Genre };