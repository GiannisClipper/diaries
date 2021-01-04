import React from 'react';
import styled from 'styled-components';
import { centeredness } from '../libs/InitStyle';
import texts from '../../storage/texts';
import { LinkHome, LinkDiaries, LinkUsers, LinkSettings, LinkSignout } from './AppLinks';

const AppNavStyle = styled.div`
    position: fixed;
    top: 0;
    width: 100%;

    height: 8vh;
    line-height: 8vh;

    text-align: center;

    * {
        font: inherit;
        color: inherit;
        background-color: inherit;
        margin-left: .5em;
        margin-right: .5em;
    }

    .icon {
        font-size: 1.5em;
        background-color: transparent;
    }

    ${ props => props.theme.AppNav && props.theme.AppNav };
`;

const AppNav = props => {

    return (
        <AppNavStyle>

            <span>{ texts.heads.app }</span>

            { props.children }

        </AppNavStyle>
    );
}

const AppBox = styled.div`
    padding-top: 8vh;
    text-align: center;
    ${ props => props.centeredness && centeredness }
    ${ props => props.theme.AppBox && props.theme.AppBox };
`;

const AppPage = props => {

    //useEffect( () => console.log( 'Has rendered. ', 'AppPage' ) );

    return (
        <>
        <AppNav>
            <LinkHome />
            <LinkDiaries />
            <LinkUsers />
            <LinkSettings />
            <LinkSignout />
        </AppNav>

        <AppBox centeredness/>
        </>
    );
}

export default AppPage;
export { AppNav, AppBox, AppPage };