import { useEffect, useRef, useState } from "react"

const useStateWithCallback=(initialState)=>{
     const [state,setState]=useState(initialState)
     const callbackRef=useRef(null)
     const newSetState=(userState,callback)=>{
        callbackRef.current=callback;
        setState(prev=>typeof userState==="function"?userState(prev):useState)
     }

     useEffect(()=>{
        if(callbackRef.current)
          callbackRef.current();
        callbackRef.current=null;
     },[state])
   return [state,newSetState];
}

export {useStateWithCallback};




