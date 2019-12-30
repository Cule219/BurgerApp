import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
	let ingredients = Object.keys(props.ingredients)
		.map((igKey) => {
			return [
				...Array(props.ingredients[igKey])
			].map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />);
		})
		.flat(); // .reduce((acc, val) => acc.concat(val), []);
	if (ingredients.length === 0) ingredients = <p>Please add some ingredients!</p>;
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{ingredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	);
};

export default withRouter(burger);
