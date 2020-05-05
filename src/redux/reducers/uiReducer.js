import { SHOW_LOADER } from "../types"


const INITIAL_STATE = {
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SHOW_LOADER:
            if(action.payload){
                return {...state, loading: true}
            }
            return {...state, loading: false}
        default:
            return {...state}
    }
}