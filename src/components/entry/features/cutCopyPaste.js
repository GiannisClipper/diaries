import presetAction from '../../core/helpers/presetAction';
import { dateToYYYYMMDD } from '../../core/helpers/dates';

function presetCutCopyPasteFeature( { cutCopyPasteContext, date, entries, index, actions, assets } ) {

    const entry = entries[ index ];

    const { 
        setCut,
        getCut, 
        setCopy, 
        getCopy, 
        setPaste, 
        setPasteProcess, 
    } = cutCopyPasteContext;

    const cutOk = presetAction( actions.cutOk, { assets, index } );
    const cutError = presetAction( actions.cutError, { assets, index } );
    const paste = presetAction( actions.paste, { assets, index } );
    const pasteOk = presetAction( actions.pasteOk, { assets, index } );
    const pasteError = presetAction( actions.pasteError, { assets, index } );

    const onCut = event => {
        setCut( { 
            data: { ...entry }, 
            cutOk, 
            cutError 
        } );
    }

    const onCopy = event => {
        setCopy( { 
            data: { ...entry }, 
        } );
    }

    const onPaste = event => {
        const data = getCut()
            ? { date: dateToYYYYMMDD( date ), index }
            : getCopy()
            ? { date: dateToYYYYMMDD( date ), index, id: null }
            : null

        setPaste( { 
            data,
            paste, 
            pasteOk, 
            pasteError 
        } );

        setPasteProcess();
    }

    return { onCut, onCopy, onPaste };
}


function cutCopyPasteFeature( { cutCopyPasteContext, entries, index, actions, assets } ) {

    const entry = entries[ index ];
    const { _uiux } = entry;

    const { 
        getCut, 
        getCopy, 
        setPasteOk, 
        setPasteError 
    } = cutCopyPasteContext;

    const createMode = presetAction( actions.createMode, { assets, index } );
    const createRequest = presetAction( actions.createRequest, { assets, index } );
    const updateMode = presetAction( actions.updateMode, { assets, index } );
    const updateRequest = presetAction( actions.updateRequest, { assets, index } );

    if ( _uiux.paste.isPaste ) {
        if ( Object.keys( _uiux.status ).length === 0 ) {
            if ( getCut() ) {
                updateMode();
                updateRequest();

            } else if ( getCopy() ) {
                createMode();
                createRequest();
            }

        } else if ( _uiux.status.isResponseOkAfter ) {
            setPasteOk();

        } else if ( _uiux.status.isResponseErrorAfter ) {
            setPasteError();
        }
    }
}

export { presetCutCopyPasteFeature, cutCopyPasteFeature };
