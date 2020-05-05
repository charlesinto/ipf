import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from "../redux/actions";
import Grid  from '@material-ui/core/Grid';
import { withStyles, TextField, } from '@material-ui/core';

// import people from "../assets/people.jpg";
// import theme from '../util/theme';

class Login extends Component {
  render() {
    const {classes} = this.props;
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item sm={6} xs={12} >
                    <div class="left-bk">
                        
                    </div>
                </Grid>
                <Grid item sm={6} xs={12} >
                    <form className={classes.form} noValidate autoComplete="off">
                        
                        <div>
                            <TextField type="email" name="emailAddress" className={classes.textInput}  id="email" label="Email Address" variant="outlined" />
                        </div>
                        <div>
                            <TextField type="password" name="password" className={classes.textInput}    id="password" label="Password" variant="outlined" />
                        </div>
                        
                    </form>
                </Grid>
            </Grid>
        </Fragment>
    );
  }
}

const styles = {
    form: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
        },
        width: '60%',
        maxWith: '600px',
        margin: '4rem auto'
    },
    textInput: {
        
        width: '100%',
        marginBottom: 40
    }
}


const mapStatetToProps = state => {}

export default connect(mapStatetToProps, actions)(withStyles(styles)(Login));