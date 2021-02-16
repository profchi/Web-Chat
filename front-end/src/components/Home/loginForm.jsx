import React, {Component} from 'react';

export default class LoginForm extends Component{
    state = {
        username: '',
        password: ''
    }

    handleSubmit = e => {
        e.preventDefault();

        console.log('Submitted');
    }

    handleChange = e => {
        const newState = {...this.state};
        newState[e.currentTarget.name] = e.currentTarget.value;
        this.setState(newState);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}> 
                <h2 className="my-5">Sign in</h2>
                 <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input value={this.state.username} type="text" className="form-control" name="username"
                    onChange={this.handleChange} id="username" placeholder="Enter Username">
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={this.state.password} type="password" name="password" onChange={this.handleChange}
                    className="form-control" id="exampleInputPassword1" placeholder="Password">
                    </input>
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
        );
    }
}