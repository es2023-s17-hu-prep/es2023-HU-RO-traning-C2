import React from "react";
import * as image from "../assets/Wavy_F_D-01_Single-11 2.png";
import * as email from "../assets/mail.png";
import * as password from "../assets/lock-closed.png";
import * as user from "../assets/user.png";
import Logo from "../components/Logo.js";
import axios from "axios";
import { NavLink, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange =
      this.handlePasswordConfirmationChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handlePasswordConfirmationChange(event) {
    this.setState({ passwordConfirmation: event.target.value });
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  async handleSubmit(event) {
    const instance = axios.create({
      baseURL: "http://api.localhost/v1/",
      timeout: 1000,
      headers: { "X-Custom-Header": "foobar" },
    });

    instance({
      method: "POST",
      url: "/register",
      data: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      },
    })
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        window.location = "/dashboard";
      })
      .catch((e) => {
        console.log(e);
      });

    event.preventDefault();
  }

  render() {
    return (
      <main className="login">
        <div className="auth-container">
          <Logo />
          <form onSubmit={this.handleSubmit}>
            <h2>Register</h2>
            <p>
              If you don't have a DineEase account, <br /> you can register one
              here
            </p>
            <div className="input-container">
              <img src={user.default} />
              <input
                type="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </div>
            <div className="input-container">
              <img src={email.default} />
              <input
                placeholder="Email"
                type="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>

            <div className="input-container">
              <img src={password.default} />
              <input
                placeholder="Password"
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <img src={password.default} />
              <input
                placeholder="Confirm Password"
                type="password"
                onChange={this.handlePasswordConfirmationChange}
                value={this.state.passwordConfirmation}
              />
            </div>

            <button className="primary-button margin-2">Register</button>
            <button
              className="secondary-button"
              onClick={() => {
                window.location = "/login";
              }}
            >
              Back to Login
            </button>
          </form>
        </div>
        <div className="banner">
          <img src={image.default} />
          <h1>Sign Up to DineEase</h1>
        </div>
      </main>
    );
  }
}
