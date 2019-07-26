import { handleActions } from 'redux-actions';
import axios from 'axios';

export default handleActions(
	{
		ADD_USER: (state, action) => {
			axios
				.post('http://localhost:5000/api/signup', {
					data: JSON.stringify(action.payload)
				})
				.then((res) => {
					return [ ...state, res ];
				});
		}
	},
	{}
);
