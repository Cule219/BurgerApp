import React from 'react';
import classes from './Order.css';

export default function Order( props ) {
    return (
        <div className={classes.Order}>
            <p>Ingedients: </p>
            <p>Price: <strong>USD </strong></p>
        </div>
    )
}
