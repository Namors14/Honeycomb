import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  var user = Object.assign({}, state);
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
    return Object.assign({}, state,{
      loggingIn: true,
      user: action.user
    });
    case userConstants.LOGIN_SUCCESS:
    return Object.assign({}, state,{
      loggedIn: true,
      user: action.user
    });
    case userConstants.LOGIN_FAILURE:
      return Object.assign({});
    case userConstants.LOGOUT:
      return Object.assign({});
    default:
      return Object.assign({}, state);
  }
}