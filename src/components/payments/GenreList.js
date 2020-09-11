import React, { useRef, useContext, useEffect } from 'react';
import '../../styles/payments/GenreList.css';
import { STATEContext } from '../STATEContext';
import { EditTool, DeleteTool } from '../libs/Tools';

const namespace = 'payments';

function GenreList() {

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
        <div className="PaymentGenreList">
            <ul>
                { genres.map( genre => (
                    <Genre index={++index} genre={genre} />
                ) ) }
            </ul>
        </div>
    );
}

function Genre( { index, genre } ) {
    return (
        <li 
            className={`PaymentGenre`}
            key={index}
        >
            <div className='data' title={`${genre.data.id}`}>
                {`${genre.data.isIncoming ? 'Ε' : 'Π'} ${genre.data.code} ${genre.data.name}`}
            </div>

            <div className='menu'>
                <EditTool onClick={event => {
                    // REF.current.openEntryForm( event, date, entry, inSequence, { isNote: true }, { isUpdate: true } );
                    // REF.current.closeMenu( event, date, inSequence );
                }} />

                <DeleteTool onClick={event => {
                    // REF.current.openEntryForm( event, date, entry, inSequence, { isNote: true }, { isDelete: true } );
                    // REF.current.closeMenu( event, date, inSequence );
                }} />
            </div>

            {/* {genre.uiux.form.isOpen ? <PaymentGenreForm genre={genre} /> : null} */}

        </li> 
    );
}

export default GenreList;