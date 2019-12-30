import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactsData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

export default class ContactData extends Component {
	state = {
		orderForm : {
			name           : {
				elementType   : 'input',
				elementConfig : {
					type        : 'text',
					placeholder : 'Your Name'
				},
				value         : 'Customer name'
			},
			street         : 'Example street',
			zipCode        : '44141',
			country        : 'Germany',
			email          : 'test@test.com',
			deliveryMethod : 'fastest'
		},
		loading   : false
	};

	orderHandler = (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		axios
			.post('/orders.json', {
				ingredients : this.props.ingredients,
				price       : this.props.price
			})
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((err) => this.setState({ loading: false }));
	};

	render () {
		console.log(this.props);

		let form = (
			<div className={classes.ContactData}>
				<h4>Enter your contact data:</h4>
				<form>
					<Input inputtype='input' type='text' name='name' placeholder='Your name' />
					<Input inputtype='input' type='email' name='email' placeholder='Your email' />
					<Input inputtype='input' type='email' name='street' placeholder='Street' />
					<Input inputtype='input' type='email' name='postal' placeholder='Postal Code' />
					<Button btnType='Success' clicked={this.orderHandler}>
						ORDER
					</Button>
				</form>
			</div>
		);
		if (this.state.loading) form = <Spinner />;
		return form;
	}
}
