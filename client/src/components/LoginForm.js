import React from "react";
import { connect } from "react-redux";
import apiAction from "../actions/apiActions";
import "./styles/LoginForm.scss";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      submited: false
    };

    //this.handleChange = this.handleChange.bind(this);
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleLogin = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { username, password } = this.state;
    dispatch(apiAction.login(username, password));
    //window.location.search = undefined;
  };
  render() {
    return (
      <div className="loginform-container">
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="center">
          <h2>Admin Login</h2>
          <form>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              onChange={this.handleChange}
            />{" "}
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
            />{" "}
            <br />
            <button className="btn login-btn" onClick={this.handleLogin}>
              login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(LoginForm);
