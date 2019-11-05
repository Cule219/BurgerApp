import React from 'react';

export default function BuildControl( props ) {
    return (
        <div>
            <div>{props.label}</div>
            <button 
            onClick={props.removed} 
            disabled={props.disabled}>
                Less
            </button>
            <button 
            onClick={props.added}>
                More
            </button>
        </div>
    )
}
