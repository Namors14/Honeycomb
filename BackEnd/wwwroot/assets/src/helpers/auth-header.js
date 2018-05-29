export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}