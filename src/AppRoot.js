

import React, { Component } from 'react';
import { BrowserRouter as Router,} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Root from "./Root";
import Loader from './components/Loader';
import { connect } from 'react-redux';
import Layout from './hoc/layout';
import * as actions from "./redux/actions";

class AppRoot extends Component {
    INITIAL_STATE = {authenticated: false};
  constructor(props){
    super(props);
    this.state = {...this.INITIAL_STATE}
  }
  componentDidMount(){
    this.checkAuthStatus()
  }

  checkAuthStatus = async () => {
    const token = localStorage.getItem('x-access-token')
    if(!token){
      this.props.setAuthStatus(false);
      return this.setState({authenticated: false})
      // return window.location.href = '/login';
      
    }
    const decodedToken = jwtDecode(token)
  
    if(decodedToken.exp * 1000 < Date.now()){
      this.props.setAuthStatus(false);
      this.setState({authenticated: false})
      // return window.location.href = '/login';
    }else{
      this.props.setAuthStatus(true);
      this.setState({authenticated: true})
    }
  }
  render() {
    return (
        <div className="App" style={{position:'relative'}}>
            <div className="container">
              
                <Router>
                {/* <Navbar /> */}
                  <Layout>
                    <Root  authenticated={this.state.authenticated} />
                
                  </Layout>
                </Router>
              
            </div>
           {
               this.props.loading ? <Loader /> : null
           } 
      </div>
    );
  }
}

const mapStateToProps = state => {
    const { UI: {loading}} = state;
    return {
        loading
    }
}

export default connect(mapStateToProps, actions)(AppRoot);