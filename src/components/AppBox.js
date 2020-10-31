import React, { useContext } from 'react';
import { REFContext } from './REFContext';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { centeredness } from './libs/InitStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookOpen, faCog, faCompass, faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { Signin, Signout } from './Auth';
import UserList from './UserList';
import DateList from './DateList';
import Settings from './Settings';
import { ThemeProvider } from 'styled-components';
import { InitStyle } from './libs/InitStyle';
import { light, dark } from '../storage/themes';

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
const LinkDates = () => {
    return (
        <Link to="/dates"> 
            <FontAwesomeIcon icon={ faBookOpen } className="icon" title="Ημερολόγο" />
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
const Dev = () => {
    return (
        <button onClick={ event => {
            realFetch( `/.netlify/functions/dev`, { method: 'GET' } )
            .then( res => {
                alert( JSON.stringify( res ) );
            } )
            .catch( err => { 
                alert( err );
            } );
        } }>
            Dev
        </button>
    )
}

const AppMain = styled.div`
    padding-top: 8vh;
    text-align: center;
    ${props => props.centeredness && centeredness}
    ${props => props.theme.AppMain && props.theme.AppMain };
`;

function Error404() {
    return <>Error 404. Page not found.</>
}

function AppBox( props ) {

    const { page } = props;

    return (
        <ThemeProvider theme={dark}>
            <InitStyle />

            <AppHeader>
                <span>Diaries by GiannisClipper</span>
                {/* <Dev /> */}

                { page === 'signin' ? 
                    <LinkSignin />
                : page === 'signout' ?
                    <LinkSignin />
                : page === 'dates' ?
                    <>
                    <ScrollToCentralDate />
                    <LinkDates />
                    <LinkUsers />
                    <LinkSettings />
                    <LinkSignout />
                    </>
                : page === 'users' ?
                    <>
                    <LinkDates />
                    <LinkUsers />
                    <LinkSettings />
                    <LinkSignout />
                    </>
                : page === 'settings' ?
                    <>
                    <LinkDates />
                    <LinkUsers />
                    <LinkSettings />
                    <LinkSignout />
                    </>
                :
                    <>
                    <LinkDates />
                    <LinkUsers />
                    <LinkSettings />
                    <LinkSignout />
                    </>
                }
            </AppHeader>

            <AppMain centeredness>
                { page === 'home' ? <></>
                : page === 'signin' ? <Signin />
                : page === 'signout' ? <Signout />
                : page === 'dates' ? <DateList />
                : page === 'users' ? <UserList />
                : page === 'settings' ? <Settings />
                : <Error404 /> }
            </AppMain>
        </ThemeProvider>
    );
}

export default AppBox;
export { AppBox };
