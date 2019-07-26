import { handleActions } from 'redux-actions';
import axios from 'axios';

export default handleActions(
	{
		LOAD_LICENCES: (state, action) => {
			axios.get('http://localhost:5000/api/licences').then((res) => {
				return [ ...state, res ];
			});
		},
		ADD_LICENCE: (state, action) => {
			axios
				.post('http://localhost:5000/api/licences', {
					data: JSON.stringify(action.payload)
				})
				.then((res) => {
					return [ ...state, res ];
				});
		},
		UPDATE_LICENCE: (state, action) => {
			axios
				.put(`https//localhost:5000/api/licences/${action.payload.id}`, {
					data: JSON.stringify(action.payload)
				})
				.then((res) => {
					return [
						...state.filter((licence) => {
							return licence._id !== action.payload.id;
						}),
						res
					];
				});
		},
		DELETE_LICENCE: (state, action) => {
			axios.delete(`https//localhost:5000/api/licences/${action.payload.id}`).then((res) => {
				return [
					...state.filter((licence) => {
						return licence._id !== action.payload.id;
					})
				];
			});
		}
	},
	{ licences: [] }
);
