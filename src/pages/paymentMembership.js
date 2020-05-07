import React, { Component } from 'react';
import DashBoard from '../hoc/Dashboard';
import { Grid, Paper, withStyles, Typography, } from '@material-ui/core';
import mastercard from "../assets/mastercard.svg";

class PaymentMembership extends Component {
 state = {
     data: [
         {paymentFor: 'Membership', paymentId: 908432805,  date: '03-05-20', amount: 92901901091},
         {paymentFor: 'Membership', paymentId: 908432805,  date: '03-05-20', amount: 92901901091},
         {paymentFor: 'Membership', paymentId: 908432805,  date: '03-05-20', amount: 92901901091},
         {paymentFor: 'Membership', paymentId: 908432805,  date: '03-05-20', amount: 92901901091},
         {paymentFor: 'Membership', paymentId: 908432805,  date: '03-05-20', amount: 92901901091},
     ]
 }
 formartAsMoney = (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        maximumSignificantDigits: 3
      });
      
     return  formatter.format(amount);
 }
 renderPayments = () => {
     const { classes} = this.props;
    return this.state.data.map((payment) => {
        return (
        <Paper className={classes.paperRoot} elevation={2}>
            <Grid className={classes.titleWrapper} container>
                <Grid item sm >
                    <Typography className={classes.apiTitle} variant="h6" color="secondary">
                        Payment For
                    </Typography>
                </Grid>
                <Grid item sm >
                    <Typography className={classes.apiTitle} variant="h6" color="secondary">
                        Payment ID
                    </Typography>
                </Grid>
                <Grid item sm >
                    <Typography className={classes.apiTitle} variant="h6" color="secondary">
                        Date
                    </Typography>
                </Grid>
                <Grid item sm >
                    <Typography className={classes.apiTitle} variant="h6" color="secondary">
                        Amount
                    </Typography>
                </Grid>
                <Grid item sm >
                    <Typography className={classes.apiTitle} variant="h6" color="secondary">
                        Payment Method
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid className={classes.apiValue} sm item>
                    {payment.paymentFor}
                </Grid>
                <Grid className={classes.apiValue} sm item>
                    {payment.paymentId}
                </Grid>
                <Grid className={classes.apiValue} sm item>
                    {payment.date}
                </Grid>
                <Grid className={classes.apiValue} sm item>
                    {this.formartAsMoney(payment.amount)}
                </Grid>
                <Grid sm item>
                    <img src={mastercard} alt="Master card" style={{width: '120px', height: '40px'}} />
                </Grid>
            </Grid>
      </Paper>);
    });
 }
  render() {
    return (
      <DashBoard>  
          {
              this.renderPayments()
          }
      </DashBoard>
    );
  }
}

const styles = {
    paperRoot: {
        width: '90%',
        margin: '0 auto 15px auto',
        padding: '12px 30px'
    },
    titleWrapper: {
        margin: '0 0 10px 0'
    },
    apiValue: {
        fontWeight: 'bold'
    },
    apiTitle: {
        fontSize: 12
    }
}

export default withStyles(styles)(PaymentMembership);
