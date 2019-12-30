import React, { Component } from 'react';
import Layout from './hoc/Layouts/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

export default class App extends Component {
	render () {
		return (
			<Router>
				<Layout>
					<Switch>
						<Route path='/checkout' component={Checkout} />
						<Route path='/orders' component={Orders} />
						<Route path='/' component={BurgerBuilder} />
					</Switch>
				</Layout>
			</Router>
		);
	}
}
