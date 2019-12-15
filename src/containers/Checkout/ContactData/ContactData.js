import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactsData.css';
import axios from '../../../axios-orders';

export default class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = e => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.post('/orders.json', { 
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: 'Customer name',
            address: {
                street: 'Example street',
                zipCode: '44141',
                country: 'Germany'
            },
            email: 'test@test.com',
            deliveryMethod: 'fastest'
        })
        .then(response => {
            this.setState({ loading: false});
            this.props.history.push('/');
        })
        .catch(err => this.setState({ loading: false}))
    }

    render() {
        let form = (<div className={classes.ContactData}>
            <h4>Enter your contact data:</h4>
            <form>
                <input className={classes.Input}type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input}type="email" name="email" placeholder="Your email"/>
                <input className={classes.Input}type="email" name="street" placeholder="Street"/>
                <input className={classes.Input}type="email" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        </div>);
        if(this.state.loading)
            form = (<Spinner />);
        return (
            form
        )
    }
}
