import React, {Component} from 'react';
import LoginForm from './loginForm';
import SignUpForm from './SignUpForm';

export default class Home extends Component{
    state = {

    }

    handleSignIn = user => {
        this.props.onAuthenticate(user);
        this.props.history.replace('/chat');
    }

    render() {
        return (
            <div className="container">
                <LoginForm onAuthenticate={(user) => this.handleSignIn(user)} />
                <SignUpForm onAuthenticate={(user) => this.handleSignIn(user)} />
            </div>
        )
    }
}