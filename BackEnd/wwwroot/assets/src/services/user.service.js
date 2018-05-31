import { authHeader, config, history } from '../helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    GetUser,
    SetDate,
    GetUsers
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

function SetDate(date) {

    const data = {
        date: date
      };
      console.log("here")
    return axios.post(`/api/User/SetStudyDate`, data, { headers: authHeader() })
    .then(ok => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (ok.data.success=="ok") {
            localStorage.removeItem('user');
            user.studyDate = data.date;
            localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
    });
}

function GetUsers() {

    console.log("services");
    return axios.get(`/api/Admin/GetUsers`, { headers: authHeader() })
    .then(users => {
        console.log("getusers");
        console.log(users.data);
        return users.data
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
