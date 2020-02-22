import React, {
    Component
} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasable: false,
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount() {
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

    // addIngredientHandler = type => {
    //     let state = {
    //         ...this.state.ingredients
    //     };
    //     let newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    //     state[type] = this.state.ingredients[type] + 1;
    //     this.setState({
    //         ingredients: state,
    //         totalPrice: newPrice
    //     });
    // }

    // removeIngredientHandler = type => {
    //     let state = {
    //         ...this.state.ingredients
    //     };
    //     let newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    //     state[type] = this.state.ingredients[type] - 1;
    //     this.setState({
    //         ingredients: state,
    //         totalPrice: newPrice
    //     });
    // }

    updatePurchasable = () => {
        let thing = Object.values(this.state.ingredients).reduce((a, v) => a + v);
        if (thing > 0 && this.state.purchasable === false) {
            this.setState({
                purchasable: true
            })
        } else if (thing <= 0 && this.state.purchasable === true) {
            this.setState({
                purchasable: false
            })
        }
    }

    componentDidUpdate() {
        this.state.ingredients && this.updatePurchasable();
    }

    orderHandler = () => {
        this.setState({
            ordering: true
        })
    }

    orderClosedHandler = () => {
        this.setState({
            ordering: false
        });
    }

    orderContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        console.log(queryParams, '>>>>>');
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        let orderSummary = !this.props.ings || this.state.loading ?
            (this.state.error ? < p > Ingredients can 't be loaded</p> : <Spinner />) : <
                OrderSummary ingredients={
                    this.props.ings
                }
                price={
                    this.state.totalPrice.toFixed(2)
                }
                orderCanceled={
                    this.orderClosedHandler
                }
                orderContinue={
                    this.orderContinueHandler
                }
            />

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <div>
                <Modal show={
                    this.state.ordering
                }
                    orderClosed={
                        this.orderClosedHandler
                    } > {
                        orderSummary
                    } </Modal>
                {this.props.ings ?
                    <>
                        <Burger ingredients={
                            this.props.ings
                        }
                        />
                        <BuildControls
                            added={this.props.onIgredientAdded}
                            removed={this.props.onIgredientRemoved}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            order={this.orderHandler}
                        /> </>
                    :
                    <Spinner />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIgredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIgredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));