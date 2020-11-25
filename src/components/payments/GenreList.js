import React, { useContext, useEffect } from 'react';
import { STATEContext } from '../STATEContext';

import { RowBox, RowValue, RowMenu } from '../libs/RowBox';

import { CRUDContextProvider, CRUDMenu, CreateRequest, UpdateRequest, DeleteRequest, RetrieveAllRequest } from '../libs/CRUD';
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

    return (
        <CRUDContextProvider 
            dispatch={dispatch} 
            namespace={namespace} 
        >
            <RetrieveAllRequest 
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
                    dataToDB={dataToDB}
                    body={JSON.stringify( { data: dataToDB } )}
                />
            : genre.uiux.mode.isUpdate ?
                <UpdateRequest 
                    process={genre.uiux.process}
                    url={`/.netlify/functions/payments-genre?id=${genre.data.id}`}
                    dataToDB={dataToDB}
                    body={JSON.stringify( { data: dataToDB } )}
                />
            : genre.uiux.mode.isDelete ?
                <DeleteRequest 
                    process={genre.uiux.process}
                    url={`/.netlify/functions/payments-genre?id=${genre.data.id}`}
                    dataToDB={dataToDB}
                    body={JSON.stringify( { data: dataToDB } )}
                />
            : null }

            <RowBox key={index}>
                <RowValue title={`${genre.data.id}`}>
                    <span style={{ fontFamily: 'monospace' }} >{`${typeInfo} ${genre.data.code} `}</span>
                    <span>{genre.data.name}</span>
                </RowValue>

                <RowMenu>
                    <CRUDMenu 
                        process={genre.uiux.process}
                        status={genre.uiux.status}
                        id={genre.data.id}
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