import React, { Component } from 'react';
import {  Switch } from "react-router-dom";

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/register';
import PageEvents from "./pages/event";
import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from './components/ProtectedRoute';
import { connect } from 'react-redux';
import PaymentMembership from './pages/paymentMembership';
import PaymentHistory from './pages/paymentHistory';
import Profile from './pages/profile';
import Notification from './pages/notification';
// import DashBoard from './hoc/Dashboard';
// import Layout from './hoc/layout';

class Root extends Component {
  render() {
    return (
        <Switch>
              
              <ProtectedRoute exact path="/"  component={Home} authenticated={this.props.isAuthenticated} />
              <ProtectedRoute exact path="/user/events" component={PageEvents} authenticated={this.props.isAuthenticated}  />
              <ProtectedRoute exact path="/user/profile" component={Profile} authenticated={this.props.isAuthenticated}  />
              <ProtectedRoute exact path="/user/notifications" component={Notification} authenticated={this.props.authenticated} />
              <ProtectedRoute exact path="/user/membership-payment" component={PaymentMembership} authenticated={this.props.isAuthenticated} />
              <ProtectedRoute exact path="/user/payment-histroy" component={PaymentHistory} authenticated={this.props.isAuthenticated}/>
              <AuthRoute exact path="/login"  component={Login} authenticated={this.props.isAuthenticated} />
              <AuthRoute exact path="/signup"  component={Signup} authenticated={this.props.isAuthenticated} />
        </Switch>
    );
  }
}

const mapStateToProps = state => {
  const { UI: { isAuthenticated }} = state;
  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps, null)(Root);
