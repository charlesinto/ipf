import React, { useEffect, useCallback, useState } from 'react';
import DashBoard from '../hoc/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, connect } from "react-redux";
import { Grid, InputAdornment, Button, OutlinedInput, Snackbar } from '@material-ui/core';
import { SHOW_LOADER, DUE_TO_PAY_FETCHED, SHOW_ALERT, REDIRECT_TO_LOGIN } from '../redux/types';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { pstack_publickey } from '../config';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: '100%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    materialButton: {
        marginTop: 20,
        textAlign: 'right'
    },
    btnwrapper:{
        textAlign:'right'
    }
  }));
  
const PaymentMembership = ({appState}) => {
    
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const initFetch = useCallback(() => {
        const getPaymentDue = async () => {
            try{
                dispatch({type: SHOW_LOADER, payload: true})
                const response =  await axios.get('/api/v1/pay/init-dues')
                const { data} = response.data;
                setEmail(appState.payData.emailAddress)
                dispatch({type: SHOW_LOADER, payload: false})
                dispatch({type: DUE_TO_PAY_FETCHED, payload:data})
            }catch(error){
                dispatch({type: SHOW_LOADER, payload: false})
                console.error(error.response.status)
                if(error.response && error.response.status === 403){
                   localStorage.removeItem('x-access-token')
                   dispatch({type: REDIRECT_TO_LOGIN, payload:''})
                }
            }
            
        }
        getPaymentDue()
      }, [dispatch, appState.payData.emailAddress]);
      
    useEffect(()=> {
        
        initFetch()
    }, [initFetch])
    const classes = useStyles();
    const [state, setState] = useState({dues_id: '', amount: 0});
    const [openSnackbar, toggleSnackbar] = useState(false)
    // const [amountToPay, setAmount] = useState(0)
    
  const handleChange = (event) => {
      const {target: {name, value}} = event
    if(name === 'dues_id' ){
        const amount = appState.dueToPay.find(element => {
            const item = JSON.stringify(element)
            const item2 = JSON.parse(item);
            return item2.dues_id === parseInt(value)
        });
        if(amount !== undefined){
            const pay = JSON.parse(JSON.stringify(amount))

            return setState({...state, [event.target.name]: event.target.value, amount: `${pay.amount}`});
        }
       return  setState({...state, [event.target.name]: event.target.value, amount: `0`});
    }
    return setState({...state, [event.target.name]: event.target.value});
  };
  const handlePayment = () => {
    toggleSnackbar(false)
    if(state.dues_id.trim() === ''){
        return toggleSnackbar(true)
    }
    if(parseInt(state.amount.trim()) <= 0){
        return toggleSnackbar(true)
    }
    var handler = window.PaystackPop.setup({
        key: pstack_publickey,
        email: email,
        amount: parseInt(state.amount) * 100,
        currency: "NGN",
        ref: getReference(), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
           custom_fields: [
              {
                  display_name: "Mobile Number",
                  variable_name: "mobile_number",
                  value: "+2348012345678"
              }
           ]
        },
        callback: (response) => callback(response),
        onClose: () =>  close()
      });
      handler.openIframe();
  }
  const handleClose = () => {

  }
  const getReference = () => {
    //you can put any unique reference implementation code here
        let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    const callback = async (response) => {
        dispatch({type: SHOW_LOADER, payload: true})
        //call api
        try{
             await axios.get(`api/v1/pay/verify?duesID=${state.dues_id}&reference=${response.reference}`)
            dispatch({type: SHOW_LOADER, payload: false})
            dispatch({type: SHOW_ALERT, payload: {title: 'Action Success',
                 text:'Payment Successful', type:'success'}})
        }catch(error){
            console.error(error);
            dispatch({type: SHOW_LOADER, payload: false})
            dispatch({type: SHOW_ALERT, payload: {title: 'Action Error',
                 text:'Some errors were encountered verifying payment', type:'warning'}})
        } // card charged successfully, get reference here
    }

    const close = () => {
        console.log("Payment closed");
    }
  return (
      <DashBoard>  
         <Grid container>
             <Grid item sm={2}></Grid>
             <Grid item sm={8}>
                 <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Pay For</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={state.dues_id}
                        onChange={handleChange}
                        name="dues_id"
                        label="Pay For"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            appState.dueToPay.map((element) => {
                                return <MenuItem value={`${element['dues_id']}`}>
                                            {element['paymentFor']}
                                        </MenuItem>
                            })
                        }
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="amountid">Amount</InputLabel>
                        <OutlinedInput type="text"
                            labelId="amountid"
                            // error={this.state.passwordHelperText.trim() === '' ? false : true}
                            // helperText={this.state.passwordHelperText}
                            name="amount" className={classes.textInput}   
                            onChange={handleChange}
                            placeholder="Amount"
                            value={state.amount}
                            startAdornment={<InputAdornment position="start">&#8358;</InputAdornment>}
                            // inputProps={{
                            //     startAdornment: <InputAdornment position="start">Kg</InputAdornment>
                            // }} 
                            id="amount" label="Amount" variant="outlined" />
                    </FormControl>
                </div>
                <Grid container>
                    <Grid item sm></Grid>
                    <Grid sm item className={classes.btnwrapper}>
                        <Button size="large" color="secondary" onClick={handlePayment}
                                variant="contained" className={classes.materialButton}>
                                    Proceed
                        </Button>
                    </Grid>
                </Grid>
             </Grid>
             <Grid item sm={2}></Grid>
        </Grid>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning">
                Please select payment plan and amount can not be zero
            </Alert>
        </Snackbar>
      </DashBoard>
  )
}

const mapStateToProps = state => {
    const {user: appState, UI: { user}} = state;
    return {appState, user}
}



export default connect(mapStateToProps, null)(PaymentMembership);
