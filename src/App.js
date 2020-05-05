import React, { Component } from 'react';
import { BrowserRouter as Router,} from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
// import Navbar from './components/layout/Navbar';
import themeObject from './util/theme';


import Root from "./Root";

// import axios from 'axios';

const theme = createMuiTheme(themeObject);

// axios.defaults.baseURL = 'https://ipf-backend.herokuapp.com/api';

// const token = localStorage.FBIdToken;
// if (token) {
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     store.dispatch(logoutUser());
//     window.location.href = '/login';
//   } else {
//     store.dispatch({ type: SET_AUTHENTICATED });
//     axios.defaults.headers.common['Authorization'] = token;
//     store.dispatch(getUserData());
//   }
// }

class App extends Component{
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
      return this.setState({authenticated: false})
      // return window.location.href = '/login';
    }
    const decodedToken = jwtDecode(token)
  
    if(decodedToken.exp * 1000 < Date.now()){
      this.setState({authenticated: false})
      // return window.location.href = '/login';
    }else{
      this.setState({authenticated: true})
    }
  }
  
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
              <Router>
                {/* <Navbar /> */}
                <div className="container">
                    <Root  authenticated={this.state.authenticated} />
                </div>
              </Router>
            </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
export default App;
