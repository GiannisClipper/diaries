import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import DateList from './DateList';
import Settings from './Settings';

function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/dates' component={ DateList } />
                <Route exact path='/settings' component={ Settings } />
                <Route render={() => (<Redirect to={{ pathname: '/dates' }} />)} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
