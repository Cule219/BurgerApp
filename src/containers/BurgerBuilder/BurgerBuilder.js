import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        totalPrice: 4,
        purchasable: true,
        ordering: false
    }

    addIngredientHandler = type => {
        let state = {...this.state.ingredients};
        let newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        state[type] = this.state.ingredients[type]+1;
        this.setState({
            ingredients: state,
            totalPrice: newPrice
        });
    }

    removeIngredientHandler = type => {
        let state = {...this.state.ingredients};
        let newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        state[type] = this.state.ingredients[type]-1;
        this.setState({
            ingredients: state,
            totalPrice: newPrice
        });
    }

    updatePurchasable = () => {
        let thing = Object.values(this.state.ingredients).reduce((a,v) => a+v);
        console.log(Object.values(this.state.ingredients))
        if(thing > 0 && this.state.purchasable === false){
            this.setState({
                purchasable: true
            })
        } else if(thing <= 0 && this.state.purchasable === true){
            this.setState({
                purchasable: false
            })
        }
    }

    componentDidUpdate() {
        this.updatePurchasable();
    }

    orderHandler = () => {
        this.setState({ordering: true})
    }

    orderClosedHandler = () => {
        this.setState({ordering: false})
    }

    orderContinueHandler = () => {
        alert('Hurray!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <div>
                <Modal show={this.state.ordering} orderClosed={this.orderClosedHandler}> 
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice.toFixed(2)}
                        orderCanceled = {this.orderClosedHandler}
                        orderContinue = {this.orderContinueHandler}
                        />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                added={this.addIngredientHandler} 
                removed={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                order={this.orderHandler}
                />
            </div>
        )
    }
}