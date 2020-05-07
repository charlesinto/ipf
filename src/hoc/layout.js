import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
// import SweetAlert from "react-bootstrap-sweetalert";

class Layout extends Component {
    logout = () => {
        this.props.logout()
        return <Redirect to="/users/login" />
    }
    redirectToVeriy = () => {
        return <Redirect to="/users/verify" />
    }
    closeSnackBar = () => {
        this.props.closeSnackBar()
    }
    renderLoadingSpinner = () => {
        return null
    }
    hideAlert = () => {
        this.props.closeSnackBar()
    }
    render() {
        return (
            <>
                {this.props.children}

                {
                    this.props.goToHome ? <Redirect to="/" /> : null
                }
                {/* {
                    this.props.showAlert ? <SweetAlert
                        
                        onConfirm={this.hideAlert} onCancel={this.hideAlert}
                    >
                        <span style={{
                            color: '#6e7075', fontWeight: '400',
                            padding: '8px 0 8px 0', fontFamily: "Roboto, sans-serif",
                            fontSize: '1.4rem'
                        }}>{this.props.successMessage}</span>
                    </SweetAlert> : null

                }
                 */}
            </>
        );
    }
}

const mapStateToProps = state => {
    const { UI:  {goToHome }, } = state;
    // console.log(state)
    return {
        goToHome
    }
}

export default connect(mapStateToProps, actions)(Layout)