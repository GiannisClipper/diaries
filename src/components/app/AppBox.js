import React, { useContext, useEffect } from 'react';
import { AppContext } from '../app/AppContext';
import { REFContext } from '../REFContext';
//import { realFetch, mockFetch } from '../../helpers/customFetch';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { centeredness } from '../libs/InitStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookOpen, faCog, faCompass, faMap, faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';

import { Signin } from '../sign/Signin';
import { Signout } from '../sign/Signout';
import { Users } from '../user/User';
import { Diaries } from '../diary/Diary';
import ReportApp from '../report/ReportApp';
import Settings from '../settings/Settings';

import { ThemeProvider } from 'styled-components';
import { InitStyle } from '../libs/InitStyle';
import { light, dark } from '../../storage/themes';
import { heads } from '../../storage/texts';

const AppHeader = styled.div`
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

    ${props => props.theme.AppHeader && props.theme.AppHeader };
`;

const LinkSignin = () => {
    return (
        <Link to="/signin"> 
            <FontAwesomeIcon icon={ faDoorOpen } className="icon" title="Είσοδος" />
        </Link>
    )
}
const LinkSignout = () => {
    return (
        <Link to="/signout"> 
            <FontAwesomeIcon icon={ faDoorClosed } className="icon" title="Έξοδος" />
        </Link>
    )
}
const LinkUsers = () => {
    return (
        <Link to="/users"> 
            <FontAwesomeIcon icon={ faUser } className="icon" title="Χρήστες" />
        </Link>
    )
}
const LinkDiaries = () => {
    return (
        <Link to="/diaries"> 
            <FontAwesomeIcon icon={ faBookOpen } className="icon" title="Ημερολόγο" />
        </Link>
    )
}
const LinkReports = () => {
    return (
        <Link to="/reports"> 
            <FontAwesomeIcon icon={ faMap } className="icon" title="Καταστάσεις" />
        </Link>
    )
}
const LinkSettings = () => {
    return (
        <Link to="/settings"> 
            <FontAwesomeIcon icon={ faCog } className="icon" title="Ρυθμίσεις" />
        </Link>
    )
}
const ScrollToCentralDate = () => {
    const REF = useContext( REFContext );
    return (
        <button onClick={ event => REF.current.scrollToCentralDate( event )}>
            <FontAwesomeIcon icon={ faCompass } className="icon" title="Μετακίνηση στην κεντρική ημ/νία" />
        </button>
    )
}
// const Dev = () => {
//     return (
//         <button onClick={ event => {
//             realFetch( `/.netlify/functions/dev`, { method: 'GET' } )
//             .then( res => {
//                 alert( JSON.stringify( res ) );
//             } )
//             .catch( err => { 
//                 alert( err );
//             } );
//         } }>
//             Dev
//         </button>
//     )
// }

const AppMain = styled.div`
    padding-top: 8vh;
    text-align: center;
    ${props => props.centeredness && centeredness}
    ${props => props.theme.AppMain && props.theme.AppMain };
`;

function Error404() {
    return <>Error 404. Page not found.</>
}

const AppBox = React.memo( ( { page } ) => {

    const { state } = useContext( AppContext );
    const { settings, _uiux } = state;
    const { theme } = settings;
    const { _error } = _uiux;

    page = _error && _error.message && _error.message.includes( 'No auth' ) ? 'signin' : page;

    useEffect( () => console.log( 'Has rendered. ', 'AppBox' ) );

    return (
        <ThemeProvider theme={ theme === 'dark' ? dark : light }>
            <InitStyle />

            { page !== 'signin' ?
                <AppHeader>
                    <span>{ heads.app }</span>
                    {/* <Dev /> */}

                    { page === 'signin' ? 
                        <LinkSignin />
                    : page === 'signout' ?
                        <LinkSignin />
                    : page === 'diaries' ?
                        <>
                        <ScrollToCentralDate />
                        <LinkDiaries />
                        <LinkReports />
                        <LinkUsers />
                        <LinkSettings />
                        <LinkSignout />
                        </>
                    : page === 'users' ?
                        <>
                        <LinkDiaries />
                        <LinkReports />
                        <LinkUsers />
                        <LinkSettings />
                        <LinkSignout />
                        </>
                    : page === 'settings' ?
                        <>
                        <LinkDiaries />
                        <LinkReports />
                        <LinkUsers />
                        <LinkSettings />
                        <LinkSignout />
                        </>
                    :
                        <>
                        <LinkDiaries />
                        <LinkReports />
                        <LinkUsers />
                        <LinkSettings />
                        <LinkSignout />
                        </>
                    }
                </AppHeader>
            : null }

            <AppMain centeredness>
                { page === 'home' ? null
                : page === 'signin' ? <Signin />
                : page === 'signin' ?  null
                : page === 'signout' ? <Signout />
                : page === 'users' ? <Users />
                : page === 'diaries' ? <Diaries />
                : page === 'reports' ? <ReportApp />
                : page === 'settings' ? <Settings />
                : <Error404 /> }
            </AppMain>
       </ThemeProvider>
    );
} );

export default AppBox;
export { AppBox };
