import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState } from '../../model/model'

const initialState: AppState = {
	lang: 'en-US',
};

export const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setLang: (state, { payload }: PayloadAction<string>) => {
			state.lang = payload;
		},
	},
});

export default slice.reducer;
