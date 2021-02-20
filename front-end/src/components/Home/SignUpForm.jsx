import React, {Component} from 'react';
import axios from 'axios';

export default class SignUpForm extends Component{
    state = {
        username: '',
        email: '',
        password: '',
        confirm: '',
        errors: {}
    }

    url = 'http://localhost:5000/user/signup';

    handleSubmit = async e => {
        e.preventDefault();

        if (!this.validate()){
            return;
        }   

        const {data: result} = await axios.post(this.url, {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
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

        if (this.state.email.length == 0){
            errors.email = 'Email is required';
        }

        if (this.state.confirm.length == 0){
            errors.confirm = 'Confirm PassWord';
        }

        if (this.state.confirm.length > 0 && this.state.confirm != this.state.password){
            errors.confirm = 'Password do not match'
        }

        this.setState({errors});

        return Object.keys(errors).length == 0;
    }

    render() {
        const { errors } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="mb-5"> 
                <h2 className="my-5"> Don't have an account? Sign up now</h2>
                 <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" 
                    name="username" onChange={this.handleChange} placeholder="Enter Username">
                    </input>
                </div>
                {errors.username && <p>{errors.username}</p> }
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" 
                    name="email" onChange={this.handleChange} placeholder="Email">
                    </input>
                </div>
                {errors.email && <p>{errors.email}</p> }
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" 
                    name="password" onChange={this.handleChange} placeholder="Password">
                    </input>
                </div>
                {errors.password && <p>{errors.password}</p> }
                <div className="form-group">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" className="form-control" id="confirm" 
                    name="confirm" onChange={this.handleChange} placeholder="Confirm Password">
                    </input>
                </div>
                {errors.confirm && <p>{errors.confirm}</p> }
                <button type="submit" className="btn-primary">Submit</button>
            </form>
        );
    }
}