import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';

import PublicLayout  from '../public';

import publicRoutes  from './routes/publicRoutes';

import NotFound from '../public/NotFound';

class Template extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    { _.map(publicRoutes, (route, key) => {
                        const { component, path } = route;
                        return (
                            <Route
                                exact
                                path={path}
                                key={key}
                                render={ (route) => <PublicLayout component={component} route={route}/>}
                            />
                        )
                    })}

                    <Route component={ NotFound } />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Template