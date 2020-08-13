import React from 'react'
import DialogBox from './DialogBox'
import { Provider } from 'react-redux'

export default {
	title: 'Dialog boxes',
	component: DialogBox,
}

const getFakeStore = data => {
	data.getState = () => data
	data.subscribe = () => {}
	return data
}

const store = getFakeStore({
	dialog: {
		type: 'none',
	},
})

export const None = () => (
	<Provider store={store}>
		<DialogBox />
	</Provider>
)

const storeLogout = getFakeStore({
	...store,
	dialog: {
		type: 'logout',
	},
})
export const Logout = () => (
	<Provider store={storeLogout}>
		<DialogBox />
	</Provider>
)
