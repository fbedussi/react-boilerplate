import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import history from './history'
import Home from './pages/Home'

const Routes = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
