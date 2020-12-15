import React, { useContext, useEffect } from 'react';
import { STATEContext } from '../STATEContext';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { CRUDContextProvider, CRUDMenu, RetrieveManyRequest, CreateRequest, UpdateRequest, DeleteRequest } from '../libs/CRUD';
import GenreForm from './GenreForm';
import { parseGenreToDB } from '../../storage/payments/parsers';

const namespace = 'payments.genres';

function GenreList() {

    const STATE = useContext( STATEContext );
    const { genres } = STATE.state.data.payments;

    useEffect( () => {
        console.log( 'Has rendered. ', 'payments/GenreList' );
    } );

    let index = -1;

    return (
        <ul>
            <GenreInit />
            { genres.map( genre => (
                <Genre key={++index} index={index} genres={genres} />
            ) ) }
        </ul>
    );
}

function GenreInit() {

    const STATE = useContext( STATEContext )
    const { dispatch } = STATE;
    const { init } = STATE.state.uiux;

    useEffect( () => {
        console.log( 'Has rendered. ', 'payments/GenreInit' );
    } );

    return (
        <CRUDContextProvider 
            dispatch={dispatch} 
            namespace={namespace} 
        >
            <RetrieveManyRequest 
                process={init.payments.genres.process}
                url={`/.netlify/functions/payments-genre`}
            />
        </CRUDContextProvider>
    );
}

function Genre( { index, genres } ) {

    const genre = genres[ index ];

    const STATE = useContext( STATEContext )
    const { dispatch } = STATE;
    const payload = { index, _saved: genre.data };
    const dataToDB = parseGenreToDB( genre.data );

    const typeInfo = genre.uiux.mode.isCreate
        ? ''
        : genre.data.isIncoming && genre.data.isOutgoing
        ? 'Μ'
        : genre.data.isIncoming
        ? 'Ε'
        : genre.data.isOutgoing
        ? 'Π'
        : '-';

    return (
        <CRUDContextProvider 
            dispatch={dispatch} 
            namespace={namespace} 
            payload={payload}
        >
            { genre.uiux.mode.isCreate ?
                <CreateRequest
                    process={genre.uiux.process}
                    url={ `/.netlify/functions/payments-genre`}
                    body={JSON.stringify( { data: dataToDB } )}
                    dataToDB={dataToDB}
                />
            : genre.uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={genre.uiux.process}
                    url={`/.netlify/functions/payments-genre?id=${genre.data.id}`}
                    body={JSON.stringify( { data: dataToDB } )}
                    dataToDB={dataToDB}
                    id={genre.data.id}
                />
            : genre.uiux.mode.isDelete ?
                <DeleteRequest 
                    process={genre.uiux.process}
                    url={`/.netlify/functions/payments-genre?id=${genre.data.id}`}
                    body={JSON.stringify( { data: dataToDB } )}
                    dataToDB={dataToDB}
                    id={genre.data.id}
                />
            : null }

            <RowBox key={index}>
                <RowValue title={`${genre.data.id}`}>
                    <span style={{ fontFamily: 'monospace' }} >{`${typeInfo} ${genre.data.code} `}</span>
                    <span>{genre.data.name}</span>
                </RowValue>

                <RowMenu>
                    <CRUDMenu 
                        options={!genre.data.id ? [ 'C' ] : [ 'U', 'D' ]}
                        process={genre.uiux.process}
                        status={genre.uiux.status}
                    />
                </RowMenu>

                { genre.uiux.form.isOpen ? 
                    <GenreForm 
                        genres={genres} 
                        index={index} 
                    /> 
                : null }
            </RowBox> 
        </CRUDContextProvider>
    );
}

export default GenreList;
export { GenreInit, GenreList };