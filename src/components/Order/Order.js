import React from 'react';
import classes from './Order.css';

export default function Order (props){
	const ingredients = [];
	for (let ingredient in props.ingredients) {
		ingredients.push({ name: ingredient, amount: props.ingredients[ingredient] });
	}

	const ingredientOutput = ingredients.map((ig) => {
		return (
			<span
				style={{
					textTransform : 'capitalize',
					display       : 'inline-block',
					margin        : '0 8px',
					border        : '1px solid #CCC',
					padding       : '5px'
				}}
				key={ig.name}>
				{ig.name} ({ig.amount})
			</span>
		);
	});
	return (
		<div className={classes.Order}>
			<p>Ingedients: {ingredientOutput}</p>
			<p>
				Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</div>
	);
}
