import { combineReducers } from 'redux';

import licenceReducer from './bundle/licences/reducers';
import userReducer from './bundle/users/reducers';
import sessionReducer from './bundle/sessions/reducers';

const rootReducer = combineReducers({
	session: sessionReducer,
	licences: licenceReducer,
	users: userReducer
});

export default rootReducer;
