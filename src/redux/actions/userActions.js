import axios from 'axios';

import { SHOW_LOADER, REDIRECT_TO_HOME } from "../types";

export const loginUser =  (emailAddress , password) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/auth/login', {emailAddress, password})
            // console.log(response)
            const { data: { data: { firstName, lastName, token, phoneNumber, id}}} = response;
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem('x-access-token', token);
            localStorage.setItem('ipf-user', JSON.stringify({firstName, lastName, token, phoneNumber, id}))
            dispatch({ type: SHOW_LOADER, payload: false})
            return dispatch({type: REDIRECT_TO_HOME, payload: ''});
        }catch(error){
            dispatch({type: SHOW_LOADER, payload: false});
            console.error(error);
        }
    }
}