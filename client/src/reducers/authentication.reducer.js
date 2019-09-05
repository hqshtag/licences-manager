import { userConst } from "../constants/apiConstants";

let token = localStorage.getItem("jwt-token");
let username = localStorage.getItem("username");
let id = localStorage.getItem("id");

const initialState = {
  loggedIn: token ? true : false,
  loading: false,
  id: id ? id : undefined,
  user: username ? username : undefined,
  error: undefined
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case userConst.LOGIN_REQUEST:
      return {
        loading: true
      };
    case userConst.LOGIN_SUCCESS:
      localStorage.setItem("username", action.payload.data.username);
      localStorage.setItem("id", action.payload.data.id);

      return {
        loading: false,
        loggedIn: true,
        id: action.payload.data.id,
        user: action.payload.data.username
      };
    case userConst.LOGIN_FAILURE:
      return {
        loading: false,
        error: action.payload
      };
    case userConst.LOGOUT:
      return {
        loggedIn: false
      };
    default:
      return state;
  }
}
