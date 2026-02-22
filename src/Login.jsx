import React, { useState } from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'

import { FaUserCircle } from "react-icons/fa";

function Login() {
  // Variable declarations
  let time  = new Date().toLocaleTimeString()
  let dateNow = new Date()
  const [ctime,setTime] = useState(time)
  
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
          <Form style={{width:'300px'}}>
            <Form.Group className='py-2'>
              <Form.Control style={{borderRadius:'20px'}} type='text' placeholder='Username' />
            </Form.Group>
            
            <Form.Group style={{paddingBottom:'10px'}}>
              <Form.Control style={{borderRadius:'20px'}} type='password' placeholder='Password' />
            </Form.Group>

            <Form.Group style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%'}}>
              <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                <Button style={{borderRadius:'20px',width:'200px',justifyContent:'center', display:'flex'}}> 
                  Submit
                </Button>
              </div>
              
              <Form.Text>No account yet? Sign up here</Form.Text>
            </Form.Group>
          </Form>
        </div>
  
      </Col>

      
    </div>
  )
}

export default Login
