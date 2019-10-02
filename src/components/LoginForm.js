import React, { Component } from 'react';
import axios from "axios";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "gavin@mitnet.co.za",
            password: "gavindb2000"
        }
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/user/login", {email: this.state.email, password: this.state.password})
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            this.props.loginUser(res.data.user);

            this.setState({
                email: "",
                password: ""
            });
            window.location = "/fish";
        });
    }

    render() {
        return (
                <div className="content">
                    <div className="container">
                        <div className="card my-4 mx-auto" style={{width: "30vw"}}>
                            <div className="card-header">
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Password"/>
                                    </div>
                                    <button className="btn btn-primary btn-block"type="submit" name="submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
