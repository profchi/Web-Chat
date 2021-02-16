import React, {Component} from 'react';
import LoginForm from './loginForm';
import SignUpForm from './SignUpForm';

export default class Home extends Component{
    state = {

    }

    render() {
        return (
            <main role="main" className="container">
                <LoginForm />
                <SignUpForm />
            </main>
        )
    }
}