import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

export default function BuildControls (props){
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price: <strong>{props.price.toFixed(2)}</strong>
			</p>
			{controls.map((control) => (
				<BuildControl
					key={control.type}
					label={control.label}
					added={() => props.added(control.type)}
					removed={() => props.removed(control.type)}
					disabled={props.disabled[control.type]}
				/>
			))}
			<button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.order}>
				ORDER NOW
			</button>
		</div>
	);
}
