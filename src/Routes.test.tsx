import React, { Suspense } from 'react'
import { Provider } from 'react-redux'

import { render } from '@testing-library/react'

import ErrorBoundary from './features/errors/ErrorBoundary'
import NotificationArea from './features/notifications/NotificationArea'
import Routes from './Routes'
import store from './store'
import { CircularProgress, StylesProvider, ThemeProvider } from './styleguide'
import theme from './styleguide/theme'

test('App renders', () => {
	render(
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<StylesProvider injectFirst>
					<ErrorBoundary>
						<Suspense fallback={<CircularProgress />}>
							<Routes />
							<NotificationArea />
						</Suspense>
					</ErrorBoundary>
				</StylesProvider>
			</ThemeProvider>
		</Provider>,
	);
	expect(true).toBe(true);
});
