import React, { Component } from 'react';
import Layout from './hoc/Layouts/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

export default class App extends Component {
    render() {
        return (
            <Layout>
                <BurgerBuilder />
            </Layout>
        )
    }
}
