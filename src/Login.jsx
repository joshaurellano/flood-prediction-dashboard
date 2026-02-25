import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import supabase from './supabase-client';

import { Form, Row, Col, Button, Image, Navbar,Container, FormControl, InputGroup, FloatingLabel, Spinner } from 'react-bootstrap'

import { FaUserCircle } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { TbArrowBack } from "react-icons/tb";
import { IoMdMail } from "react-icons/io";
import { MdLockPerson } from "react-icons/md";


function Login() {
  // Variable declarations

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
 
  useEffect(() =>{
    // Check if there is already session
    async function checkSession() {
      const { data } = await supabase.auth.getSession()

      // Pass the user and session data on the dashbaord if session is available
      if(data.session){
        navigate('/dashboard',{state:{userData: data}})
      } 
      
    }
    checkSession()
  }, [navigate])

  async function signInWithEmail(event) {

    event.preventDefault()
    setButtonLoading(true)
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    setButtonLoading(false)
    if(data.session != null){
      navigate('/dashboard',{state:{userData: data}})
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
        
        <Col sm={12} lg={6} style={{height: '100vh',
        backgroundImage: `url("https://res.cloudinary.com/dgjbvgwiv/image/upload/v1771849872/jonathan-ford-6ZgTEtvD16I-unsplash_swrwpv.jpg")`,
        backgroundRepeat:'no-repeat',
        backgroundSize: "cover",
        overflowX:'hidden',
        overflowY:'hidden',
        position:'relative'
        }}>
          <div style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex', 
            paddingBottom: '120px',
            alignItems: 'center', 
            justifyContent:'center',
            flexDirection:'column',
            zIndex:0
        }}> 
          <Navbar style={{position: 'absolute', top: 0, width: '100%', zIndex: 1}}>
            <Container>
              <TbArrowBack style={{color:'white', fontSize:'30px', cursor:'pointer'}} onClick={() =>
                navigate('/')
                }/>
            </Container>
          </Navbar>

          <div style={{padding:'20px', position: 'relative', zIndex: 1}}>
            <div>
              <Image src="https://res.cloudinary.com/dgjbvgwiv/image/upload/v1771741662/AGOS_-_darkbg_kflri2.png" 
                style={{height: '100px', width: '150px'}}
                />
            </div>

            <div>
              <span style={{fontWeight:'bold', fontSize:'24px', color:'white'}}>Barangay Flood Monitoring and <br /> Forecasting</span>
              <br />
              <span style={{color:'white'}}>Empowering communities with real time data</span>
            </div>
            
          </div>

          <div></div>
                
        </div>
          
        </Col>

        <Col sm={12} lg={6} style={{height: '100vh',
           overflowY:'hidden' }}>

          <div style={{height:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'column'}}>
            
            <div></div>

            <Form style={{width:'300px'}} onSubmit={signInWithEmail}>
              <span style={{fontSize:'20px', fontWeight:'bold', display:'flex', justifyContent:'center', width:'100%'}}>Login</span>
              <Form.Group className='py-3'>
                <InputGroup>
                  <InputGroup.Text>
                    <IoMdMail />
                  </InputGroup.Text>

                  <FloatingLabel label='Email Address'>
                    <Form.Control style={{height:'50px'}} type='text' placeholder=''
                    onChange={(event) =>{
                      setEmail(event.target.value)
                      setError('')
                    }} required />
                  </FloatingLabel>
                </InputGroup>
              </Form.Group>
              
              <Form.Group style={{paddingBottom:'10px'}}>
                <InputGroup>
                  <InputGroup.Text>
                    <MdLockPerson />
                  </InputGroup.Text>
                  <FloatingLabel label='Password'>
                      <Form.Control style={{height:'50px', borderRight:'none'}} type={showPassword ?('text'):'password'} placeholder=''
                      onChange={(event) => {
                        setPassword(event.target.value)
                        setError('')
                        }} required />
                       
                  </FloatingLabel>
                  <InputGroup.Text style={{backgroundColor:'white'}}>
                    {showPassword ?(
                    <IoIosEyeOff style={{cursor:'pointer'}} onClick={()=>{
                      setShowPassword(false)
                      }} />
                    ) : <IoIosEye style={{cursor:'pointer'}} onClick={()=>{
                      setShowPassword(true)
                      }} />}
                      </InputGroup.Text>
                  </InputGroup>
              </Form.Group>

              <Form.Text style={{width:'100%', display:'flex', justifyContent:'end', paddingBottom:'15px'}}>
                <span>Forgot Password?</span>
              </Form.Text>

              <Form.Group style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', paddingBottom:'20px'}}>
                  {error && <p style={{color:'red'}}>{error} </p>}
                
                <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                    {
                      buttonLoading ? (
                        <Button style={{width:'100%',justifyContent:'center', display:'flex'}} disabled>
                          <Spinner animation="border" size="sm"  />
                        </Button>
                      ):
                      <Button type='submit' style={{width:'100%',justifyContent:'center', display:'flex'}}> 
                    Submit </Button>}
                  
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
