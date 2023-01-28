import { Button, Heading, Input, useToast } from '@chakra-ui/react'
import style from "./css.module.css"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClearFunc, LoginApi } from '../../Redux/user/user.action'

const initialState = {
    email:"",
    password:""
}

const Login = () => {
    const [form, setForm] = useState(initialState);
    const { loginData, loading, error, loginDataFail } = useSelector( (store) => store.User );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    
    // ----------------- (Navigate) --------------
    useEffect(()=>{
        if(loginData){
         navigate("/")
         // ------------ Alert---------- 
         toast({
            title: loginData.message,
            status: 'info',
            duration: 2000,
            isClosable: true,
            position:"top"
          })
        }else if(loginDataFail){
            // ------------ Alert---------- 
            toast({
                title: loginDataFail.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:"top"
            })
            dispatch(ClearFunc())   
        }
    }, [loginData, loginDataFail])
        
    // ---------- ( onChange function ) ---------
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev)=> ({...prev, [name]:value}))
    }


    // --------- ( onSubmit function ) ----------
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(LoginApi(form))
    }


  return (
    <div className={style.signup}>
        {/* -------------- ( Api Error ) --------------- */}
        {error ? <Heading color="red">Server error...</Heading> : ""}

        <h1>Log in</h1>
        {/* --------- ( Login Form ) --------- */}
        <form className={style.form} onSubmit={handleSubmit}>
            <Input name="email" onChange={handleChange} value={form.email} required bg="#ffff" placeholder='Email' type="email" />
            <Input name="password" onChange={handleChange} value={form.password} required bg="#ffff" placeholder='Password' type="password" />
            <Button type="submit">
               {loading ? "loading..." : "Log in" }
            </Button>
        </form>
    </div>
  )
}

export default Login;