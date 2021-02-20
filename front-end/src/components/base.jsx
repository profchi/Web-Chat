import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home/home';
import Chat from './chat/chat';

export default class Base extends Component{

    user = null;

    handleAuthenticate = user => {
        this.user = user;
    }

    render() {
        return (
            <main role="main">
                <Switch>
                    <Route path='/chat' exact render={(props => {
                        return <Chat user={this.user} {...props} />
                    })}></Route> 

                    <Route path='/'  render={(props => {
                        return <Home onAuthenticate={ user => this.handleAuthenticate(user) } {...props} />
                    })}></Route>

                </Switch>
            </main>
        );
    }
}