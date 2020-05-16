import { SHOW_LOADER , REDIRECT_TO_HOME, SET_ACTIVE_LINK, 
    SET_AUTH_STATUS, SET_CURRENT_USER, HIDE_ALERT} from "../types"


export const isLoading = (state= false) => {
    return { type: SHOW_LOADER, payload: state}
}

export const redirectToHome = () => {
    return { type: REDIRECT_TO_HOME, payload: ''}
}

export const setAuthStatus = status => {
    return { type: SET_AUTH_STATUS , payload : status}
}

export const setActiveLink = link => {
    return { type: SET_ACTIVE_LINK , payload: link}
}

export const setCurrentUser = user => {
    return { type: SET_CURRENT_USER, payload: user}
}

export const closeAlert = () => {
    return {type: HIDE_ALERT, payload: {}}
}