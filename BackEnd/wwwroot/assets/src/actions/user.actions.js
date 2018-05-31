import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';
import {  Redirect } from 'react-router-dom';

export const userActions = {
    login,
    logout,
    GetUser,
    SetDate,
    GetUsers
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                   history.push('/profile');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function SetDate(username, date) {
    return dispatch => {

        userService.SetDate(date)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function GetUsers() {

    console.log("action")
    return userService.GetUsers()
            .then(
                users => {
                    console.log(users);
                    return users;
                },
            );


    function request(user) { return { type: userConstants.GETUSER_REQUEST, user } }
    function success(user) { return { type: userConstants.GETUSER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETUSER_FAILURE, error } }
}


function logout() {
userService.logout()
}

function GetUser() {
    return dispatch => {
        dispatch(request());

        userService.GetUser()
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error))
            );
    };

    function request(user) { return { type: userConstants.GETUSER_REQUEST, user } }
    function success(user) { return { type: userConstants.GETUSER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETUSER_FAILURE, error } }
}
