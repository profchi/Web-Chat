import React, {Component} from 'react';
import axios from 'axios';

export default class LoginForm extends Component{
    state = {
        username: '',
        password: '',
        errors: {}
    }

    url = 'http://localhost:5000/user/login';

    handleSubmit = async e => {
        e.preventDefault();

        if (!this.validate()){
            return;
        }
        
        const { data:result} = await axios.post(this.url, {
            username: this.state.username,
            password: this.state.password
        });

        if (result && result.success){
            this.props.onAuthenticate(result);
        }
    }

    handleChange = e => {
        const newState = {...this.state};
        newState[e.currentTarget.name] = e.currentTarget.value;
        this.setState(newState);
    }

    validate = () => {
        const errors = {};

        if (this.state.username.length == 0){
            errors.username = 'Username is required';
        }

        if (this.state.password.length == 0){
            errors.password = 'Password is required';
        }

        this.setState({errors});

        return Object.keys(errors).length == 0;
    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.handleSubmit}> 
                <h2 className="my-5">Sign in</h2>
                 <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input value={this.state.username} type="text" className="form-control" name="username"
                    onChange={this.handleChange} id="username" placeholder="Enter Username">
                    </input>
                </div>
                {errors.username && <p>{errors.username}</p> }
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={this.state.password} type="password" name="password" onChange={this.handleChange}
                    className="form-control" id="exampleInputPassword1" placeholder="Password">
                    </input>
                </div>
                {errors.password && <p>{errors.password}</p> }
                <button type="submit" className="btn-primary">Log in</button>
            </form>
        );
    }
}