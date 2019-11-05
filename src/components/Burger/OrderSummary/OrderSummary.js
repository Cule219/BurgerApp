import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSum = Object.keys(props.ingredients).map(item => {
        return <li key={item}>
            <span style={{textTransform: 'capitalize'}}>{item}</span>: {props.ingredients[item]}
            </li>
    });
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious Burger with following ingredients:</p>
            <ul>
                {ingredientSum}
            </ul>
            <p><strong>Total price: {props.price}</strong></p>
            <p>Continiue to Checkout</p>
            <Button btnType={'Danger'} clicked={props.orderCanceled}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.orderContinue}>CONTINUE</Button>
        </>
    );
};

export default orderSummary;