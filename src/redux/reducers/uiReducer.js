import { SHOW_LOADER, REDIRECT_TO_HOME, SET_ACTIVE_LINK,
    SET_AUTH_STATUS, 
    SET_CURRENT_USER, SHOW_ALERT, HIDE_ALERT, REDIRECT_TO_LOGIN} from "../types"


const INITIAL_STATE = {
    loading: false,
    goToHome: false,
    isAuthenticated: false,
    activeLink: 'dashboard',
    user: {},
    alert: {},
    showAlert: false,
    gotoLogin: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SHOW_LOADER:
            if(action.payload){
                return {...state, loading: true}
            }
            return {...state, loading: false,}
        case REDIRECT_TO_HOME: 
            return {...state, goToHome: true, isAuthenticated: true, gotoLogin: false}
        case REDIRECT_TO_LOGIN:
            return {...state, gotoLogin: true, isAuthenticated: false}
        case SET_AUTH_STATUS:
            return {...state, isAuthenticated: action.payload}
        case SET_ACTIVE_LINK:
            return {...state, activeLink: action.payload}
        case SET_CURRENT_USER:
            return {...state, user: action.payload}
        case HIDE_ALERT:
            return {...state, alert: {}, showAlert: false}
        case SHOW_ALERT:
            console.log(action.payload) 
            return {...state,showAlert: true, alert:{title: action.payload.title, text: action.payload.text,
                 type: action.payload.type ? action.payload.type : 'info'}}
        default:
            return {...state}
    }
}