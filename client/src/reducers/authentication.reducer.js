import { userConst } from "../constants/apiConstants";

let username = localStorage.getItem("username");
let id = localStorage.getItem("id");

const initialState = {
  loggedIn: false,
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
    case userConst.VERIFY_TOKEN_REQUEST:
      return {
        loading: true
      };
    case userConst.VERIFY_TOKEN_SUCCESS:
      return {
        ...initialState,

        loading: false,
        loggedIn: true,
        result: action.payload.result
      };
    case userConst.VERIFY_TOKEN_FAILURE:
      return {
        ...initialState,
        loading: false,
        loggedIn: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
