import TYPES from './types'

const setLogin=(payload)=>{
   return {
       type:TYPES.SET_LOGIN,payload
   }
}

const clearAuth=()=>{
    return {
        type:TYPES.SET_CLEAR_AUTH
    }
}

export {setLogin,clearAuth};