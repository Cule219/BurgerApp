import React, { Component } from 'react';

export default class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
    render() {
        return (
            <div>
                <h4>Enter your contact data:</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name"/>
                    <input type="email" name="email" placeholder="your"/>
                </form>
            </div>-
        )
    }
}
