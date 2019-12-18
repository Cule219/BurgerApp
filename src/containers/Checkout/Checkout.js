import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Orders from '../Orders/Orders'

export default class Checkout extends Component {
    state = {
        ingredients: {
            salad: null,
            meat: null,
            cheese: null,
            bakon: null
        },
        price: 0
    }

    UNSAFE_componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            }
            else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({
            totalPrice: price,
            ingredients: ingredients
        });
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>   
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCanceled={
                    this.checkoutCanceledHandler}
                checkoutContinued={
                    this.checkoutContinueHandler}
                />
                <Route 
                path={this.props.match.path + '/contact-data'} 
                render={(props) => <ContactData ingredients={this.state.ingredients} {...props} price={this.state.price}/>} />
                <Orders />
            </div>
        )
    }
}
