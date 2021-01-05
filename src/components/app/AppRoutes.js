import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AppContext } from './AppContext';
import AppPage from './AppPage';
import SigninPage from '../sign/SigninPage';
import Signout from '../sign/Signout';
import UserPage from '../user/UserPage';
import DiaryPage from '../diary/DiaryPage';
import BenchPage from '../bench/BenchPage';
import ReportPage from '../report/ReportPage';
import SettingsPage from '../settings/SettingsPage';

function Error404() {
    return <>Error 404. Page not found.</>
}

function AppRoutes() {

    const { state } = useContext( AppContext );
    const { signin, _uiux } = state;
    const { _error } = _uiux;

    const token = _error && _error.message && _error.message.includes( 'No auth' ) 
        ? null
        : signin.token;

    return (
        <BrowserRouter>
            { token 
            ?
                <Switch>
                    <Route exact path='/' render={ () => (<AppPage />) } />
                    <Route exact path='/signin' render={ () => (<Redirect to={ { pathname: '/' } } />) } />
                    <Route exact path='/signout' render={ () => (<Signout />) } />
                    <Route exact path='/users' render={ () => (<UserPage />) } />
                    <Route exact path='/settings' render={ () => (<SettingsPage />) } />
                    <Route exact path='/diaries' render={ () => (<DiaryPage />) } />
                    <Route exact path='/bench' render={ () => (<BenchPage />) } />
                    <Route exact path='/reports' render={ () => (<ReportPage />) } />
                    <Route render={ () => (<Error404 />) } />
                </Switch>
            :
                <Switch>
                    <Route exact path='/signin' render={ () => (<SigninPage />) } />
                    <Route render={ () => (<Redirect to={ { pathname: '/signin' } } />) } />
                </Switch>
            }
        </BrowserRouter>
    );
}

export default AppRoutes;
export { AppRoutes };