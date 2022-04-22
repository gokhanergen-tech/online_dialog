import React, { useCallback, useEffect, useState } from 'react'
import TextInput from '../../components/text_input/text_input'

import styles from './login.module.css'
import Content from "../../components/content_base/content"
import Button from '../../components/button/button'
import { login } from '../../axios/http'
import { useDispatch } from 'react-redux'

import {setLogin} from '../../redux_store/actions/auth_actions/actions'

const Login = () => {
  const [isPasswordShow,setPasswordShow]=useState(false);
  
  const [warnings,setWarnings]=useState([{type:"mail",message:""},{type:"password",message:""}])
  const [backendMessage,setBackendMessage]=useState();

  const [mail,setMail]=useState("");
  const [password,setPassword]=useState("");
  
  const dispatch=useDispatch();

  const handleLogin=useCallback(async (e)=>{
     e.preventDefault();
     const copy=[...warnings];
     
     if(!mail){
        copy[0].message="Empty field is not acceptable";
     }else{
        const result=(mail.match("(.+)@(.+)[.](.+)")?.input);
        if(result){
          copy[0].message=""
        }else{
          copy[0].message="This is not an email";
        }
     }

     if(!password){
       copy[1].message="Empty field is not acceptable"
      }else{
       const copy=[...warnings];
       copy[1].message=""
      }

      if(!copy[0].message && !copy[1].message ){
        try{
          const {data}=await login({email:mail,password:password})
          dispatch(setLogin(data));
        }catch(err){
          const message=err.response.data.message;
          setBackendMessage(message)
        }
        
      }else{
        setBackendMessage("")
        setWarnings(copy);
      }

     
  },[warnings,password,mail])
  
  useEffect(()=>{
      document.title="Login"
  },[])

  return (
   <Content>
     <div className='w-75'>
       
        <div>
         <label className='text-center mb-3 w-100'>Email</label>
         <TextInput warning={warnings[0].message?warnings[0].message:""} setValueOnChange={setMail} placeholder={"Email"} iconClassName={"bi bi-envelope-fill"} type={"text"}></TextInput>
        </div>

        <div className="mt-5">
         <label className={'text-center mb-3 w-100 '}>Password</label>
         <TextInput warning={warnings[1].message?warnings[1].message:""}  setValueOnChange={setPassword} clickIcon={()=>setPasswordShow(!isPasswordShow)} placeholder={"Password"} iconClassName={"bi "+(!isPasswordShow?"bi-lock-fill":"bi-unlock-fill")} type={(!isPasswordShow?"password":"text")}></TextInput>
        </div>

        <div className="mt-5 d-flex justify-content-between me-3 ms-3">
         <Button onClick={handleLogin} value={"Sign in"}></Button>
         <span className={styles.forget_password}>Forget Password?</span>
        </div>
         
        {/*This is for backend error */}
        {
          backendMessage&&<div className='mt-2 text-center'>
          <span className="text-warning font-monospace">{backendMessage}</span>
        </div>
        }
       
     </div>
    
   </Content>
    
  )
}

export default Login