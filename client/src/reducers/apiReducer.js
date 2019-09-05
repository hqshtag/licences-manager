import { licencesConst } from "../constants/apiConstants";

const initialState = {
  loading: false,
  error: null
};

export default function apiReducer(state = initialState, action) {
  let { licences } = state;

  switch (action.type) {
    case licencesConst.POST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case licencesConst.POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case licencesConst.POST_SUCCESS:
      licences.push(action.payload.licence);
      return {
        ...state,
        loading: false,
        licences
      };

    case licencesConst.GET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case licencesConst.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case licencesConst.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        licenceToEdit: action.payload.licence
      };
    case licencesConst.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case licencesConst.GETALL_SUCCESS:
      return {
        ...state,
        licences: action.payload.licences,
        loading: false
      };
    case licencesConst.GETALL_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case licencesConst.DELETE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case licencesConst.DELETE_SUCCESS:
      const { payload } = action.payload;
      licences = licences.filter(licence => {
        return licence._id !== payload._id;
      });
      return {
        ...state,
        loading: false,
        licences: licences
      };
    case licencesConst.DELETE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
}
