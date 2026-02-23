import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import supabase from './supabase-client';

import { Form, Row, Col, Button, Container, FormControl } from 'react-bootstrap'

import { FaUserCircle } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";


function Login() {
  // Variable declarations

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
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

    if(data.session != null){
      setuserData(data)
      navigate('/dashboard')
    }
    else {
      if(error.message == 'Invalid login credentials') {
        setError(error.message)
      }
    }
  }
  

  return (
    <div style={{maxHeight:'100vh', maxWidth:'100vw',overflowX:'hidden'}}>
      <Row>
        <Col style={{height: '100vh',
        backgroundImage: `url("https://res.cloudinary.com/dgjbvgwiv/image/upload/v1771849872/jonathan-ford-6ZgTEtvD16I-unsplash_swrwpv.jpg")`,
        backgroundRepeat:'no-repeat',
        backgroundSize: "cover",
        width: '100%',
        overflowX:'hidden',
        overflowY:'hidden'}}>
          <div style={{height:'100%', width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            
          </div>

        </Col>

        <Col style={{height: '100vh', width:'100%', overflowY:'hidden'}}>

          <div style={{height:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'column'}}>
            
            <div></div>

            <Form style={{width:'300px'}} onSubmit={signInWithEmail}>
              <span style={{fontSize:'20px', fontWeight:'bold', display:'flex', justifyContent:'center', width:'100%'}}>Login</span>
              <Form.Group className='py-3'>
                <Form.Control style={{height:'50px'}} type='text' placeholder='Email' 
                onChange={(event) =>{
                  setEmail(event.target.value)
                  setError('')
                }}/>
              </Form.Group>
              
              <Form.Group style={{paddingBottom:'10px'}}>
                <Form.Control style={{height:'50px'}} type='password' placeholder='Password'
                onChange={(event) => {
                  setPassword(event.target.value)
                  setError('')
                  }}/>
              </Form.Group>

              <Form.Text style={{width:'100%', display:'flex', justifyContent:'end', paddingBottom:'15px'}}>
                <span>Forgot Password?</span>
              </Form.Text>

              <Form.Group style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', paddingBottom:'20px'}}>
                  {error && <p style={{color:'red'}}>{error} </p>}
                
                <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                  <Button type='submit' style={{width:'100%',justifyContent:'center', display:'flex'}}> 
                    Submit
                  </Button>
                </div>
                
              </Form.Group>

              <hr />
            </Form>

            <span>All rights reserved 2026</span>
          </div>

          
    
        </Col>

        </Row>
    </div>
  )
}

export default Login
