import React, { Component } from 'react';
import {  Switch } from "react-router-dom";

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/register';

import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from './components/ProtectedRoute';

class Root extends Component {
  render() {
      console.log(this.props.authenticated)
    return (
        <Switch>
            <ProtectedRoute exact path="/"  component={Home} />
            <AuthRoute exact path="/login"  component={Login} authenticated={this.props.authenticated} />
            <AuthRoute exact path="/signup"  component={Signup} authenticated={this.props.authenticated} />
        </Switch>
    );
  }
}

export default Root;
