import { combineReducers } from "redux";
import { authReducer } from "./reducers/authentication.reducer.js";
import layoutReducer from "./reducers/layoutReducer";
import formReducer from "./reducers/formReducer";
import apiReducer from "./reducers/apiReducer";
import notiReducer from "./reducers/notiReducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
  layout: layoutReducer,
  form: formReducer,
  app: notiReducer
});

export default rootReducer;
