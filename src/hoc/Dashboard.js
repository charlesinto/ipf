

import React, { Component } from 'react';
import Header from '../headerFooter/header';
import SideBar from './SideBar';

class DashBoard extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="app-wrapper">
            <div className="app-dashboard">
                <SideBar />
            </div>
            <div className="app-container">
                {this.props.children}
            </div>
        </div>
      </>
    );
  }
}

export default DashBoard;
