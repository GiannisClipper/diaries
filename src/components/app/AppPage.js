import React, { useContext } from 'react';
import styled from 'styled-components';
import { centeredness } from '../libs/InitStyle';
import texts from '../../storage/texts';
import { LinkHome, LinkBench, LinkDiaries, LinkUsers, LinkSettings, LinkSignout } from './AppLinks';
import { AppContext } from './AppContext';

const AppNav = styled.div`
    position: fixed;
    top: 10vh;
    left: 0;

    height: 80vh;
    width: 4em;
    text-align: center;

    * {
        width: 4em;
        height: calc( 80vh / 6 );
        display: inline-block;
    }

    .icon {
        font-size: 1.75em;
    }

    ${ props => props.theme.AppNav && props.theme.AppNav };
`;

const AppBox = styled.div`
    text-align: center;
    ${ props => props.centeredness && centeredness }
    ${ props => props.theme.AppBox && props.theme.AppBox };
`;

const AppInfo = styled.div`
    position: fixed;
    top: 10vh;
    left: calc( 100vw - 4em );

    height: 80vh;
    width: 4em;

    text-align: center;
    writing-mode: vertical-rl;
    -ms-transform: rotate( 180deg ); /* IE 9 */
    transform: rotate( 180deg );

    ${ props => props.theme.AppInfo && props.theme.AppInfo };
`;

const AppPage = props => {

    const { state } = useContext( AppContext );
    const { signin } = state;
    const { username } = signin;

    //useEffect( () => console.log( 'Has rendered. ', 'AppPage' ) );

    return (
        <>
            <AppNav>
                <LinkHome active />
                <LinkDiaries />
                <LinkBench />
                <LinkUsers />
                <LinkSettings />
                <LinkSignout />
            </AppNav>

            <AppBox centeredness>
                { `${username} @ ${texts.heads.app}` }
            </AppBox>

            <AppInfo>
                { `${username} @ ${texts.heads.app}` }
            </AppInfo>
        </>
    );
}

export default AppPage;
export { AppNav, AppBox, AppPage };