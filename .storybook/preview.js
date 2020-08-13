import React, { Suspense } from 'react'
import { addDecorator } from '@storybook/react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/core'
import '../src/i18n'
import theme from '../src/styleguide/theme'
import Container from '../src/styleguide/Container'
import styled from 'styled-components'

export const FullHeightContainer = styled(Container)`
	height: 100%;
`
addDecorator(storyFn => (
	<MuiThemeProvider theme={theme}>
		<StylesProvider injectFirst>
			<Suspense fallback={<div>loading...</div>}>
				<FullHeightContainer maxWidth={false} disableGutters={true}>
					{storyFn()}
				</FullHeightContainer>
			</Suspense>
		</StylesProvider>
	</MuiThemeProvider>
))
