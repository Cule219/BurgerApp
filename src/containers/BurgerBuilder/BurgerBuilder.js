import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props)
        axios.get('https://react-my-burger-4fbc0.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({
                ingredients: response.data
            })
        })
        .catch(err => {
            this.setState({
                error: true
            })
        })
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
        this.state.ingredients && this.updatePurchasable();
    }

    orderHandler = () => {
        this.setState({ordering: true})
    }

    orderClosedHandler = () => {
        this.setState({ordering: false});
    }

    orderContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        console.log(queryString);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        // this.setState({ loading: true });
        // axios.post('/orders.json', { 
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: 'Customer name',
        //     address: {
        //         street: 'Example street',
        //         zipCode: '44141',
        //         country: 'Germany'
        //     },
        //     email: 'test@test.com',
        //     deliveryMethod: 'fastest'
        // })
        // .then(response => 
        // this.setState({ loading: false, ordering: false}))
        // .catch(err => this.setState({ loading: false, ordering: false}))
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        let orderSummary = !this.state.ingredients || this.state.loading ? 
        (this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />)
        :
        <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice.toFixed(2)}
            orderCanceled = {this.orderClosedHandler}
            orderContinue = {this.orderContinueHandler}
            />

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <div>
                <Modal show={this.state.ordering} orderClosed={this.orderClosedHandler}> 
                    {orderSummary}
                </Modal>
                {
                    this.state.ingredients 
                    ?
                    <>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                        added={this.addIngredientHandler} 
                        removed={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        order={this.orderHandler}
                        />
                    </>
                    :
                    <Spinner />
                }
            </div>
        )
    }
}
export default withErrorHandler(BurgerBuilder, axios);