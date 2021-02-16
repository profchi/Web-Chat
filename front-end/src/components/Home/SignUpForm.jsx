import React, {Component} from 'react';

export default class SignUpForm extends Component{
    state = {
        username: '',
        email: '',
        password: '',
        confirm: ''
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
                <h2 className="my-5"> Don't have an account? Sign up now</h2>
                 <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" 
                    name="username" onChange={this.handleChange} placeholder="Enter Username">
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Username</label>
                    <input type="email" className="form-control" id="email" 
                    name="email" onChange={this.handleChange} placeholder="Email">
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" 
                    name="password" onChange={this.handleChange} placeholder="Password">
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" className="form-control" id="confirm" 
                    name="confirm" onChange={this.handleChange} placeholder="Confirm Password">
                    </input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}