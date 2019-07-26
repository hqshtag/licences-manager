import { createAction } from 'redux-actions';

export const loadLicences = createAction('LOAD_LICENCES');
export const deleteLicence = createAction('DELETE_LICENCE');
export const updateLicence = createAction('UPDATE_LICENCE');
export const addLicence = createAction('ADD_LICENCE');
