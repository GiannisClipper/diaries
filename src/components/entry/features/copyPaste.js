import presetAction from '../../core/helpers/presetAction';
import { dateToYYYYMMDD } from '../../core/helpers/dates';

function presetCopyPasteFeature( { copyPasteContext, date, entries, index, actions, assets } ) {

    const entry = entries[ index ];

    const { 
        setCut,
        setCopy, 
        getCut,
        getCopy, 
        isCut, 
        isCopy, 
    } = copyPasteContext;

    const cutBefore = presetAction( actions.cutBefore, { assets, index } );
    const cut = presetAction( actions.cut, { assets, index } );
    const cutOk = presetAction( actions.cutOk, { assets, index } );
    const cutError = presetAction( actions.cutError, { assets, index } );
    const pasteBefore = presetAction( actions.pasteBefore, { assets, index } );

    const onCut = event => {
        setCut( {
            data: { ...entry },
            index,
            cut,
            cutOk,
            cutError
        } );

        cutBefore();
    }

    const onCopy = event => {
        setCopy( { 
            data: { ...entry },
            index,
        } );
    }

    const onPaste = event => {

        let data = isCut() ? { ...getCut().data } : isCopy() ? { ...getCopy().data } : null;

        const sourceIndex = isCut() ? getCut().index : isCopy() ? getCopy().index : null;

        if ( data.date !== dateToYYYYMMDD( date ) || sourceIndex !== index ) {  // no paste to item itself

            if ( isCut() ) {
                const { cut } = getCut();
                cut();
            }

            data.date = dateToYYYYMMDD( date ); 
            data.id = isCopy() ? null : data.id;
            const payload = { data };
            pasteBefore( payload );
        }
    }

    return { onCut, onCopy, onPaste };
}

function copyPasteFeature( { copyPasteContext, entries, index, actions, assets } ) {

    const entry = entries[ index ];
    const { _uiux } = entry;

    const { 
        isCut,
        isCopy,
        setCut,
        getCut,
    } = copyPasteContext;

    const paste = presetAction( actions.paste, { assets, index } );
    const pasteOk = presetAction( actions.pasteOk, { assets, index } );
    const pasteError = presetAction( actions.pasteError, { assets, index } );

    if ( _uiux.copyPaste.isPasteBefore ) {
        if ( isCut() ) {
            const { cutOk } = getCut();
            cutOk();
        }
        paste();
    
    } else if ( _uiux.copyPaste.isPaste ) {
        if ( Object.keys( _uiux.status ).length === 0 ) {
            if ( isCut() ) {
                const updateMode = presetAction( actions.updateMode, { assets, index } );
                const updateRequest = presetAction( actions.updateRequest, { assets, index } );
                updateMode();
                updateRequest();

            } else if ( isCopy() ) {
                const createMode = presetAction( actions.createMode, { assets, index } );
                const createRequest = presetAction( actions.createRequest, { assets, index } );
                createMode();
                createRequest();
            }

        } else if ( _uiux.status.isResponseOkAfter ) {    
            pasteOk();
            setCut( null );
    
        } else if ( _uiux.status.isResponseErrorAfter ) {
            pasteError();
            if ( isCut() ) {
                const { cutError } = getCut();
                cutError();
            }    
            setCut( null );
        }
    }
}

export { presetCopyPasteFeature, copyPasteFeature };
