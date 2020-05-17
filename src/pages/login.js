import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from "../redux/actions";
import Grid  from '@material-ui/core/Grid';
import { withStyles, TextField, Button, FormControlLabel, Checkbox, Typography, } from '@material-ui/core';
import { isEmailValid } from '../util/app';

// import people from "../assets/people.jpg";
// import theme from '../util/theme';

class Login extends Component {
    state = {
        rememberMe: false,
        emailAddress: '',
        emailHelperText: '',
        password: '',
        passwordHelperText: '',
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
        if(!error){
            this.props.isLoading(true)
            return this.props.loginUser(this.state.emailAddress, this.state.password);
        }
        // this.props.isLoading(true)
    }
  render() {
    const {classes} = this.props;
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid className='left-container' item sm xs={12} >
                    <div className="left-bk">
                        
                    </div>
                </Grid>
                <Grid item sm className={'right-container '+classes.formContainer} xs={12} >
                    <form className={classes.form} noValidate autoComplete="off">
                        <legend>
                            <Typography color="secondary" variant="h4">
                               Log In
                            </Typography>
                        </legend>
                        <div>
                            <TextField type="email"
                            error={this.state.emailHelperText.trim() === '' ? false : true}
                            helperText={this.state.emailHelperText}
                             name="emailAddress"
                              className={classes.textInput}  
                              onChange={this.handleChange}
                              id="emailAddress" label="User ID" variant="outlined" />
                        </div>
                        <div>
                            <TextField type="password"
                            error={this.state.passwordHelperText.trim() === '' ? false : true}
                            helperText={this.state.passwordHelperText}
                             name="password" className={classes.textInput}   
                             onChange={this.handleChange} 
                             id="password" label="Password" variant="outlined" />
                        </div>
                        <div className="alt-option-wrapper">
                            <div>
                                <FormControlLabel
                                    control={<Checkbox checked={this.state.rememberMe}
                                     onChange={this.handleChange} name="rememberMe" />}
                                    label="Remember Me"
                                />
                            </div>
                            <div>
                            <Typography
                                variant="h6"
                                color="secondary"
                                component={Link}
                                to="/forgot-password"
                                className={classes.headerText}
                                >
                                Forgot Password? 
                                </Typography>
                            </div>
                        </div>
                        <div>
                            <Button size="medium" onClick={this.handleFormSubmit} color="secondary" 
                            variant="contained" className={classes.materialButton}>
                                Login
                            </Button>
                        </div>
                        <div className="signup-wrapper">
                            <Typography
                                variant="h6"
                                body1="span"
                                className={classes.headerText}
                            >
                                Don't have an account? 
                            </Typography>
                            <Typography
                                component={Link}
                                to="/signup"
                                variant="h6"
                                color="secondary"
                                body1="span"
                                className={classes.signupwrapper}
                            >
                                 Sign Up
                            </Typography>
                        </div>
                    </form>
                    
                </Grid>
            </Grid>
        </Fragment>
    );
  }
}

const styles = {
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    formControl: {
        // width: '100%',
        marginBottom: 40
    },
    form: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
        },
        width: '60%',
        maxWith: '600px',
        margin: '0 auto'
    },
    textInput: {
        '& input': {
            padding: '9.5px 18px'
        },
        width: '100%',
        marginBottom: 40
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
    headerText: {
        fontSize: '0.954rem'
    },
    signupwrapper: {
        marginLeft: 8,
        fontSize: '0.954rem'
    }
}


const mapStatetToProps = state => ({});

export default connect(mapStatetToProps, actions)(withStyles(styles)(Login));