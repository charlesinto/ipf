
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from "../redux/actions";
import Grid  from '@material-ui/core/Grid';
import { withStyles, TextField, Button, Typography, FormControl, Select, MenuItem, InputLabel, } from '@material-ui/core';
import { isEmailValid } from '../util/app';


class SignUp extends Component {
    state = {
        rememberMe: false,
        emailAddress: '',
        emailHelperText: '',
        surName: '',
        firstName:'',
        lastName: '',
        phoneNumber: '',
        nameOfCompany: '',
        nameOfCompanyHelperText: '',
        phoneNumberHelperText: '',
        surNameHelperText: '',
        otherName: '',
        otherNameHelperText: '',
        password: '',
        passwordHelperText: '',
        memberShipType: ''
    }
    handleChange = (e) => {
        const {target: {name, value}} = e;
        if(name === 'rememberMe'){
            return this.setState({
                rememberMe: !this.state.rememberMe
            })
        }
        this.setState({
            [name] : value
        })
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        let error = false;
        this.setState({
            emailHelperText: '',
            passwordHelperText: ''
        })
        console.log(this.state.emailAddress, this.state.password)
        if(this.state.emailAddress.trim() === '' || !isEmailValid(this.state.emailAddress)){
            this.setState({
                emailHelperText : "Email Address is required or not in email format"
            })
            error = true;
        }
        if(this.state.password.trim() === ''){
            this.setState({
                passwordHelperText : "Password is required"
            })
            error = true;
        }
        if(this.state.phoneNumber.trim() === ''){
            this.setState({
                phoneNumberHelperText : "Phone Number is required"
            })
            error = true;
        }
        if(this.state.firstName.trim() === ''){
            this.setState({
                surNameHelperText : "First name is required"
            })
            error = true;
        }
        if(this.state.lastName.trim() === ''){
            this.setState({
                otherNameHelperText : "Last name is required"
            })
            error = true;
        }
        if(this.state.nameOfCompany.trim() === ''){
            this.setState({
                nameOfCompanyHelperText : "Company is required"
            })
            error = true;
        }
        if(!error){
            this.props.isLoading(true)
            const {emailAddress, password, firstName, lastName, phoneNumber, nameOfCompany, memberShipType} = this.state;
            return  this.props.registerUser(emailAddress, password, firstName, lastName, phoneNumber, nameOfCompany, memberShipType)
        }
        
        // this.props.isLoading(true)
    }
  render() {
    const {classes} = this.props;
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item sm={6} xs={12} >
                    <div className="left-bk">
                        
                    </div>
                </Grid>
                <Grid item sm={6} className={classes.formContainer} xs={12} >
                    <form className={classes.form} noValidate autoComplete="off">
                    <FormControl className={classes.formControl} variant="outlined">
                            <InputLabel id="demo-simple-select-helper">Membership Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper"
                                id="demo-simple-select-helper"
                                value={this.state.memberShipType}
                                name="memberShipType"
                                onChange={this.handleChange}
                                label="Membership Type"
                                className={classes.select} 
                            >
                                {/* <MenuItem value="">
                                    <em>None</em>
                                </MenuItem> */}
                                <MenuItem value={''}>Select</MenuItem>
                                <MenuItem value={'M'}> Individual Member</MenuItem>
                                <MenuItem value={'B'}>Corporate Members - Two Registrant</MenuItem>
                                <MenuItem value={'A'}>Corporate Members - Five Registrants</MenuItem>
                                <MenuItem value={'LM'}>Life Individual Member</MenuItem>
                                <MenuItem value={'LB'}>Life Corporate Member - Two registrants </MenuItem>
                                <MenuItem value={'LA'}>Life Corporate Member - Five registrants</MenuItem>
                                <MenuItem value={'P'}> Patron</MenuItem>
                                <MenuItem value={'admin'}> Admin</MenuItem>
                                {/* <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                            {/* <FormHelperText color="primary">Required</FormHelperText> */}
                        </FormControl>
                        <div>
                            <TextField type="text"
                            error={this.state.surName.trim() === '' ? false : true}
                            helperText={this.state.surNameHelperText}
                             name="firstName"
                              className={classes.textInput}  
                              onChange={this.handleChange}
                              value={this.state.firstName}
                              id="firstName" label="Surname" variant="outlined" />
                        </div>
                        <div>
                            <TextField type="text"
                            error={this.state.otherNameHelperText.trim() === '' ? false : true}
                            helperText={this.state.otherNameHelperText}
                             name="lastName"
                              className={classes.textInput}  
                              onChange={this.handleChange}
                              value={this.state.lastName}
                              id="lastName" label="Other Names" variant="outlined" />
                        </div>
                        <div>
                            <TextField type="text"
                            error={this.state.nameOfCompanyHelperText.trim() === '' ? false : true}
                            helperText={this.state.nameOfCompanyHelperText}
                             name="nameOfCompany"
                              className={classes.textInput}  
                              onChange={this.handleChange}
                              value={this.state.nameOfCompany}
                              id="nameofcompany" label="Name of Company" variant="outlined" />
                        </div>
                        <div>
                            <TextField type="text"
                            error={this.state.phoneNumberHelperText.trim() === '' ? false : true}
                            helperText={this.state.phoneNumberHelperText}
                             name="phoneNumber"
                              className={classes.textInput}  
                              onChange={this.handleChange}
                              value={this.state.phoneNumber}
                              id="phoneNumber" label="Phone Number" variant="outlined" />
                        </div>
                        <div>
                            <TextField type="email"
                            error={this.state.emailHelperText.trim() === '' ? false : true}
                            helperText={this.state.emailHelperText}
                             name="emailAddress"
                              className={classes.textInput}  
                              onChange={this.handleChange}
                              value={this.state.emailAddress}
                              id="emailAddress" label="Email Address" variant="outlined" />
                        </div>
                        <div>
                            <TextField type="password"
                            error={this.state.passwordHelperText.trim() === '' ? false : true}
                            helperText={this.state.passwordHelperText}
                             name="password" className={classes.textInput}   
                             onChange={this.handleChange} 
                             value={this.state.password}
                             id="password" label="Password" variant="outlined" />
                        </div>
                        <div className="signup-wrapper">
                            <Typography
                                variant="h6"
                                body1="span"
                                className={classes.signupwrapper}
                            >
                                Already have an account? 
                            </Typography>
                            <Typography
                                component={Link}
                                to="/login"
                                variant="h6"
                                color="secondary"
                                body1="span"
                                className={classes.signupwrapper}
                            >
                                 Sign in here
                            </Typography>
                        </div>
                        <div>
                            <Button size="medium" onClick={this.handleFormSubmit} color="secondary" 
                            variant="contained" className={classes.materialButton}>
                                Sign Up
                            </Button>
                        </div>
                        
                    </form>
                    
                </Grid>
            </Grid>
        </Fragment>
        )
  }
}

const styles = {
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    formControl: {
        width: '100%',
        minWidth: '100%',
        marginBottom: 20,
        '& label': {
            fontSize: '0.725rem'
        },
    },
    form: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
        },
        width: '60%',
        maxWith: '600px',
        margin: '8rem auto'
    },
    textInput: {
        '& input': {
            padding: '9.5px 18px'
        },
        '& label': {
            fontSize: '0.725rem'
        },
        width: '100%',
        marginBottom: 20,
        // height: '2rem',
    },
    materialButton: {
        '& :hover': {
            // backgroundColor: '#49ab49',
        },
        // backgroundColor: '#49ab49',
        width: '100%',
        color: '#fff',
        borderRadius: '10px'
    },
    signupwrapper: {
        marginLeft: 8,
        fontSize: '0.954rem'
    },
    select: {
        width: '100%',
        height: 46,
        padding: '0.5px 18px !important'
    },
}

const mapStateToProps = state => {
    const {UI: {loading}} = state;
    return {
        loading
    }
}

export default connect(mapStateToProps, actions)(withStyles(styles)(SignUp)); 
