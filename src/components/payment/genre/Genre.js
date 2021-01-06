import React, { useContext, useEffect } from 'react';

import { CoreContextProvider } from '../../core/CoreContext';
import actions from '../../../storage/core/actions';
import { paymentGenreSchema } from '../../../storage/schemas';
import { parseGenreFromDB } from '../../../storage/payment/genre/parsers';
import { CreateRequest, UpdateRequest, DeleteRequest } from '../../core/CoreRequests';
import { CoreMenu, CreateMenuOption, UpdateMenuOption, DeleteMenuOption } from '../../core/CoreMenu';

import { BenchContext } from '../../bench/BenchContext';
import { GenresContext } from './GenresContext';
import { parseGenreToDB } from '../../../storage/payment/genre/parsers';

import { RowBox, RowValue, RowMenu } from '../../libs/RowBox';

import GenreForm from './GenreForm';

function Genre( { index } ) {

    const { diary_id } = useContext( BenchContext ).state;

    const { state, dispatch } = useContext( GenresContext );
    const { genres } = state;
    const genre = genres[ index ];
    const { _uiux } = genre;

    const payload = { 
        _namespace: 'genres',
        index,
        _saved: genre,
        _schema: paymentGenreSchema,
        _parseFromDB: parseGenreFromDB,
        _sort: null,
    };

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
        <CoreContextProvider 
            actions={ [ 
                actions.form, 
                actions.validation, 
                actions.createOne, 
                actions.updateOne, 
                actions.deleteOne 
            ] }
            dispatch={ dispatch } 
            payload={ payload }
        >

            { _uiux.mode.isCreate ?
                <CreateRequest
                    process={_uiux.process}
                    url={ `/.netlify/functions/payment-genre` }
                    body={ JSON.stringify( { data: { ...dataToDB, diary_id } } ) }
                    dataToDB={ { ...dataToDB, diary_id } }
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
                    { ! genre.id 
                    ?
                    <CoreMenu process={ _uiux.process } >
                        <CreateMenuOption />
                    </CoreMenu>
                    :
                    <CoreMenu process={ _uiux.process } >
                        <UpdateMenuOption />
                        <DeleteMenuOption />
                    </CoreMenu>
                    }
                </RowMenu>
            </RowBox> 

            { _uiux.form.isOpen ? 
                <GenreForm 
                    index={ index } 
                /> 
            : null }

        </CoreContextProvider>
    );
}

export default Genre;
export { Genre };