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