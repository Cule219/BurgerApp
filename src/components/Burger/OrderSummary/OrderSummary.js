import React from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
    //for testing purpose
    componegetSnapshotBeforeUpdatentWillUpdate() {
        console.log('[OrderSummary] will update');
    }
    render() {
        const ingredientSum = Object.keys(this.props.ingredients).map(item => {
            return <li key={item}>
                <span style={{textTransform: 'capitalize'}}>{item}</span>: {this.props.ingredients[item]}
                </li>
        });
        return (
            <>
                <h3>Your Order</h3>
                <p>A delicious Burger with following ingredients:</p>
                <ul>
                    {ingredientSum}
                </ul>
                <p><strong>Total price: {this.props.price}</strong></p>
                <p>Continiue to Checkout</p>
                <Button btnType={'Danger'} clicked={this.props.orderCanceled}>CANCEL</Button>
                <Button btnType={'Success'} clicked={this.props.orderContinue}>CONTINUE</Button>
            </>
        );
        
    }
};

export default OrderSummary;