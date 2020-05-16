import { DUE_TO_PAY_FETCHED } from "../types"


const INITIAL_STATE = {
    dueToPay: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case DUE_TO_PAY_FETCHED: 
            return {...state, dueToPay: action.payload}
        default:
            return {...state}
    }
}