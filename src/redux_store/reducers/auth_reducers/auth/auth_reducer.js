const initialState={
    isAuth:false,
    user:null
}


const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_LOGIN:
            return {
                ...state,...action.payload
            }
        default:
         return state;
    }
}

export default authReducer;