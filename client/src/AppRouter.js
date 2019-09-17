import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

import { PrivateRoute } from "./PrivateRoute";
import apiActions from "./actions/apiActions";

class AppRouter extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem("jwt-token");
    if (token) dispatch(apiActions.verifyToken(token));
  }
  render() {
    const knownPaths = [
      "/",
      "/dashboard"
      /* "/testDashboard",
    "/testForms",
    "/test" */
    ];

    if (!knownPaths.includes(window.location.pathname)) {
      window.location.replace("/");
    }

    return (
      <Router>
        <div>
          <Route
            path="/"
            exact
            component={this.props.loggedIn ? Dashboard : LoginForm}
          />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            isLoggedIn={this.props.loggedIn}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  const { loggedIn } = state.auth;
  return {
    loggedIn
  };
};

export default connect(mapStateToProps)(AppRouter);
