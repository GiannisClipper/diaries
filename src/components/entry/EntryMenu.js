import React, { useContext, useRef } from 'react';

import { Modal } from '../commons/Modal';
import { MenuBox } from '../commons/MenuBox';

import { 
    MenuOption,
    CreateOption,
    UpdateOption,
    DeleteOption,
    CutOption,
    CopyOption,
    PasteOption,
    CloseOption
} from '../core/CoreMenu';

import presetAction from '../core/helpers/presetAction';

function EntryMenuOption( { index, actions, assets, lexicon } ) {

    const openMenu = presetAction( actions.openMenu, { assets, index } );

    const menuOptionRef = useRef( null );

    return ( 
        <MenuOption
            lexicon={ lexicon }
            reference={ menuOptionRef }
            onClick={ event => {
                const { top, left } = menuOptionRef.current.getBoundingClientRect();
                const menuOptionCoords = { top, left };
                openMenu( { menuOptionCoords } );
            }}
        />
    );
}

function EntryMenu( { index, actions, assets, children, menuOptionCoords } ) {

    const closeMenu = presetAction( actions.closeMenu, { assets, index } );

    let { top, left } = menuOptionCoords;
    top = `${ top }px`;
    left = `calc( ${ left }px - ${ children.length * 2 }em )`;
    const style = { top, left };

    return (
        <Modal onClick={ closeMenu }>
            <MenuBox style={ style }> 
                { children }
            </MenuBox>
        </Modal>
    );
}

function BlankEntryMenu( { index, actions, assets, lexicon, menuOptionCoords, onPaste } ) {

    const createMode = presetAction( actions.createMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );
    const closeMenu = presetAction( actions.closeMenu, { assets, index } );

    return (
        <EntryMenu
            index={ index }
            actions={ actions }
            assets={ assets }
            menuOptionCoords={ menuOptionCoords }
        >

            <CreateOption
                lexicon={ lexicon }
                onClick={ event => {
                    createMode();
                    openForm();
                    closeMenu();
                } }
            />

            <PasteOption
                lexicon={ lexicon }
                onClick={ event => {
                    closeMenu();
                    onPaste();
                } }
            />

            <CloseOption
                lexicon={ lexicon }
                onClick={ closeMenu }
            />

        </EntryMenu>
    );
}

function ExistsEntryMenu( { index, actions, assets, lexicon, menuOptionCoords, onCut, onCopy, onPaste } ) {
    
    const updateMode = presetAction( actions.updateMode, { assets, index } );
    const deleteMode = presetAction( actions.deleteMode, { assets, index } );
    const openForm = presetAction( actions.openForm, { assets, index } );
    const closeMenu = presetAction( actions.closeMenu, { assets, index } );

    return (
        <EntryMenu
            index={ index }
            actions={ actions }
            assets={ assets }
            menuOptionCoords={ menuOptionCoords }
        >

            <UpdateOption
                lexicon={ lexicon }
                onClick={ event => {
                    updateMode();
                    openForm();
                    closeMenu();
                } }
            />

            <DeleteOption
                lexicon={ lexicon }
                onClick={ event => {
                    deleteMode();
                    openForm();
                    closeMenu();
                } }
            />

            <CutOption
                lexicon={ lexicon }
                onClick={ event => {
                    onCut();
                    closeMenu();
                } }
            />

            <CopyOption
                lexicon={ lexicon }
                onClick={ event => {
                    onCopy();
                    closeMenu();
                } }
            />

            <PasteOption
                lexicon={ lexicon }
                onClick={ event => {
                    closeMenu();
                    onPaste();
                } }
            />

            <CloseOption
                lexicon={ lexicon }
                onClick={ closeMenu }
            />

        </EntryMenu>
    );
}

export { EntryMenuOption, BlankEntryMenu, ExistsEntryMenu };
