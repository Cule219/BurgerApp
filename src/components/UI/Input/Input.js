import React from 'react';

import classes from './Input.css';

export default function Input (props){
	let inputElement = null;
	switch (props.inputtype) {
		case 'input':
			inputElement = <input {...props} className={classes.inputElement} />;
			break;
		case 'textarea':
			inputElement = <textarea {...props} className={classes.inputElement} />;
			break;
		default:
			inputElement = <input {...props} className={classes.inputElement} />;
	}

	return (
		<div className={classes.Input}>
			<label htmlFor=''>{props.label}</label>
			{inputElement}
		</div>
	);
}
