import React, {useEffect,  useState, useCallback} from 'react';
import { useDispatch, } from 'react-redux';
import { SET_ACTIVE_LINK, SHOW_LOADER } from '../redux/types';
import DashBoard from '../hoc/Dashboard';
import { Grid, Paper, Typography, } from '@material-ui/core';
import mastercard from "../assets/mastercard.svg";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({

    paperRoot: {
        width: '90%',
        margin: '0 auto 15px auto',
        padding: '12px 30px'

    },
    root: {
        width: '100%',
        marginBottom: '10px'
      },
    titleWrapper: {
        margin: '0 0 10px 0'
    },
    apiValue: {
        fontWeight: 'bold',
        textAlign:'left',
        fontSize: 14
    },
    apiTitle: {
        fontSize: 12,
        textAlign:'center'
    },
    mobileApiTitle: {
        textAlign:'right',
        fontSize: 14
    },
    apiImage: {
        display:'flex',
        justifyContent:'center'
    },
    deskopPayment: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
            flex: 1
          },
        [theme.breakpoints.up('md')]: {
            display: 'block',
          },
    },
    mobilePayment: {
        [theme.breakpoints.down('md')]: {
            display: 'block !important',
            flex: 1
          },
        [theme.breakpoints.up('md')]: {
            display: 'none !important',
            flex: 1
          },
    }
}))

const PaymentHistory = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const initialState =  []
    const [state, setState] = useState(initialState)
    const initFetch = useCallback(() => {
        const getPaymentHistory = async () => {
            try{
                dispatch({type: SHOW_LOADER, payload: true})
                const response  = await axios.get('/api/v1/pay/get');
                console.log(response.data.data);
                dispatch({type: SHOW_LOADER, payload: false})
                setState(JSON.parse(JSON.stringify(response.data.data)))
                
            }catch(error){
                console.error(error.response)
                dispatch({type: SHOW_LOADER, payload: false})
            }
        }
        getPaymentHistory()
      }, [dispatch,]);
      
    useEffect(()=> {
        dispatch({type: SET_ACTIVE_LINK, payload: 'paymentHistory'})
        initFetch()
    }, [dispatch,initFetch])
      const formartAsMoney = (amount) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
            maximumSignificantDigits: 3
          });
          
         return  formatter.format(amount);
        }
    const renderPayments = () => {
       return state.map((payment) => {
           return (
           <Paper className={clsx(classes.paperRoot, classes.deskopPayment)} elevation={2} key={payment.transactionId}>
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
                       {payment.transactionId}
                   </Grid>
                   <Grid className={classes.apiValue} sm item>
                       {payment.paymentId}
                   </Grid>
                   <Grid className={classes.apiValue} sm item>
                       {`${new Date(payment.dateCreated).toLocaleString()}`}
                   </Grid>
                   <Grid className={classes.apiValue} sm item>
                       {formartAsMoney(payment.duePaid)}
                   </Grid>
                   <Grid sm item className={classes.apiImage}>
                       <img src={mastercard} alt="Master card" style={{width: '120px', height: '40px'}} />
                   </Grid>
               </Grid>
         </Paper>);
       });
    }
    const renderMobilePayments = () => {
        return state.map((payment, i) => (
            <div className={clsx(classes.root, classes.mobilePayment)}>
                <ExpansionPanel >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography color="secondary">{payment.transactionId}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={2}>
                            <Grid item sm>
                                <Typography className={classes.mobileApiTitle} variant="h6" color="secondary">
                                    Amount
                                </Typography>
                            </Grid>
                            <Grid item sm >
                                <Typography className={classes.apiValue} variant="h6">
                                    {formartAsMoney(payment.duePaid)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item sm>
                                <Typography className={classes.mobileApiTitle} variant="h6" color="secondary">
                                    Payment ID
                                </Typography>
                            </Grid>
                            <Grid item sm >
                                <Typography className={classes.apiValue} variant="h6">
                                    {payment.paymentId}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item sm>
                                <Typography className={classes.mobileApiTitle} variant="h6" color="secondary">
                                   Date
                                </Typography>
                            </Grid>
                            <Grid item sm >
                                <Typography className={classes.apiValue} variant="h6">
                                {`${new Date(payment.dateCreated).toLocaleString()}`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        ))
    }
    return (
        <DashBoard>
            {
                renderPayments()
            }
            {
                renderMobilePayments()
            }
        </DashBoard>
    )
}

export default PaymentHistory;