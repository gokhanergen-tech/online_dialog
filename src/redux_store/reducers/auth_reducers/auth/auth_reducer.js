import AUTH_TYPES from "../../../actions/auth_actions/types";


const initialState={
    isAuth:false,
    user:{}
}


const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case AUTH_TYPES.SET_LOGIN:
            return {
                ...action.payload
            }
        case AUTH_TYPES.SET_CLEAR_AUTH:
            return {
                isAuth:false,user:null
            }
        default:
         return state;
    }
}

export default authReducer;