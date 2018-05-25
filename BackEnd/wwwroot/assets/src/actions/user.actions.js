import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

       return  userService.login(username, password)
            .then(
                user => { 
                    if(user.error)
                    {
                        return user;    
                    } else {
                        history.push('/profile');
                        return user;
                    }
                    
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
userService.logout()
}