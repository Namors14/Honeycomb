import { userConstants } from '../constants';

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.GETUSER_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSER_SUCCESS:
      return {
        items: action.user
      };
    case userConstants.GETUSER_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}