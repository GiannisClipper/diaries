import React, { useContext } from 'react';
import { STATEContext } from './STATEContext';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AppBox } from './AppBox';

function Routes() {

    const STATE = useContext( STATEContext );

    const { signin } = STATE.state.data;

    return (
        <BrowserRouter>
            {signin.data.token
            ?
                <Switch>
                    <Route exact path='/' render={() => (<AppBox page="home" />)} />
                    <Route exact path='/dates' render={() => (<AppBox page="dates" />)} />
                    <Route exact path='/users' render={() => (<AppBox page="users" />)} />
                    <Route exact path='/settings' render={() => (<AppBox page="settings" />)} />
                    <Route exact path='/signout' render={() => (<AppBox page="signout" />)} />
                    <Route exact path='/signin' render={() => (<Redirect to={{ pathname: '/' }} />)} />
                    <Route render={() => (<AppBox page="404" />)} />
                </Switch>
            :
                <Switch>
                    <Route exact path='/signin' render={() => (<AppBox page="signin" />)} />
                    <Route render={() => (<Redirect to={{ pathname: '/signin' }} />)} />
                </Switch>
            }
        </BrowserRouter>
    );
}

export default Routes;
