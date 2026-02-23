import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);


import { Form, Row, Col, Button, Container } from 'react-bootstrap'

import { FaUserCircle } from "react-icons/fa";

function Login() {
  // Variable declarations
  let time  = new Date().toLocaleTimeString()
  let dateNow = new Date()
  const navigate = useNavigate();

  const [ctime,setTime] = useState(time)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setuserData] = useState('')


  useEffect(() =>{
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession()
      setuserData(data)

    }
    checkSession()
  }, [])

  async function signInWithEmail(event) {

    event.preventDefault()
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    console.log(data)

    if (error){
      alert('Error logging in')
    }
    else{
      setuserData(data)
      navigate ('/dashboard')
    }
  }
  
  const UpdateTime=()=>{
    time =  new Date().toLocaleTimeString()
    setTime(time)
  }
  setInterval(UpdateTime)
  return (
    <div style={{minHeight:'100vh', maxWidth:'100vw',overflowX:'hidden'}}>
      <Col style={{display:'flex',justifyContent:'center', flexDirection:'column', textAlign:'center'}}>
        <div style={{textAlign:'center'}}>
          <h1 style={{fontWeight:'bold'}}>{ctime}</h1>
          <p>{dateNow.toDateString()}</p>
        </div>
        <div>
          <FaUserCircle style={{
            fontSize:'160px'
          }}/>
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
          <Form style={{width:'300px'}} onSubmit={signInWithEmail}>
            <Form.Group className='py-2'>
              <Form.Control style={{borderRadius:'20px'}} type='text' placeholder='Email' 
              onChange={(event) =>{setEmail(event.target.value)}}/>
            </Form.Group>
            
            <Form.Group style={{paddingBottom:'10px'}}>
              <Form.Control style={{borderRadius:'20px'}} type='password' placeholder='Password'
               onChange={(event) => {setPassword(event.target.value)}}/>
            </Form.Group>

            <Form.Group style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%'}}>
              <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                <Button type='submit' style={{borderRadius:'20px',width:'200px',justifyContent:'center', display:'flex'}}> 
                  Submit
                </Button>
              </div>
              
            </Form.Group>
          </Form>
        </div>
  
      </Col>

      
    </div>
  )
}

export default Login
