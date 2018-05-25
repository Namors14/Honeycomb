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
    return axios.post(`/api/Account/Login`, logindata, { headers: authHeader() })
    .then(user => {
        if (user.data && user.data.token) {
            localStorage.setItem('token', JSON.stringify(user.data.token));
        }
        return user.data;
    }).catch(function (error) {
        console.log(error);
      });
}

function logout() {
        localStorage.removeItem('token');
}

function GetUser () {

    return axios.get(`/api/Account/GetUser`, { headers: authHeader() })
    .then(user => {
        console.log(user.data);
        return user.data
    });
}
