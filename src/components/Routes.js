import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Signin, Signout } from './Auth';
import UserList from './UserList';
import DateList from './DateList';
import Settings from './Settings';

function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/signin' component={ Signin } />
                <Route exact path='/signout' component={ Signout } />
                <Route exact path='/users' component={ UserList } />
                <Route exact path='/dates' component={ DateList } />
                <Route exact path='/settings' component={ Settings } />
                <Route render={() => (<Redirect to={{ pathname: '/signin' }} />)} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
