import { licencesConst, userConst } from "../constants/apiConstants";
import { apiServices } from "../api/services";

const createLicence = (token, licence) => {
  let request = licence => {
    return { type: licencesConst.POST_REQUEST, payload: { licence } };
  };
  let success = licence => {
    return { type: licencesConst.POST_SUCCESS, payload: { licence } };
  };
  let failure = error => {
    return { type: licencesConst.POST_FAILURE, payload: { error } };
  };
  return dispatch => {
    dispatch(request({ token }));
    apiServices.createLicence(token, licence).then(
      licence => {
        //console.log(licence);
        dispatch(success(licence));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const getLicence = (token, id) => {
  let request = () => {
    return {
      type: licencesConst.GET_REQUEST
    };
  };
  let success = licence => {
    return {
      type: licencesConst.GET_SUCCESS,
      payload: {
        ...licence
      }
    };
  };
  let failure = error => {
    return { type: licencesConst.GET_FAILURE, payload: { error } };
  };
  return dispatch => {
    dispatch(request());
    apiServices.getLicence(token, id).then(
      licence => {
        dispatch(success(licence));
      },
      error => dispatch(failure(error))
    );
  };
};

const getAllLicences = token => {
  let request = () => {
    return {
      type: licencesConst.GETALL_REQUEST
    };
  };
  let success = licences => {
    return {
      type: licencesConst.GETALL_SUCCESS,
      payload: {
        licences
      }
    };
  };
  let failure = error => {
    return { type: licencesConst.GETALL_FAILURE, payload: { error } };
  };
  return dispatch => {
    dispatch(request());
    apiServices.getAllLicences(token).then(
      licences => {
        dispatch(success(licences));
      },
      error => dispatch(failure(error))
    );
  };
};

function updateLicence(token, id, data) {
  let request = () => {
    return { type: licencesConst.UPDATE_REQUEST };
  };
  let success = updatedLicence => {
    return { type: licencesConst.UPDATE_SUCCESS, payload: { updatedLicence } };
  };
  let failure = error => {
    return { type: licencesConst.UPDATE_FAILURE, payload: { error } };
  };

  return dispatch => {
    dispatch(request({ id }));
    apiServices.updateLicence(token, id, data).then(
      licences => {
        dispatch(success(licences));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}

function removeLicence(token, id) {
  let request = () => {
    return { type: licencesConst.DELETE_REQUEST };
  };
  let success = removedLicence => {
    return {
      type: licencesConst.DELETE_SUCCESS,
      payload: { ...removedLicence }
    };
  };
  let failure = error => {
    return { type: licencesConst.DELETE_FAILURE, payload: { error } };
  };

  return dispatch => {
    dispatch(request({ id }));
    apiServices.removeLicence(token, id).then(
      licences => {
        dispatch(success(licences));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}

function login(username, password) {
  let request = () => {
    return { type: userConst.LOGIN_REQUEST };
  };
  let success = result => {
    return { type: userConst.LOGIN_SUCCESS, payload: { ...result } };
  };
  let failure = error => {
    return { type: userConst.LOGIN_FAILURE, payload: { ...error } };
  };

  return dispatch => {
    dispatch(request());

    apiServices.login(username, password).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}

function logout() {
  apiServices.logout();
  return { type: userConst.LOGOUT };
}

const apiActions = {
  createLicence,
  getLicence,
  getAllLicences,
  removeLicence,
  updateLicence,
  login,
  logout
};

export default apiActions;
