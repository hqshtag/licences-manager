import { licencesConst } from "../constants/licences.constants";
import { licencesService } from "../services/licences.services";

export const licencesActions = {
  getAll,
  update,
  create,
  remove
};

function getAll(token) {
  let request = licences => {
    return { type: licencesConst.GETALL_REQUEST, licences };
  };
  let success = licences => {
    return { type: licencesConst.GETALL_SUCCESS, licences };
  };
  let failure = error => {
    return { type: licencesConst.GETALL_FAILURE, error };
  };

  return dispatch => {
    dispatch(request({ token }));
    licencesService.getAll(token).then(
      licences => {
        dispatch(success(licences));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}

function create(token, data) {
  let request = licences => {
    return { type: licencesConst.POST_REQUEST, licences };
  };
  let success = licences => {
    return { type: licencesConst.POST_SUCCESS, licences };
  };
  let failure = error => {
    return { type: licencesConst.POST_FAILURE, error };
  };

  return dispatch => {
    dispatch(request({ token }));
    licencesService.create(token, data).then(
      licences => {
        dispatch(success(licences));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}

function update(token, id) {
  let request = licences => {
    return { type: licencesConst.UPDATE_REQUEST, licences };
  };
  let success = licences => {
    return { type: licencesConst.UPDATE_SUCCESS, licences };
  };
  let failure = error => {
    return { type: licencesConst.UPDATE_FAILURE, error };
  };

  return dispatch => {
    dispatch(request({ id }));
    licencesService.update(token, id).then(
      licences => {
        dispatch(success(licences));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}

function remove(token, id) {
  let request = licences => {
    return { type: licencesConst.DELETE_REQUEST, licences };
  };
  let success = licences => {
    return { type: licencesConst.DELETE_SUCCESS, licences };
  };
  let failure = error => {
    return { type: licencesConst.DELETE_FAILURE, error };
  };

  return dispatch => {
    dispatch(request({ id }));
    licencesService.remove(token, id).then(
      licences => {
        dispatch(success(licences));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
