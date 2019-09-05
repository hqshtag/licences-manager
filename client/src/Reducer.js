import { combineReducers } from "redux";
import { authReducer } from "./reducers/authentication.reducer.js";
import layoutReducer from "./reducers/layoutReducer";
import formReducer from "./reducers/formReducer";
import apiReducer from "./reducers/apiReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
  layout: layoutReducer,
  form: formReducer
});

export default rootReducer;
