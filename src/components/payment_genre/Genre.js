import React, { useEffect } from 'react';

import { RowBox, RowValue, RowMenu } from '../commons/RowBox';

import { CoreMenu, CreateOption, UpdateOption, DeleteOption } from '../core/CoreMenu';
import presetAction from '../core/helpers/presetAction';
import { createRequestFeature, updateRequestFeature, deleteRequestFeature } from '../core/features/requests';

import { urls } from '../app/assets/urls';

import GenreForm from './GenreForm';

function Genre( { genres, index, actions, assets, lexicon } ) {

    const genre = genres[ index ];
    const { _uiux } = genre;

    const createMode = presetAction( actions.createMode, { assets, index } );
    const updateMode = presetAction( actions.updateMode, { assets, index } );
    const deleteMode = presetAction( actions.deleteMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );

    const typeInfo =
        genre.type === `revenue` 
        ? lexicon.paymentGenre.types.revenue.substr( 0, 2 ) 
        : genre.type === `expense` 
        ? lexicon.paymentGenre.types.expense.substr( 0, 2 ) 
        : '--';

    // request features

    useEffect( () => {

        if ( _uiux.mode.isCreate ) {
            createRequestFeature( { 
                _item: genre,
                actions,
                assets,
                index,
                url: urls.payment_genre
            } );

        } else if ( _uiux.mode.isUpdate ) {
            updateRequestFeature( { 
                _item: genre,
                actions,
                assets,
                index,
                url: `${ urls.payment_genre }?id=${ genre.id }`
            } );

        } else if ( _uiux.mode.isDelete ) {
            deleteRequestFeature( { 
                _item: genre,
                actions,
                assets,
                index,
                url: `${ urls.payment_genre }?id=${ genre.id }`
            } );
        }
    }, [ genre, _uiux, actions, assets, index ] );

    return (
        <RowBox>

            <RowValue title={ `${ genre.diary_id }.${ genre.id }` }>
                <span style={ { fontFamily: 'monospace' } } >{ `${ typeInfo } ${ genre.code } ` }</span>
                <span>{ genre.name }</span>
            </RowValue>

            <RowMenu>
                { ! genre.id 
                    ?
                    <CoreMenu status={ _uiux.status } >
                        <CreateOption 
                            lexicon={ lexicon }
                            onClick={ () => { 
                                createMode(); 
                                openForm(); 
                            } }
                        />
                    </CoreMenu>
                    :
                    <CoreMenu status={ _uiux.status } >
                        <UpdateOption 
                            lexicon={ lexicon }
                            onClick={ () => { 
                                updateMode(); 
                                openForm(); 
                            } }
                        />
                        <DeleteOption 
                            lexicon={ lexicon }
                            onClick={ () => { 
                                deleteMode(); 
                                openForm(); 
                            } }
                        />
                    </CoreMenu>
                }
            </RowMenu>

            { _uiux.form.isOpen ? 
                <GenreForm
                    genres={ genres }
                    index={ index }
                    actions={ actions }
                    assets={ assets }
                    lexicon={ lexicon }
                /> 
            : null }

        </RowBox> 
    );
}

export default Genre;
export { Genre };