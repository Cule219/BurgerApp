import React from 'react';

import classes from './Input.css';

export default function Input (props){
	let inputElement = null;
	const inputClasses = [
		classes.inputElement
	];
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}
	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					onChange={props.change}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					onChange={props.change}
					{...props.elementConfig}
					className={inputClasses.join(' ')}
					value={props.value}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select onChange={props.change} className={inputClasses.join(' ')} value={props.value}>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					onChange={props.change}
					{...props.elementConfig}
					className={inputClasses.join(' ')}
					value={props.value}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label htmlFor=''>{props.label}</label>
			{inputElement}
		</div>
	);
}
