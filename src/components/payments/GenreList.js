import React, { useRef, useContext, useEffect } from 'react';
import '../../styles/payments/GenreList.css';
import { STATEContext } from '../STATEContext';
import { REFContext } from '../REFContext';
import { EditTool, DeleteTool } from '../libs/Tools';
import GenreMenu from './GenreMenu';
import GenreForm from './GenreForm';

const namespace = 'payments';

function GenreList( { className } ) {

    const status = useRef( { isBeforeFirstRequest: true } );

    const STATE = useContext( STATEContext );

    const { genres } = STATE.state.data.payments;

    useEffect( () => {
        if ( status.current.isBeforeFirstRequest ) {
            console.log( 'add_init_genres' )
            status.current = {};
            STATE.dispatch( { namespace, type: 'INITIALIZE_GENRE_LIST' } );
        }
    } );

    useEffect( () => {
        console.log( 'Has rendered. ', 'PaymentGenreList' );
    } );

    let index = -1;

    return (
        <div className={`payments GenreList ${className}`}>
            <ul>
                { genres.map( genre => (
                    <Genre index={++index} genre={genre} />
                ) ) }
            </ul>
        </div>
    );
}

function Genre( { index, genre } ) {

    const STATE = useContext( STATEContext );
    const REF = useContext( REFContext );

    const openForm = mode => {
        REF.current.saved = { genre };

        STATE.dispatch( { 
            namespace,
            type: 'OPEN_FORM',
            payload: { index, mode },
        } );
    }

    const closeForm = () => {
        STATE.dispatch( { 
            namespace,
            type: 'CLOSE_FORM',
            payload: { index },
        } );
    }

    const mode = !genre.id ? { isCreate: true } : { isUpdate: true };

    return (
        <li 
            className={`payments Genre`}
            key={index}
        >
            <div className='data' title={`${genre.data.id}`}>
                {`${genre.data.isIncoming ? 'Ε' : 'Π'} ${genre.data.code} ${genre.data.name}`}
            </div>

            <GenreMenu openForm={openForm} mode={mode} />

            {genre.uiux.form.isOpen ? <GenreForm genre={genre} index={index} closeForm={closeForm} /> : null}

        </li> 
    );
}

export default GenreList;