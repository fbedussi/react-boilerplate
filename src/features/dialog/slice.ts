import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Dialog } from '../../model/model'

const initialState = {
	type: 'none',
} as Dialog

export const slice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		openDialog: (_, { payload }: PayloadAction<Dialog>) => payload,
		closeDialog: () => initialState,
	},
})

export default slice.reducer
