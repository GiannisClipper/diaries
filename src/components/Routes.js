import React, { useContext, useState, useEffect } from 'react';
import { STATEContext } from './STATEContext';
import { REFContext } from './REFContext';
import { realFetch, mockFetch } from '../helpers/customFetch';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { centeredness } from './libs/InitStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookOpen, faCog, faCompass, faDoorOpen, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { Signin, Signout } from './Auth';
import UserList from './UserList';
import DateList from './DateList';
import Settings from './Settings';

const GotoSignin = () => {
    return (
        <a href="/signin"> 
            <FontAwesomeIcon icon={ faDoorOpen } className="icon" title="Είσοδος" />
        </a>
    )
}
const GotoSignout = () => {
    return (
        <a href="/signout"> 
            <FontAwesomeIcon icon={ faDoorClosed } className="icon" title="Έξοδος" />
        </a>
    )
}
const GotoUsers = () => {
    return (
        <a href="/users"> 
            <FontAwesomeIcon icon={ faUser } className="icon" title="Χρήστες" />
        </a>
    )
}
const GotoDates = () => {
    return (
        <a href="/dates"> 
            <FontAwesomeIcon icon={ faBookOpen } className="icon" title="Ημερολόγο" />
        </a>
    )
}
const GotoSettings = () => {
    return (
        <a href="/settings"> 
            <FontAwesomeIcon icon={ faCog } className="icon" title="Ρυθμίσεις" />
        </a>
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

const AppHeader = styled.div`
    position: fixed;
    top: 0;
    width: 100%;

    height: 8vh;
    line-height: 8vh;
    background-color: ${props => props.theme.app.background.normal};
    color: ${props => props.theme.app.font.emphasized};

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
`;

const AppMain = styled.div`
    padding-top: 8vh;
    text-align: center;
    background-color: ${props => props.theme.app.background.back};
    ${props => props.centeredness && centeredness}
`;

function Error404() {
    return <>Error 404. Page not found.</>
}

function AppLayout( props ) {

    const { layout, setToken } = props;

    return (
        <>
        <AppHeader>
            <span>Diaries by GiannisClipper</span>
            {/* <Dev /> */}

            { layout === 'signin' ? 
                <GotoSignin />
            : layout === 'signout' ?
                <GotoSignin />
            : layout === 'dates' ?
                <>
                <ScrollToCentralDate />
                <GotoDates />
                <GotoUsers />
                <GotoSettings />
                <GotoSignout />
                </>
            : layout === 'users' ?
                <>
                <GotoDates />
                <GotoUsers />
                <GotoSettings />
                <GotoSignout />
                </>
            : layout === 'settings' ?
                <>
                <GotoDates />
                <GotoUsers />
                <GotoSettings />
                <GotoSignout />
                </>
            :
                <>
                <GotoDates />
                <GotoUsers />
                <GotoSettings />
                <GotoSignout />
                </>
            }
        </AppHeader>

        <AppMain centeredness>
            { layout === 'home' ? <></>
            : layout === 'signin' ? <Signin setToken={setToken} />
            : layout === 'signout' ? <Signout setToken={setToken} />
            : layout === 'dates' ? <DateList />
            : layout === 'users' ? <UserList />
            : layout === 'settings' ? <Settings />
            : <Error404 /> }
        </AppMain>
        </>
    );
}

function Routes() {

    const [ token, setToken ] = useState( localStorage.getItem( 'token' ) );

    return (
        <BrowserRouter>
            {token
            ?
                <Switch>
                    <Route exact path='/' render={() => (<AppLayout layout="home" />)} />
                    <Route exact path='/dates' render={() => (<AppLayout layout="dates" />)} />
                    <Route exact path='/users' render={() => (<AppLayout layout="users" />)} />
                    <Route exact path='/settings' render={() => (<AppLayout layout="settings" />)} />
                    <Route exact path='/signout' render={() => (<AppLayout layout="signout" setToken={setToken} />)} />
                    <Route exact path='/signin' render={() => (<Redirect to={{ pathname: '/' }} />)} />
                    <Route render={() => (<AppLayout layout="404" />)} />
                </Switch>
            :
                <Switch>
                    <Route exact path='/signin' render={() => (<AppLayout layout="signin" setToken={setToken} />)} />
                    <Route render={() => (<Redirect to={{ pathname: '/signin' }} />)} />
                </Switch>
            }
        </BrowserRouter>
    );
}

export default Routes;
