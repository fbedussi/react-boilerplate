import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { generateUID } from '../../libs/uuid'
import { Errors, HttpError, LoginError } from '../../model/model'

const emptyLoginError = { message: '', details: '' };

const initialState: Errors = {
	http: [],
	ui: [],
	login: emptyLoginError,
};

export const slice = createSlice({
	name: 'errors',
	initialState,
	reducers: {
		_setHttpError: (state, { payload }: PayloadAction<HttpError>) => {
			state.http.push({
				id: generateUID(),
				...payload,
			});
		},
		removeHttpError: (state, { payload }: PayloadAction<string>) => {
			state.http = state.http.filter(({ id }) => id !== payload);
		},
		resetHttpError: state => {
			state.http = [];
		},
		_setUiError: (state, { payload }: PayloadAction<Error>) => {
			state.ui.push({
				id: generateUID(),
				message: payload.message || 'Unexpected error',
				stack: payload.stack || '',
			});
		},
		removeUiError: (state, { payload }: PayloadAction<string>) => {
			state.ui = state.ui.filter(({ id }) => id !== payload);
		},
		resetUiError: state => {
			state.ui = [];
		},
		setLoginError: (state, { payload }: PayloadAction<LoginError>) => {
			state.login = payload;
		},
		resetLoginError: state => {
			state.login = emptyLoginError;
		},
	},
});

export default slice.reducer;
