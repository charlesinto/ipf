import { SHOW_LOADER } from "../types"


export const isLoading = (state= false) => {
    return { type: SHOW_LOADER, payload: state}
}