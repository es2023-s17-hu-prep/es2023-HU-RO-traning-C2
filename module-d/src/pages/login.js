import React from "react";
import axios from "axios";

import * as image from "../assets/Wavy_F_D-01_Single-11 2.png";
import * as email from "../assets/mail.png";
import * as password from "../assets/lock-closed.png";
import Logo from "../components/Logo.js";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    const instance = axios.create({
      baseURL: "http://api.localhost/v1/",
      timeout: 1000,
      headers: { "X-Custom-Header": "foobar" },
    });

    instance({
      method: "POST",
      url: "/login",
      data: {
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
            <h2>Sign in</h2>
            <p>
              You can <a href="/register">Register here!</a>
            </p>
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
              ></input>
            </div>

            <button className="primary-button margin-10">Login</button>
          </form>
        </div>
        <div className="banner">
          <img src={image.default} />
          <h1>Sign in to DineEase</h1>
        </div>
      </main>
    );
  }
}
