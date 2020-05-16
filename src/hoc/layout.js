import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
// import SweetAlert from "react-bootstrap-sweetalert";
import Swal from 'sweetalert2'

class Layout extends Component {
    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('ipf-user'))
        this.props.setCurrentUser(user)
    }
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
    renderAlert = () => {
        if(this.props.showAlert){
            Swal.fire({
                title: this.props.alert.title,
                text: this.props.alert.text,
                icon: this.props.alert.type,
                onClose: () => {
                    this.props.closeAlert()
                }
             })
        }
        return null
    }
    render() {
        return (
            <>
                {this.props.children}

                {
                    this.props.goToHome ? <Redirect to="/" /> : null
                }
                {
                    this.props.gotoLogin ? <Redirect to="/login" /> : null
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
                 {
                     this.renderAlert()
                 }
            </>
        );
    }
}

const mapStateToProps = state => {
    const { UI:  {goToHome, showAlert, alert, gotoLogin }, } = state;
    // console.log(state)
    return {
        goToHome, showAlert, alert, gotoLogin
    }
}

export default connect(mapStateToProps, actions)(Layout)