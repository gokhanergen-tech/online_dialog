import React, { useEffect, useState } from 'react'
import TextInput from '../../components/text_input/text_input'

import styles from './login.module.css'
import Content from "../../components/content_base/content"
import Button from '../../components/button/button'

const Login = () => {
  const [isPasswordShow,setPasswordShow]=useState(false);
  
  const [warnings,setWarnings]=useState([{type:"mail",message:""},{type:"password",message:""}])

  const [mail,setMail]=useState("");
  const [password,setPassword]=useState("");
  
  const handleLogin=(e)=>{
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

      setWarnings(copy);
  }
  
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
     </div>
   </Content>
    
  )
}

export default Login