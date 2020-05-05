import axios from 'axios';

import { SHOW_LOADER } from "../types";

export const loginUser =  (email , password) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/auth/login', {email, password})
            console.log(response)
        }catch(error){
            dispatch({type: SHOW_LOADER, payload: false});
            console.error(error);
        }
    }
}