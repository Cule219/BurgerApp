import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bakon: 1
        }
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
                checkoutCanceled={this.checkoutCanceledHandler}
                checkoutContinue={this.checkoutContinueHandler}
                />
            </div>
        )
    }
}
