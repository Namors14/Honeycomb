import { authHeader, config, history } from '../helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    GetUser
};

function login(username, password) {

    const logindata = {
        UserName: username,
        Password: password
      };
    return axios.post(`/api/Account/Login`, logindata)
    .then(user => {
        if (user.data && user.data.token) {
            localStorage.setItem('user', JSON.stringify(user.data));
        }
        return user.data;
    });
}

function logout() {
        localStorage.removeItem('user');
}

function GetUser () {

    return axios.get(`/api/Account/GetUser`, { headers: authHeader() })
    .then(user => {
        return user.data
    });

    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };

    // return fetch(`/api/Account/GetUser`, requestOptions).then(handleResponse, handleError);
}


function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}
