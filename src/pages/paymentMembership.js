import React, { useEffect } from 'react';
import DashBoard from '../hoc/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Grid, TextField, InputAdornment, Button, OutlinedInput } from '@material-ui/core';
import { SHOW_LOADER, DUE_TO_PAY_FETCHED } from '../redux/types';
import axios from 'axios';

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

const PaymentMembership = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const dispatch = useDispatch()
    const dueToPay = useSelector(state => state.UI)
    console.log('is ue'+ dueToPay)
//  useEffect(() => {
//      dispatch({type: SHOW_LOADER, payload: true})
//      getPaymentDue();
//  })
 const getPaymentDue = async () => {
   const response =  await axios.get('/api/v1/pay/init-dues')
   const { data: {dueToPay}} = response.data;
   console.log(dueToPay)
//    dispatch({type: SHOW_LOADER, payload: false})
//    dispatch({type: DUE_TO_PAY_FETCHED, payload: dueToPay})
 }
  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
                        value={age}
                        onChange={handleChange}
                        label="Pay For"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        {/* <InputLabel id="demo-simple-select-outlined-label">Pay For</InputLabel> */}
                        <TextField type="text"
                            // error={this.state.passwordHelperText.trim() === '' ? false : true}
                            // helperText={this.state.passwordHelperText}
                             name="name" className={classes.textInput}   
                             onChange={handleChange} 
                             id="name" label="Name" variant="outlined" />
                    </FormControl>
                </div>
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        {/* <InputLabel id="demo-simple-select-outlined-label">Pay For</InputLabel> */}
                        <TextField type="text"
                            // error={this.state.passwordHelperText.trim() === '' ? false : true}
                            // helperText={this.state.passwordHelperText}
                             name="userid" className={classes.textInput}   
                             onChange={handleChange} 
                             id="userid" label="User ID" variant="outlined" />
                    </FormControl>
                </div>
                <Grid container spacing={2}>
                    <Grid item sm>
                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                {/* <InputLabel id="demo-simple-select-outlined-label">Pay For</InputLabel> */}
                                <TextField type="text"
                                    // error={this.state.passwordHelperText.trim() === '' ? false : true}
                                    // helperText={this.state.passwordHelperText}
                                    name="registeredEmail" className={classes.textInput}   
                                    onChange={handleChange} 
                                    id="registeredEmail" label="Registered Email" variant="outlined" />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item sm>
                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                {/* <InputLabel id="demo-simple-select-outlined-label">Pay For</InputLabel> */}
                                <TextField type="text"
                                    // error={this.state.passwordHelperText.trim() === '' ? false : true}
                                    // helperText={this.state.passwordHelperText}
                                    name="confirmEmail" className={classes.textInput}   
                                    onChange={handleChange} 
                                    id="confirmEmail" label="Confirm Email" variant="outlined" />
                            </FormControl>
                        </div>
                    </Grid>
                </Grid>
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        {/* <InputLabel id="demo-simple-select-outlined-label">Pay For</InputLabel> */}
                        <TextField type="text"
                            // error={this.state.passwordHelperText.trim() === '' ? false : true}
                            // helperText={this.state.passwordHelperText}
                            name="registeredPhone" className={classes.textInput}   
                            onChange={handleChange} 
                            id="registeredPhone" label="Registered Phone" variant="outlined" />
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
                        <Button size="large" color="secondary" 
                                variant="contained" className={classes.materialButton}>
                                    Proceed
                        </Button>
                    </Grid>
                </Grid>
             </Grid>
             <Grid item sm={2}></Grid>
        </Grid>
      </DashBoard>
  )
}



export default PaymentMembership;
