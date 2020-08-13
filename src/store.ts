import { configureStore } from '@reduxjs/toolkit'

import app from './features/app/slice'
import dialog from './features/dialog/slice'
import errors from './features/errors/slice'
import notifications from './features/notifications/slice'

export default configureStore({
	reducer: {
		errors,
		app,
		notifications,
		dialog,
	},
});
