import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.loginUser(this.state);

        this.setState({
            username: '',
            password: ''
        })
    }

    handleChange(event) {
        let key = event.target.name;
        let currValue = event.target.value;
        this.setState({
            [key]: currValue
        })
    }

    render() {
        if (this.props.username) {
            return <Redirect to="/" />
        }
        return (
            <div className="form-wrapper">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" onChange={this.handleChange} value={this.state.username} id="username" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={this.handleChange} value={this.state.password} id="password" placeholder="Enter password" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;
