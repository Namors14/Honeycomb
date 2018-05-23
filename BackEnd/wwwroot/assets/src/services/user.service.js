import { authHeader, config } from '../helpers';
import axios from 'axios';

export const userService = {
    login,
    logout
};

function login(username, password) {

    const logindata = {
        UserName: username,
        Password: password
      };

console.log(123);
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
