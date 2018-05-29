import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';

import PublicLayout  from '../public';
import {PrivateLayout} from '../private';

import publicRoutes  from './routes/publicRoutes';
import privateRoutes  from './routes/privateRoutes';

import NotFound from '../public/NotFound';
import { Login } from '../publicComponents/Login'

import { history } from '../helpers';
import { alertActions } from '../actions'

class Template extends Component {

    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <BrowserRouter history={history}>
                <Switch>

                { _.map(publicRoutes, (route, key) => {
                    const { component, path } = route;
                    return (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={ (route) =>
                                localStorage.getItem('user')? (
                                    <Redirect to="/profile"/>
                                ) : (
                                    <PublicLayout component={component} route={route}/>
                                )
                            }
                        />
                    )
                }) }

                    { _.map(privateRoutes, (route, key) => {
                    const { component, path } = route;
                    return (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={ (route) =>
                                localStorage.getItem('user')? (
                                <PrivateLayout component={component} route={route}/>
                                ) : (
                                <PublicLayout component={Login} route={route}/>
                                )
                            }
                        />
                    )
                    }) }
                    
                    <Route component={ NotFound } />
                </Switch>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    const { user } = authentication;
    return {
        alert,
        user
    };
}

const connectedTemplate = connect(mapStateToProps)(Template);
export { connectedTemplate as Template }; 