import React from 'react';

import { OptionBox } from '../commons/MenuBox';
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
} from '../commons/Icons';

function WithOptionBox( Option ) {
    return function WithOptionBoxIcon( { reference, onClick, lexicon } ) {
        return (
            <OptionBox 
                ref={ reference }
                onClick={ onClick }
            >
                <Option lexicon={ lexicon } />
            </OptionBox>
        )
    }
}

const LoadingOption = WithOptionBox( 
    () => <LoadingIcon />
)

const SuspendedOption = WithOptionBox( 
    () => <SuspendedIcon />
)

const MenuOption = WithOptionBox( 
    ( { lexicon } ) => <MenuIcon title={ lexicon.core.menu } />
)

const CreateOption = WithOptionBox( 
    ( { lexicon } ) => <CreateIcon title={ lexicon.core.create } />
)

const RetrieveOption = WithOptionBox( 
    ( { lexicon } ) => <RetrieveIcon title={ lexicon.core.retrieve } />
)

const UpdateOption = WithOptionBox( 
    ( { lexicon } ) => <UpdateIcon title={ lexicon.core.update } />
)

const DeleteOption = WithOptionBox( 
    ( { lexicon } ) => <DeleteIcon title={ lexicon.core.delete } />
)

const CutOption = WithOptionBox( 
    ( { lexicon } ) => <CutIcon title={ lexicon.core.cut } />
)

const CopyOption = WithOptionBox( 
    ( { lexicon } ) => <CopyIcon title={ lexicon.core.copy } />
)

const PasteOption = WithOptionBox( 
    ( { lexicon } ) => <PasteIcon title={ lexicon.core.paste } />
)

const CloseOption = WithOptionBox( 
    ( { lexicon } ) => <CloseIcon title={ lexicon.core.close } />
)

function CoreMenu( { status, children } ) {

    status = status || {};

    return ( 
        status.isValidation ||
        status.isRequestBefore ||
        status.isRequest ||
        status.isResponseWaiting 
        ?
            <LoadingOption />
        : 
        status.isSuspended
        ?
            <SuspendedOption />
        : 
            <>{ children }</>
    );
}

export default CoreMenu;
export { 
    CoreMenu,
    LoadingOption,
    SuspendedOption,
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