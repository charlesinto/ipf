import { SHOW_LOADER, REDIRECT_TO_HOME, SET_ACTIVE_LINK,
    SET_AUTH_STATUS } from "../types"


const INITIAL_STATE = {
    loading: false,
    goToHome: false,
    isAuthenticated: false,
    activeLink: 'dashboard'
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SHOW_LOADER:
            if(action.payload){
                return {...state, loading: true}
            }
            return {...state, loading: false,}
        case REDIRECT_TO_HOME: 
            return {...state, goToHome: true, isAuthenticated: true}

        case SET_AUTH_STATUS:
            return {...state, isAuthenticated: action.payload}
        case SET_ACTIVE_LINK:
            return {...state, activeLink: action.payload}
        default:
            return {...state}
    }
}