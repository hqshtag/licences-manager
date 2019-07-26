import { handleActions } from 'redux-actions';
import axios from 'axios';

export default handleActions(
	{
		LOGIN: (state, action) => {
			axios
				.get('http://localhost:5000/api/login', {
					data: JSON.stringify(action.payload)
				})
				.then((res) => {
					return [ ...state, res ];
				});
		},
		LOGOUT: (state, action) => {
			axios.get('http://localhost:5000/api/logout').then((res) => {
				return [ ...state, res ];
			});
		}
	},
	{ session: [] }
);
