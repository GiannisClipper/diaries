import React from 'react';

import { OptionBox } from '../libs/MenuBox';
import { 
    LoadingIcon,
    SuspendedIcon,
    MenuIcon,
    CreateIcon,
    RetrieveIcon,
    UpdateIcon,
    DeleteIcon,
    CutIcon,
    CopyIcon,
    PasteIcon,
    CloseIcon,
} from '../libs/Icons';

function CoreMenu( { status, children } ) {

    status = status || {};

    return ( 
        status.isValidation ||
        status.isRequestBefore ||
        status.isRequest ||
        status.isResponseWaiting 
        ?
            <LoadingIcon />
        : 
        status.isResponseError ||
        status.isResponseErrorAfter 
        ?
            <SuspendedIcon />
        : 
            <>{ children }</>
    );
}

function MenuOption( { reference, onClick, lexicon } ) {

    return (
        <OptionBox 
            ref={ reference }
            onClick={ onClick }
        >
            <MenuIcon title={ lexicon.core.menu } />
        </OptionBox>
    )
}

function CreateOption( { reference, onClick, lexicon } ) {

    return (
        <OptionBox 
            ref={ reference }
            onClick={ onClick }
        >
            <CreateIcon title={ lexicon.core.create } />
        </OptionBox>
    )
}

function RetrieveOption( { reference, onClick, lexicon } ) {

    return (
        <OptionBox 
            ref={ reference }
            onClick={ onClick }
        >
            <RetrieveIcon title={ lexicon.core.retrieve } />
        </OptionBox>
    )
}

function UpdateOption( { reference, onClick, lexicon } ) {

    return (
        <OptionBox 
            ref={ reference }
            onClick={ onClick }
        >
            <UpdateIcon title={ lexicon.core.update } />
        </OptionBox>
    )
}

function DeleteOption( { reference, onClick, lexicon } ) {

    return (
        <OptionBox 
            ref={ reference }
            onClick={ onClick }
        >
            <DeleteIcon title={ lexicon.core.delete } />
        </OptionBox>
    )
}

function CutOption( { reference, onClick, lexicon } ) {

    return (
        <OptionBox 
            ref={ reference }
            onClick={ onClick }
        >
            <CutIcon title={ lexicon.core.cut } />
        </OptionBox>
    )
}

function CopyOption( { reference, onClick, lexicon } ) {

    return (
        <OptionBox 
            ref={ reference }
            onClick={ onClick }
        >
            <CopyIcon title={ lexicon.core.copy } />
        </OptionBox>
    )
}

function PasteOption( { reference, onClick, lexicon } ) {

    return (
        <OptionBox 
            ref={ reference }
            onClick={ onClick }
        >
            <PasteIcon title={ lexicon.core.paste } />
        </OptionBox>
    )
}

function CloseOption( { reference, onClick, lexicon } ) {

    return (
        <OptionBox
            ref={ reference }
            onClick={ onClick }
        >
            <CloseIcon title={ lexicon.core.close } />
        </OptionBox>
    )
}

export default CoreMenu;
export { 
    CoreMenu,
    MenuOption,
    CreateOption,
    RetrieveOption,
    UpdateOption,
    DeleteOption,
    CutOption,
    CopyOption,
    PasteOption,
    CloseOption,
};