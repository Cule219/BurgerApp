import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactsData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

export default class ContactData extends Component {
	state = {
		orderForm   : {
			name           : {
				elementType   : 'input',
				elementConfig : {
					type        : 'text',
					placeholder : 'Your Name'
				},
				value         : '',
				validation    : {
					required : true
				},
				valid         : false,
				touched       : false
			},
			street         : {
				elementType   : 'input',
				elementConfig : {
					type        : 'text',
					placeholder : 'Street'
				},
				value         : '',
				validation    : {
					required : true
				},
				valid         : false,
				touched       : false
			},
			zipCode        : {
				elementType   : 'input',
				elementConfig : {
					type        : 'text',
					placeholder : 'ZIP Code'
				},
				value         : '',
				validation    : {
					required  : true,
					minLength : 5,
					maxLength : 7
				},
				valid         : false,
				touched       : false
			},
			country        : {
				elementType   : 'input',
				elementConfig : {
					type        : 'text',
					placeholder : 'Country'
				},
				value         : '',
				validation    : {
					required : true
				},
				valid         : false,
				touched       : false
			},
			email          : {
				elementType   : 'input',
				elementConfig : {
					type        : 'email',
					placeholder : 'Email'
				},
				value         : '',
				touched       : false,
				valid         : true
			},
			deliveryMethod : {
				elementType   : 'select',
				elementConfig : {
					options : [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value         : '',
				valid         : true
			}
		},
		formIsValid : false,
		loading     : false
	};

	orderHandler = (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let key in this.state.orderForm) {
			formData[key] = this.state.orderForm[key].value;
		}
		axios
			.post('/orders.json', {
				ingredients : this.props.ingredients,
				price       : this.props.price,
				orderData   : formData
			})
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((err) => this.setState({ loading: false }));
	};

	inputChangedHandler = (e, id) => {
		const form = { ...this.state.orderForm };
		const updatedFormElement = { ...form[id] };
		updatedFormElement.value = e.target.value;
		updatedFormElement.touched = true;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		form[id] = updatedFormElement;
		let formIsValid = true;
		for (let key in form) {
			formIsValid = form[key].valid && formIsValid;
		}
		this.setState({ orderForm: form, formIsValid: formIsValid });
	};

	checkValidity (value, rules) {
		let isValid = true;
		if (rules) {
			if (rules.required) {
				isValid = value.trim() !== '' && isValid;
			}
			if (rules.minLength) {
				isValid = value.length >= rules.minLength && isValid;
			}
			if (rules.maxLength) {
				isValid = value.length <= rules.maxLength && isValid;
			}
		}
		return isValid;
	}

	render () {
		let formElements = [];
		for (let key in this.state.orderForm) {
			formElements.push({ config: this.state.orderForm[key], id: key });
		}

		let form = (
			<div className={classes.ContactData}>
				<h4>Enter your contact data:</h4>
				<form onSubmit={this.orderHandler}>
					{formElements.map((formElement) => (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							change={(e) => this.inputChangedHandler(e, formElement.id)}
							touched={formElement.config.touched}
						/>
					))}
					{/* <Input elementType='' elementConfig='' value='' />
					<Input inputtype='input' type='email' name='email' placeholder='Your email' />
					<Input inputtype='input' type='email' name='street' placeholder='Street' />
					<Input inputtype='input' type='email' name='postal' placeholder='Postal Code' /> */}
					<Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid}>
						ORDER
					</Button>
				</form>
			</div>
		);
		if (this.state.loading) form = <Spinner />;
		return form;
	}
}
