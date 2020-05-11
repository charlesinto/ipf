import React, {useEffect,  useState} from 'react';
import { useDispatch, } from 'react-redux';
import { SET_ACTIVE_LINK } from '../redux/types';
import DashBoard from '../hoc/Dashboard';
import { Grid, Paper, Typography, } from '@material-ui/core';
import mastercard from "../assets/mastercard.svg";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

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
}))

const PaymentHistory = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const initialState = {
        data: [
            {paymentFor: 'Membership', paymentId: 908432805,  date: '03-05-20', amount: 92901901091},
            {paymentFor: 'Membership', paymentId: 908432805,  date: '03-05-20', amount: 92901901091},
            {paymentFor: 'Membership', paymentId: 908432805,  date: '03-05-20', amount: 92901901091},
            {paymentFor: 'Membership', paymentId: 908432805,  date: '03-05-20', amount: 92901901091},
            {paymentFor: 'Membership', paymentId: 908432805,  date: '03-05-20', amount: 92901901091},
        ]
    }
    const [state] = useState(initialState)
    useEffect(() => {
        dispatch({type: SET_ACTIVE_LINK, payload:'paymentHistory'})
        // Inside this callback function we perform our side effects.
      });
      const formartAsMoney = (amount) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
            maximumSignificantDigits: 3
          });
          
         return  formatter.format(amount);
        }
    const renderPayments = () => {
       return state.data.map((payment) => {
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
                       {formartAsMoney(payment.amount)}
                   </Grid>
                   <Grid sm item>
                       <img src={mastercard} alt="Master card" style={{width: '120px', height: '40px'}} />
                   </Grid>
               </Grid>
         </Paper>);
       });
    }
    return (
        <DashBoard>
            {
                renderPayments()
            }
        </DashBoard>
    )
}

export default PaymentHistory;