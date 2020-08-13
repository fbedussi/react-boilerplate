import './config'

import i18n from 'i18next'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'

import DialogBox from './features/dialog/DialogBox'
import ErrorBoundary from './features/errors/ErrorBoundary'
import NotificationArea from './features/notifications/NotificationArea'
import en from './locales/en'
import Routes from './Routes'
import * as serviceWorker from './serviceWorker'
import store from './store'
import { CircularProgress, Container, StylesProvider, ThemeProvider } from './styleguide'
import theme from './styleguide/theme'

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources: {
			en: {
				translation: en,
			},
		},
		lng: 'en',
		fallbackLng: 'en',

		interpolation: {
			escapeValue: false,
		},
	});

const GlobalStyle = createGlobalStyle`
`;

const FullHeightContainer = styled(Container)`
	height: 100%;
`;

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<StylesProvider injectFirst>
				<GlobalStyle />
				<ErrorBoundary>
					<Suspense fallback={<CircularProgress />}>
						<FullHeightContainer maxWidth={false} disableGutters={true}>
							<Routes />
							<NotificationArea />
							<DialogBox />
						</FullHeightContainer>
					</Suspense>
				</ErrorBoundary>
			</StylesProvider>
		</ThemeProvider>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
