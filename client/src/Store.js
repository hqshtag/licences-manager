import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './Reducer';

const initialState = {
	licences: [],
	users: [],
	session: null
};

const middleware = [ thunk ];

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

console.log(store.getState());

export default store;
