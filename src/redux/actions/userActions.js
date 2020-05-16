import axios from 'axios';

import { SHOW_LOADER, REDIRECT_TO_HOME, SHOW_ALERT, REDIRECT_TO_LOGIN } from "../types";

export const loginUser =  (emailAddress , password) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/auth/login', {emailAddress, password})
            // console.log(response)
            const { data: { data: { firstName, lastName, token, phoneNumber, id, approved}}} = response;
            axios.defaults.headers.common['x-access-token'] = token;
            localStorage.setItem('x-access-token', token);
            localStorage.setItem('ipf-user', JSON.stringify({firstName,approved, lastName, token, phoneNumber, id, emailAddress}))
            dispatch({ type: SHOW_LOADER, payload: false})
            return dispatch({type: REDIRECT_TO_HOME, payload: ''});
        }catch(error){
            dispatch({type: SHOW_LOADER, payload: false});
            console.error(error);
        }
    }
}

export const registerUser =  (emailAddress, password, firstName, lastName, phoneNumber, nameOfCompany, memberShipType) => {
    return async (dispatch) => {
        try{
            const response =  await axios.post('/api/v1/auth/register', {emailAddress, firstName, lastName, password, phoneNumber, nameOfCompany, 'role': memberShipType})
             console.log(response)
             dispatch({type: SHOW_LOADER, payload: false})
             dispatch({type: SHOW_ALERT, payload: {title: 'Action successful', text:'Account created successfully, please login to access your account', type:'success'}})
             dispatch({type: REDIRECT_TO_LOGIN, payload: ''})
         }catch(error){
            dispatch({type: SHOW_LOADER, payload: false})
            console.error(error)
             if(error.response){
                
                
               return dispatch({type: SHOW_ALERT, payload: {title: 'Action Error', text: error.response.data.message, type:'error'}})

             }
             dispatch({type: SHOW_ALERT, payload: { title: 'Action Error', text: 'Some errors were encountered, please try again', type: 'info'}})
         }
    }
}