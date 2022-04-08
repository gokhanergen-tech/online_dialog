import React, { useEffect, useState } from 'react'
import TextInput from '../../components/text_input/text_input'

import styles from './login.module.css'
import Content from "../../components/content_base/content"
import Button from '../../components/button/button'

const Login = () => {
  const [isPasswordShow,setPasswordShow]=useState(false);
  
  const [mail,setMail]=useState("");
  const [password,setPassword]=useState("");
  
  const handleLogin=(e)=>{
     
  }
  
  useEffect(()=>{
      document.title="Login"
  },[])

  return (
   <Content>
     <div className='w-75'>
        <div>
         <label className='text-center mb-3 w-100'>Email</label>
         <TextInput setValueOnChange={setMail} placeholder={"Email"} iconClassName={"bi bi-envelope-fill"} type={"text"}></TextInput>
        </div>
        <div className="mt-5">
         <label className={'text-center mb-3 w-100 '}>Password</label>
         <TextInput setValueOnChange={setPassword} clickIcon={()=>setPasswordShow(!isPasswordShow)} placeholder={"Password"} iconClassName={"bi "+(!isPasswordShow?"bi-lock-fill":"bi-unlock-fill")} type={(!isPasswordShow?"password":"text")}></TextInput>
        </div>
        <div className="mt-5 d-flex justify-content-between me-3 ms-3">
         <Button onClick={handleLogin} value={"Sign in"}></Button>
         <span className={styles.forget_password}>Forget Password?</span>
        </div>
     </div>
   </Content>
    
  )
}

export default Login