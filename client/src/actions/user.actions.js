import { userConst } from "../constants/user.constants";
import { userService } from "../services/user.services";
import { alertActions } from "./alert.actions";

export const userActions = {
  login,
  logout
};

function login(username, password) {
  let request = user => {
    return { type: userConst.LOGIN_REQUEST, user };
  };
  let success = user => {
    return { type: userConst.LOGIN_SUCCESS, user };
  };
  let failure = error => {
    return { type: userConst.LOGIN_FAILURE, error };
  };

  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function logout() {
  userService.logout();
  return { type: userConst.LOGOUT };
}
